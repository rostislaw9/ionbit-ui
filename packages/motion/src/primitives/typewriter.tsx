import {
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useReducedMotion } from "../hooks/use-reduced-motion";
import { observeIntersection } from "../intersection-observer-pool";
import { ensureMotionStyles } from "../styles";
import { collectTextRuns } from "../text-runs";

/** Marks a Typewriter root so nested instances type only their own text. */
const TYPEWRITER_ATTR = "data-typewriter";

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

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node))
    return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

interface TypeNode {
  node: Text;
  /** Original node data — the target text. */
  full: string;
  /** Last value this pass wrote — detects external mutation. */
  expected: string;
  /** Pass no longer owns this node (React wrote or detached it). */
  dead: boolean;
}

interface TypewriterRunOptions {
  /** ms between characters. */
  interval: number;
  /** ms before typing starts. */
  delay: number;
  /** Show a trailing block caret while typing (and keep it after). */
  caret: boolean;
  onDone?: () => void;
}

/**
 * Types every text node inside `el` character by character, in document
 * order. Nodes are emptied first — React keeps ownership — then each
 * receives progressively longer prefixes. A `▌` caret span trails the
 * active node and keeps blinking at the end of the text.
 *
 * While the pass runs, `el` is `aria-hidden` and a visually hidden
 * sibling carries the real text; both revert on completion. A node is
 * only written while it still holds our last value, so a concurrent
 * React update is never overwritten.
 *
 * @returns A cancel function that stops the pass and restores the text.
 */
