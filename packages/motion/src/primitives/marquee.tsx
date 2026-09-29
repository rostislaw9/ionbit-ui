import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useReducedMotion } from "../hooks/use-reduced-motion";
import { ensureMotionStyles } from "../styles";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /** Content repeated around the loop — chips, badges, feed items. */
  children?: ReactNode;
  /**
   * Seconds for one copy to scroll by. The loop shifts exactly one
   * copy-width per cycle, so this is also the time between an item
   * leaving the left edge and its twin arriving at the right.
   * @default 24
   */
  duration?: number;
  /** Scroll right-to-left instead. @default false */
  reverse?: boolean;
  /**
   * Pause the loop while the pointer is over the marquee — lets users
   * read or click an item. To pause from a larger containing surface
   * (e.g. a card around the ticker), mark any ancestor with
   * `data-marquee-pause-scope`. @default true
   */
  pauseOnHover?: boolean;
  /**
   * Gap between items and between the repeated copies, in px. Set it
   * wider than any internal margins so the seam stays invisible.
   * @default 24
   */
  gap?: number;
  /**
   * Stop the loop — renders the content statically, clipped to the
   * container. @default false
   */
  disabled?: boolean;
}

/**
 * Marquee — content scrolls in a seamless horizontal loop, like a
 * status ticker. The children are repeated until the copies overflow
 * the container (measured — two copies alone can leave empty space
 * when the content is narrower than the container), then the track
 * slides exactly one copy-width per cycle: a copy always lands where
 * its twin started, so the loop never jumps and never shows a gap.
 *
 * The animation lives in the stylesheet and reads CSS vars
 * (`--marquee-duration`, `--marquee-direction`, `--marquee-shift`) —
 * keeping it out of inline styles is what lets the `pauseOnHover`
 * rule win. Copies after the first are `aria-hidden`. Pause on hover
 * is pure CSS gated behind `(hover: hover)`. Reduced motion renders
 * the static first copy.
 *
 * Performance: a single transform animation on the track — zero DOM
 * churn, compositor-only. A ResizeObserver re-tiles the copies when
 * the container resizes.
 */
export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      children,
      duration = 24,
      reverse = false,
      pauseOnHover = true,
      gap = 24,
      disabled = false,
      style,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const animated = !disabled && !reduced && duration > 0;
    const rootRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    // How many copies are needed so the window is always covered, and
    // the pixel shift of one cycle (one copy width).
    const [repeat, setRepeat] = useState(2);
    const [shift, setShift] = useState<number | null>(null);

    ensureMotionStyles();

    const measure = useCallback(() => {
      const el = rootRef.current;
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      if (!el || !track || !first) return;
      const w = first.offsetWidth;
      const W = el.clientWidth;
      if (w <= 0 || W <= 0) return;
      // The track must still fill the viewport while sliding one copy
      // out — need copies covering W + w pixels total.
      setRepeat(Math.max(2, Math.ceil(W / w) + 1));
      setShift(w);
    }, []);

    // Re-measure after every render — cheap offsetWidth read that also
    // catches children changes and webfont loads.
    useLayoutEffect(() => {
      measure();
    });

    // Re-tile when the container itself resizes.
    useEffect(() => {
      const el = rootRef.current;
      if (!el || typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, [measure]);

    const copyStyle: CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: `${gap}px`,
      paddingRight: `${gap}px`,
      flexShrink: 0,
    };

    const trackStyle = {
      display: "flex",
      width: "max-content",
      "--marquee-duration": `${duration}s`,
      "--marquee-direction": reverse ? "reverse" : "normal",
      "--marquee-shift": shift === null ? undefined : `-${shift}px`,
      animation: animated ? undefined : "none",
    } as CSSProperties;

    return (
      <div
        ref={(node: HTMLDivElement | null) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-marquee=""
        data-pause-on-hover={pauseOnHover || undefined}
        style={{ overflow: "hidden", ...style }}
        {...rest}
      >
        <div ref={trackRef} data-marquee-track="" style={trackStyle}>
          {Array.from({ length: repeat }, (_, i) => (
            <div
              key={i}
              aria-hidden={i === 0 ? undefined : "true"}
              style={copyStyle}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
