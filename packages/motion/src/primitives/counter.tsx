import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react";

import { useReducedMotion } from "../hooks/use-reduced-motion";
import { observeIntersection } from "../intersection-observer-pool";

/** Visually hidden styles for the transient screen-reader copy. */
const srOnlyCss: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: "0",
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export interface CounterProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Target value — animates to it whenever it changes. */
  value: number;
  /** Value the first animation starts from. @default 0 */
  from?: number;
  /** Count duration in ms. @default 1200 */
  duration?: number;
  /** Fraction digits shown. @default 0 */
  decimals?: number;
  /** Formats the displayed value — overrides `decimals`. */
  format?: (value: number) => string;
  /**
   * When the count plays. `"hover"` replays on every pointerenter.
   * @default "view"
   */
  trigger?: "view" | "hover";
  /** With `trigger="view"`: count only on first reveal. @default true */
  once?: boolean;
  /** IntersectionObserver threshold for the view trigger. @default 0.4 */
  threshold?: number;
  /** Called after each count completes. */
  onComplete?: () => void;
  /** Disable the effect — renders the final value. @default false */
  disabled?: boolean;
  /** Render as a different element. @default "span" */
  as?: "span" | "div";
}

/**
 * Counter — a number rolls up to its value with an ease-out curve.
 * Counts on first reveal (view trigger) or hover, and re-counts
 * whenever `value` changes — suited to stats, usage meters, and
 * dashboard numbers.
 *
 * While counting, the element is `aria-hidden` and a transient,
 * visually hidden sibling carries the final value so screen readers
 * never announce intermediate numbers.
 *
 * Reduced motion: the final value renders instantly.
 *
 * Performance: one rAF loop writing `textContent` directly — no React
 * re-renders per frame. The view trigger shares the
 * IntersectionObserver pool.
 */
export const Counter = forwardRef<HTMLElement, CounterProps>(function Counter(
  {
    value,
    from = 0,
    duration = 1200,
    decimals = 0,
    format,
    trigger = "view",
    once = true,
    threshold = 0.4,
    onComplete,
    disabled = false,
    as: Tag = "span",
    ...rest
  },
  ref,
) {
  const reduced = useReducedMotion();
  const enabled = !disabled && !reduced;
  const rootRef = useRef<HTMLElement | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);
  const playedRef = useRef(false);
  const shownRef = useRef<number | null>(null);

  const formatValue = useCallback(
    (v: number) =>
      format
        ? format(v)
        : v.toLocaleString("en-US", {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
          }),
    [decimals, format],
  );

  const run = useCallback(
    (restart = false) => {
      const el = rootRef.current;
      if (!el) return;
      playedRef.current = true;
      cancelRef.current?.();

      const doc = el.ownerDocument;
      // Trigger replays restart from `from`; a `value` change animates
      // from wherever the counter currently sits.
      const start = restart ? from : (shownRef.current ?? from);
      const delta = value - start;
      const finalText = formatValue(value);

      if (!enabled || duration <= 0 || delta === 0) {
        el.textContent = finalText;
        shownRef.current = value;
        onComplete?.();
        return;
      }

      const prevHidden = el.getAttribute("aria-hidden");
      let sr: HTMLSpanElement | null = null;
      if (!el.contains(doc.activeElement)) {
        sr = doc.createElement("span");
        Object.assign(sr.style, srOnlyCss);
        sr.textContent = finalText;
        el.setAttribute("aria-hidden", "true");
        el.insertAdjacentElement("afterend", sr);
      }

      // Anchor to the first rAF timestamp — rAF times and
      // performance.now() share a clock in browsers but differ in
      // jsdom; the first-frame base keeps the count testable.
      let t0: number | null = null;
      let raf = 0;
      const step = (now: number) => {
        // Stopped owning the text — an external write wins.
        if (!el.isConnected) return;
        if (t0 === null) t0 = now;
        const t = Math.min(1, (now - t0) / duration);
        const current = start + delta * easeOutCubic(t);
        const text = formatValue(t >= 1 ? value : current);
        if (el.textContent !== text) el.textContent = text;
        shownRef.current = current;
        if (t >= 1) {
          shownRef.current = value;
          if (sr) {
            if (prevHidden === null) el.removeAttribute("aria-hidden");
            else el.setAttribute("aria-hidden", prevHidden);
            sr.remove();
          }
          onComplete?.();
          return;
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);

      cancelRef.current = () => {
        cancelAnimationFrame(raf);
        if (prevHidden === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", prevHidden);
        sr?.remove();
      };
    },
    [duration, enabled, formatValue, from, onComplete, value],
  );

  // Trigger: first reveal (or every reveal when once=false).
  useEffect(() => {
    if (!enabled || trigger !== "view") return;
    const el = rootRef.current;
    if (!el) return;
    return observeIntersection(
      el,
      threshold,
      (hit) => {
        if (hit) run(true);
      },
      once,
    );
  }, [enabled, trigger, once, threshold, run]);

  // Trigger: hover — every pointerenter replays the count.
  useEffect(() => {
    if (!enabled || trigger !== "hover") return;
    const el = rootRef.current;
    if (!el) return;
    const replay = () => run(true);
    el.addEventListener("pointerenter", replay);
    return () => el.removeEventListener("pointerenter", replay);
  }, [enabled, trigger, run]);

  // Re-count when the value changes after the first play.
  useEffect(() => {
    cancelRef.current?.();
    cancelRef.current = null;
    if (enabled && playedRef.current) run();
  }, [value, enabled, run]);

  // Stop any in-flight count on unmount.
  useEffect(() => () => cancelRef.current?.(), []);

  const OuterTag = Tag as "span";
  return (
    <OuterTag
      ref={(node: HTMLSpanElement | null) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-counter=""
      {...rest}
    >
      {formatValue(playedRef.current || !enabled ? value : from)}
    </OuterTag>
  );
});
