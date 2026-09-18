import {
  motion,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "motion/react";
import {
  forwardRef,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useReducedMotion } from "../hooks/use-reduced-motion";
import { motionTokens } from "../tokens";

export interface TiltProps {
  children: ReactNode;
  /**
   * 0..1 — scales `maxAngle`. @default 1
   */
  intensity?: number;
  /**
   * Maximum tilt angle in degrees at full intensity.
   * @default 6
   */
  maxAngle?: number;
  /**
   * Perspective distance in px — lower values feel deeper/more dramatic.
   * @default 800
   */
  perspective?: number;
  /** Disable the effect entirely (keeps the wrapper DOM). @default false */
  disabled?: boolean;
  /** Render as a different element. @default "div" */
  as?: "div" | "span" | "button";
  /** Custom class name. */
  className?: string;
  /** Custom inline style. */
  style?: CSSProperties;
  /** Accessible label. */
  "aria-label"?: string;
}

/**
 * Tilt — subtle perspective tilt toward the cursor while hovering.
 *
 * The element rotates on rotateX/rotateY proportional to the cursor's
 * offset from center, spring-smoothed so the motion is physically
 * plausible and interruptible. On pointer leave the element springs
 * back to rest.
 *
 * Implementation: element-level `pointermove`/`pointerleave` listeners
 * drive two `useMotionValue`s (rotateX, rotateY) through `useSpring`
 * with the gentle spring token. `transformPerspective` supplies the
 * depth. Tilt is hover-gated — unlike Magnetic it does not track the
 * pointer outside the element.
 *
 * Reduced motion: the effect is disabled entirely; the element stays
 * static.
 *
 * Performance: only transform is animated (compositor-only). Motion
 * values bypass React's render cycle — no React state updates on
 * pointer move.
 */
export const Tilt = forwardRef<HTMLDivElement, TiltProps>(function Tilt(
  {
    children,
    intensity = 1,
    maxAngle = 6,
    perspective = 800,
    disabled = false,
    as: Tag = "div",
    className,
    style,
    ...rest
  },
  ref,
) {
  const reduced = useReducedMotion();
  const enabled = !disabled && !reduced;
  const innerRef = useRef<HTMLDivElement | null>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, motionTokens.spring.gentle);
  const sry = useSpring(rotateY, motionTokens.spring.gentle);

  useEffect(() => {
    if (!enabled) return;
    const el = innerRef.current;
    if (!el) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // Cursor position within the element, 0..1.
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateX.set((0.5 - py) * maxAngle * intensity);
      rotateY.set((px - 0.5) * maxAngle * intensity);
    };

    const onPointerLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      rotateX.set(0);
      rotateY.set(0);
    };
  }, [enabled, intensity, maxAngle, rotateX, rotateY]);

  const MotionTag = motion[Tag] as typeof motion.div;

  const motionStyle: MotionStyle = {
    display: "inline-flex",
    ...style,
  };
  if (enabled) {
    motionStyle.rotateX = srx;
    motionStyle.rotateY = sry;
    motionStyle.transformPerspective = perspective;
  }

  return (
    <MotionTag
      ref={(node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      style={motionStyle}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});
