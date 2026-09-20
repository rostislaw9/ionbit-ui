import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useInheritedRadius } from "../hooks/use-inherited-radius";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { ensureMotionStyles } from "../styles";
import { motionTokens } from "../tokens";

export interface TraceProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  children?: ReactNode;
  /**
   * 0..1 — beam strength.
   * @default motionTokens.intensity.trace
   */
  intensity?: number;
  /** Beam color override. Defaults to the `--accent` token. */
  color?: string;
  /**
   * Disable the effect entirely. The wrapper stays mounted so toggling
   * doesn't shift layout or drop the forwarded ref. @default false
   */
  disabled?: boolean;
  /**
   * Whether the beam is running. Unlike `disabled`, the wrapper stays
   * mounted so toggling doesn't shift layout — use it for transient
   * states like "processing".
   * @default true
   */
  active?: boolean;
  /** Time for one full lap around the border, in ms. @default 2400 */
  duration?: number;
  /** Beam thickness in px. @default 1.5 */
  thickness?: number;
  /**
   * Beam length as a fraction of the border perimeter (0..1).
   * @default 0.15
   */
  arc?: number;
  /**
   * Element tag for the wrapper. Use `"div"` when wrapping block-level
   * children such as cards.
   * @default "span"
   */
  as?: "span" | "div";
}

/**
 * Trace — a single accent point that travels along an element's border.
 *
 * For processing/focus/active states on cards, inputs and other boxed
 * elements: the beam reads as "this element is working" without
 * disturbing layout.
 *
 * Implementation: an absolutely-positioned overlay paints a
 * `conic-gradient` masked to the border ring (content-box XOR
 * border-box), and the shared `ionbit-ui-trace` keyframes rotate the
 * gradient's `--ionbit-trace-angle` custom property once per lap.
 * CSS-only — no per-frame JS. The wrapper mirrors the wrapped child's
 * border-radius automatically, so the beam follows rounded corners.
 *
 * Browsers without `@property` support cannot interpolate the angle
 * and get a static beam — graceful degradation.
 *
 * Reduced motion: the animated beam is replaced by a static accent
 * ring, per the product spec.
 */
export const Trace = forwardRef<HTMLElement, TraceProps>(function Trace(
  {
    children,
    intensity = motionTokens.intensity.trace,
    color,
    disabled = false,
    active = true,
    duration = 2400,
    thickness = 1.5,
    arc = 0.15,
    as: Component = "span",
    className,
    style,
    ...rest
  },
  ref,
) {
  const reduced = useReducedMotion();
  const radiusRef = useInheritedRadius<HTMLElement>({
    resolveChild: (el) =>
      (Array.from(el.children).find(
        (child) => !child.hasAttribute("data-ionbit-trace"),
      ) as HTMLElement | null) ?? null,
  });

  ensureMotionStyles();

  const setRef = (el: HTMLElement | null) => {
    radiusRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  // `disabled` keeps the wrapper mounted (no layout shift, ref stays
  // live) — the beam overlay below is simply not rendered.

  const beamColor = color ?? "var(--accent, oklch(0.62 0.19 230))";
  const alpha = Math.max(0, Math.min(1, intensity));

  const layerStyle: CSSProperties = reduced
    ? {
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        boxShadow: `inset 0 0 0 ${thickness}px color-mix(in oklab, ${beamColor} ${Math.round(alpha * 35)}%, transparent)`,
        pointerEvents: "none",
      }
    : {
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        padding: `${thickness}px`,
        background: `conic-gradient(from var(--ionbit-trace-angle, 0deg), transparent 0turn, transparent ${1 - arc}turn, color-mix(in oklab, ${beamColor} 45%, transparent) ${1 - arc * 0.35}turn, ${beamColor} 1turn)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        opacity: alpha,
        animation: `ionbit-ui-trace ${duration}ms linear infinite`,
        pointerEvents: "none",
      };

  return (
    <Component
      ref={setRef}
      className={className}
      style={{
        display: Component === "div" ? "block" : "inline-flex",
        position: "relative",
        ...style,
      }}
      {...rest}
    >
      {children}
      {active && !disabled && (
        <span aria-hidden="true" data-ionbit-trace="" style={layerStyle} />
      )}
    </Component>
  );
});
