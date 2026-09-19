import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useInheritedRadius } from "../hooks/use-inherited-radius";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { ensureMotionStyles } from "../styles";
import { motionTokens } from "../tokens";

export interface RippleProps {
  children: ReactNode;
  /**
   * 0..1 — ripple strength (peak opacity of the expanding circle).
   * @default motionTokens.intensity.ripple
   */
  intensity?: number;
  /**
   * Ripple color. Defaults to the wrapped element's computed text
   * color, sampled at press time — the "ink" that reads correctly on
   * any solid background (accent buttons get a foreground ripple,
   * outline buttons get a text-colored one). Pass a value to override.
   */
  color?: string;
  /** Disable the ripple. @default false */
  disabled?: boolean;
  /** Ripple duration in ms. @default motionTokens.duration.slow */
  duration?: number;
  /**
   * Always expand from the element center instead of the pointer
   * position. Useful for icon buttons and other symmetric controls.
   * @default false
   */
  centered?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface RippleInstance {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
}

/**
 * Ripple — a radial expanding circle on press, like the Mode Switcher's
 * radial reveal but contained to the wrapped element.
 *
 * Implementation: on pointerdown (or Enter/Space for keyboard users) a
 * circular span spawns at the press position and animates scale 0 → 1 via
 * shared `@keyframes ionbit-ui-ripple`, fading out at the end. The span is
 * removed on `animationend`. The circle is sized to reach the element's
 * farthest corner and clipped by the wrapper's `overflow: hidden`, which
 * inherits the wrapped element's border-radius automatically.
 *
 * Reduced motion: no ripple is spawned; the control still works normally.
 *
 * The wrapper is an inline-flex span — for block-level content like cards,
 * pass `className="flex"` (or another display) so the wrapper covers it.
 */
export const Ripple = forwardRef<HTMLSpanElement, RippleProps>(function Ripple(
  {
    children,
    intensity = motionTokens.intensity.ripple,
    color,
    disabled = false,
    duration = motionTokens.duration.slow,
    centered = false,
    className,
    style,
  },
  ref,
) {
  const radiusRef = useInheritedRadius<HTMLSpanElement>();
  const reduced = useReducedMotion();
  const idRef = useRef(0);
  const [ripples, setRipples] = useState<RippleInstance[]>([]);

  ensureMotionStyles();

  useEffect(() => {
    const el = radiusRef.current;
    if (!el || disabled || reduced) return;

    const spawn = (clientX?: number, clientY?: number) => {
      const rect = el.getBoundingClientRect();
      const fromCenter = centered || clientX === undefined;
      const x = fromCenter ? rect.width / 2 : clientX! - rect.left;
      const y = fromCenter ? rect.height / 2 : clientY! - rect.top;
      const radius = Math.hypot(
        Math.max(x, rect.width - x),
        Math.max(y, rect.height - y),
      );
      setRipples((rs) => [
        ...rs,
        { id: ++idRef.current, x, y, radius, color: resolveColor() },
      ]);
    };

    const resolveColor = () => {
      if (color) return color;
      const target = el.firstElementChild ?? el;
      const computed = getComputedStyle(target).color;
      return computed && computed !== "transparent" ? computed : "currentColor";
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      spawn(e.clientX, e.clientY);
    };

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      spawn();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("keydown", onKeyDown);
    };
  }, [radiusRef, disabled, reduced, centered, color]);

  const setRef = (el: HTMLSpanElement | null) => {
    radiusRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  if (disabled) return <>{children}</>;

  const remove = (id: number) =>
    setRipples((rs) => rs.filter((r) => r.id !== id));

  return (
    <span
      ref={setRef}
      className={className}
      style={{
        display: "inline-flex",
        position: "relative",
        overflow: "hidden",
        // Buttons shift down 1px on :active — give the clip area 1px of
        // slack so the bottom edge isn't cut. The negative margin keeps
        // the wrapper's outer size unchanged.
        paddingBlockEnd: 1,
        marginBlockEnd: -1,
        ...style,
      }}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          data-ionbit-ripple=""
          onAnimationEnd={() => remove(r.id)}
          style={{
            position: "absolute",
            left: r.x - r.radius,
            top: r.y - r.radius,
            width: r.radius * 2,
            height: r.radius * 2,
            borderRadius: "50%",
            background: r.color,
            pointerEvents: "none",
            animation: `ionbit-ui-ripple ${duration}ms var(--ease-standard, ease-out) forwards`,
            ["--ripple-opacity" as string]: 0.24 * intensity,
          }}
        />
      ))}
    </span>
  );
});