function startTypewriter(
  el: HTMLElement,
  { interval, delay, caret, onDone }: TypewriterRunOptions,
): () => void {
  const runs = collectTextRuns(el, TYPEWRITER_ATTR);
  const nodes: TypeNode[] = [];
  for (const run of runs)
    for (const node of run.nodes)
      nodes.push({ node, full: node.data, expected: "", dead: false });
  const total = nodes.reduce((n, t) => n + t.full.length, 0);
  if (interval <= 0 || total === 0) {
    onDone?.();
    return () => {};
  }

  const doc = el.ownerDocument;
  for (const t of nodes) t.node.data = "";

  const caretEl = caret ? doc.createElement("span") : null;
  if (caretEl) {
    caretEl.textContent = "▌";
    caretEl.setAttribute("aria-hidden", "true");
    caretEl.setAttribute("data-typewriter-caret", "");
    caretEl.style.display = "inline-block";
    caretEl.style.color = "var(--accent, currentColor)";
    caretEl.style.animation = "ionbit-ui-caret-blink 1.1s step-end infinite";
    // Insert at the typing head immediately — the step loop only
    // repositions it after the active node from here on.
    nodes[0]?.node.before(caretEl);
  }

  // Screen readers get a static copy while the visual text types.
  const prevHidden = el.getAttribute("aria-hidden");
  let sr: HTMLSpanElement | null = null;
  if (!el.contains(doc.activeElement)) {
    sr = doc.createElement("span");
    Object.assign(sr.style, srOnlyCss);
    sr.textContent = runs.map((r) => r.text).join("");
    el.setAttribute("aria-hidden", "true");
    el.insertAdjacentElement("afterend", sr);
  }

  const start = performance.now();
  let raf = 0;
  let done = false;

  const teardown = () => {
    if (done) return;
    done = true;
    for (const t of nodes) {
      if (t.dead) continue;
      // Restore only while the node still holds our value — an
      // external write (React children changed) wins.
      if (t.node.data === t.expected) t.node.data = t.full;
    }
    caretEl?.remove();
    if (sr) {
      if (prevHidden === null) el.removeAttribute("aria-hidden");
      else el.setAttribute("aria-hidden", prevHidden);
      sr.remove();
    }
  };

  const step = (now: number) => {
    const elapsed = now - start - delay;
    const shown =
      elapsed <= 0 ? 0 : Math.min(total, Math.floor(elapsed / interval));

    let remaining = shown;
    let active: TypeNode | null = null;
    for (const t of nodes) {
      if (remaining <= 0) break;
      const take = Math.min(remaining, t.full.length);
      remaining -= take;
      if (t.dead) continue;
      const next = t.full.slice(0, take);
      // Externally mutated or detached — the owner's text wins; stop
      // writing this node but keep the caret bookkeeping consistent.
      if (t.node.data !== t.expected || !t.node.isConnected) {
        t.dead = true;
        continue;
      }
      if (next !== t.node.data) {
        t.node.data = next;
        t.expected = next;
      }
      active = t;
    }

    if (caretEl) {
      if (active) active.node.after(caretEl);
      else nodes[0]?.node.before(caretEl);
    }

    if (shown >= total) {
      for (const t of nodes)
        if (!t.dead && t.node.data === t.expected) t.node.data = t.full;
      // `done` stays false — the pass is finished but teardown must
      // still work: a later cancel (replay, content change, unmount)
      // removes the persisted caret and restores node bookkeeping.
      if (sr) {
        if (prevHidden === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", prevHidden);
        sr.remove();
      }
      // The caret stays mounted — a blinking cursor reads as "the
      // channel is still open", which is the terminal idiom.
      onDone?.();
      return;
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(raf);
    teardown();
  };
}

export interface TypewriterProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /**
   * Content whose text should type out — any renderable children. All
   * descendant text types in place, so a paragraph or card can be
   * wrapped whole. When `children` changes after the first play, the
   * new text re-types.
   *
   * Elements marked `data-motion-skip` keep their text untouched —
   * use it to opt badges, icons, or live values out of the typing.
   */
  children?: ReactNode;
  /** Milliseconds per character. @default 30 */
  speed?: number;
  /**
   * Show a trailing block caret while typing; it keeps blinking once
   * the text settles. @default true
   */
  caret?: boolean;
  /** Delay in ms before typing starts once triggered. @default 0 */
  delay?: number;
  /**
   * When typing plays. `"mount"` types once, immediately on mount —
   * before first paint, so no finished text flashes first. `"focus"`
   * replays whenever the element or a descendant gains focus
   * (keyboard or click activation).
   * @default "view"
   */
  trigger?: "mount" | "view" | "hover" | "focus";
  /** With `trigger="view"`: type only on first reveal. @default true */
  once?: boolean;
  /** IntersectionObserver threshold for the view trigger. @default 0.4 */
  threshold?: number;
  /** Called after each typing pass completes. */
  onComplete?: () => void;
  /** Disable the effect — renders content as-is. @default false */
  disabled?: boolean;
  /** Render as a different element. @default "span" */
  as?: "span" | "div" | "p";
}

/**
 * Typewriter — text appears character by character with a trailing
 * block caret, like a terminal printing output. Applies to every text
 * node inside the element, so it can wrap plain text or whole
 * structures (paragraphs, cards). Plays on first reveal (view
 * trigger), on hover, on focus, and again whenever `children` changes
 * — suited to streamed output, status lines, and hero copy.
 *
 * While typing, the element is `aria-hidden` and a transient, visually
 * hidden sibling carries the full text so screen readers get the final
 * value instead of partial prefixes.
 *
 * Reduced motion: the effect is disabled entirely — the content
 * renders as-is.
 *
 * Performance: DOM text-node writes only, driven by a single rAF loop;
 * no React re-renders during typing. The view trigger shares the
 * IntersectionObserver pool.
 */
export const Typewriter = forwardRef<HTMLElement, TypewriterProps>(
  function Typewriter(
    {
      children,
      speed = 30,
      caret = true,
      delay = 0,
      trigger = "view",
      once = true,
      threshold = 0.4,
      onComplete,
      disabled = false,
      as: Tag = "span",
      style,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const enabled = !disabled && !reduced;
    const rootRef = useRef<HTMLElement | null>(null);
    const cancelRef = useRef<(() => void) | null>(null);
    const playedRef = useRef(false);

    ensureMotionStyles();

    const run = useCallback(() => {
      const el = rootRef.current;
      if (!el) return;
      playedRef.current = true;
      cancelRef.current?.();
      cancelRef.current = startTypewriter(el, {
        interval: speed,
        delay,
        caret,
        onDone: onComplete,
      });
    }, [speed, delay, caret, onComplete]);

    // Trigger: mount — type immediately, before the first paint, so the
    // finished text never flashes. Layout effect: the nodes are emptied
    // synchronously while the browser still hasn't painted.
    useLayoutEffect(() => {
      if (!enabled || trigger !== "mount") return;
      run();
    }, [enabled, trigger, run]);

    // Trigger: first reveal (or every reveal when once=false).
    useEffect(() => {
      if (!enabled || trigger !== "view") return;
      const el = rootRef.current;
      if (!el) return;
      return observeIntersection(
        el,
        threshold,
        (hit) => {
          if (hit) run();
        },
        once,
      );
    }, [enabled, trigger, once, threshold, run]);

    // Trigger: hover — every pointerenter replays the typing.
    useEffect(() => {
      if (!enabled || trigger !== "hover") return;
      const el = rootRef.current;
      if (!el) return;
      el.addEventListener("pointerenter", run);
      return () => el.removeEventListener("pointerenter", run);
    }, [enabled, trigger, run]);

    // Trigger: focus — every focusin replays the typing. focusin
    // bubbles, so a wrapped control works without its own listener.
    useEffect(() => {
      if (!enabled || trigger !== "focus") return;
      const el = rootRef.current;
      if (!el) return;
      el.addEventListener("focusin", run);
      return () => el.removeEventListener("focusin", run);
    }, [enabled, trigger, run]);

    // Re-type when the content changes after the first play — `textKey`
    // (not `children`) is the dep: element children are new objects
    // every render, but only a real text change should re-type. The
    // mount guard matters: with trigger="mount" the pass starts in a
    // layout effect, and this effect must not cancel it on first run.
    const textKey = useMemo(() => textOf(children), [children]);
    const lastText = useRef(textKey);
    useEffect(() => {
      const changed = lastText.current !== textKey;
      lastText.current = textKey;
      if (!changed && enabled) return;
      cancelRef.current?.();
      cancelRef.current = null;
      if (enabled && changed && playedRef.current) run();
    }, [textKey, enabled, run]);

    // Stop any in-flight typing on unmount.
    useEffect(() => () => cancelRef.current?.(), []);

    const OuterTag = Tag as "span";
    return (
      <OuterTag
        ref={(node: HTMLSpanElement | null) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-typewriter=""
        style={style}
        {...rest}
      >
        {children}
      </OuterTag>
    );
  },
);
