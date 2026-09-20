import { forwardRef, type CSSProperties, type ReactNode } from "react";

import { useInheritedRadius } from "../hooks/use-inherited-radius";
import { ensureMotionStyles } from "../styles";
import { motionTokens } from "../tokens";

export interface PulseProps {
  children: ReactNode;
  /**
   * 0..1 — pulse strength.
   * @default motionTokens.intensity.pulse
   */
  intensity?: number;
  /** Color override. Defaults to the `--accent` token. */
  color?: string;
  /** Disable the pulse. @default false */
  disabled?: boolean;
  /** Pulse cycle duration in ms. @default 1600 */
  duration?: number;
  /**
   * Visual variant.
   * - `"halo"` — box-shadow glow around the element bounding box (default).
   * - `"text"` — text-shadow glow that follows individual letter shapes.
   * @default "halo"
   */
  variant?: "halo" | "text";
  className?: string;
  style?: CSSProperties;
}

/**
 * Pulse — a slow, periodic accent halo for active/status states.
 *
 * Implementation: a single CSS `@keyframes` animation on `box-shadow` (halo)
 * or `text-shadow` (text).
 *
 * For halo variant, the wrapper automatically inherits the wrapped
 * element's border-radius — no need to pass `className` for rounding.
 *
 * Reduced motion: the global base CSS layer sets `animation-duration: 0.001ms`
 * under `prefers-reduced-motion: reduce`, so the pulse collapses to a static
 * state. The element remains fully usable; status is communicated by
 * color/shape, not motion.
 *
 * Use sparingly — only for genuinely active states (live status, in-progress).
 * Do not apply to idle components.
 */
export const Pulse = forwardRef<HTMLSpanElement, PulseProps>(function Pulse(
  {
    children,
    intensity = motionTokens.intensity.pulse,
    color,
    disabled = false,
    duration = 1600,
    variant = "halo",
    className,
    style,
  },
  ref,
) {
  const radiusRef = useInheritedRadius<HTMLSpanElement>();

  ensureMotionStyles();

  // Merge refs
  const setRef = (el: HTMLSpanElement | null) => {
    radiusRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  if (disabled) {
    // The wrapper stays mounted so toggling `disabled` never shifts
    // layout, drops the forwarded ref, or discards className/style.
    return (
      <span
        ref={setRef}
        className={className}
        style={{ display: "inline-flex", ...style }}
      >
        {children}
      </span>
    );
  }

  const pulseColor = color ?? "var(--accent, oklch(0.62 0.19 230))";
  const isText = variant === "text";
  const maxBlur = Math.round(40 * intensity);
  const maxAlpha = Math.round(100 * intensity);
  const maxSpread = Math.round(6 * intensity);

  const keyframeName = isText ? "ionbit-ui-pulse-text" : "ionbit-ui-pulse-halo";

  const wrapperStyle: CSSProperties = {
    display: "inline-flex",
    animation: `${keyframeName} ${duration}ms var(--ease-standard, ease-in-out) infinite`,
    ["--pulse-color" as string]: pulseColor,
    ["--pulse-blur" as string]: `${maxBlur}px`,
    ["--pulse-spread" as string]: `${maxSpread}px`,
    ["--pulse-alpha" as string]: `${maxAlpha}%`,
    ...style,
  };

  return (
    <span ref={setRef} className={className} style={wrapperStyle}>
      {children}
    </span>
  );
});
