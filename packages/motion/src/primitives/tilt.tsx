import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import {
  forwardRef,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useInheritedRadius } from "../hooks/use-inherited-radius";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { motionTokens } from "../tokens";

export interface TiltProps {
  children: ReactNode;
  /**
   * 0..1 — scales `maxAngle`. @default motionTokens.intensity.tilt
   */
  intensity?: number;
  /**
   * Maximum tilt angle in degrees at full intensity.
   * @default 20
   */
  maxAngle?: number;
  /**
   * Perspective distance in px — lower values feel deeper/more dramatic.
   * @default 800
   */
  perspective?: number;
  /**
   * Adds a specular glare driven by the surface orientation — the
   * highlight slides across the card as it tilts, like light glancing
   * off a coated surface. A flat card shows no reflection.
   * @default false
   */
  reflection?: boolean;
  /**
   * 0..1 — glare opacity at full tilt.
   * @default motionTokens.intensity.tiltReflection
   */
  reflectionIntensity?: number;
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
 * With `reflection`, a specular glare layer is driven by the sprung
 * rotateX/rotateY values — tilting the card slides the highlight
 * across its surface and its opacity scales with tilt magnitude, so
 * a flat card shows no reflection. The glare is an oversized
 * radial-gradient layer moved via x/y/opacity only — compositor
 * properties, so no per-frame repaints and no React re-renders.
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
    intensity = motionTokens.intensity.tilt,
    maxAngle = 20,
    perspective = 800,
    reflection = false,
    reflectionIntensity = motionTokens.intensity.tiltReflection,
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
  const radiusRef = useInheritedRadius<HTMLDivElement>();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, motionTokens.spring.gentle);
  const sry = useSpring(rotateY, motionTokens.spring.gentle);

  // Specular glare: a radial highlight whose center is derived from the
  // sprung surface orientation (not the cursor). Tilting the card slides
  // the reflection across its surface — horizontally opposite to the
  // tilt, vertically with it — like light glancing off a coated card.
  // Normalized tilt -1..1 against the effective tilt range.
  const tiltRange = Math.max(0.001, maxAngle * intensity);
  const tiltX = useTransform(sry, (v) => v / tiltRange);
  const tiltY = useTransform(srx, (v) => v / tiltRange);
  // The glare layer is 200% of the card and translated via x/y —
  // compositor-only motion, no per-frame repaints. At full tilt its
  // center sits past the card edge so only the outer gradient falloff
  // shows, reading as a sheen entering from the tilted side.
  const glareX = useTransform(tiltX, (v) => `${-v * 27.5}%`);
  const glareY = useTransform(tiltY, (v) => `${v * 27.5}%`);
  // Opacity scales with tilt magnitude — a flat card shows no reflection.
  const glareOpacity = useTransform([tiltX, tiltY], (latest) => {
    const [x = 0, y = 0] = latest as number[];
    return Math.min(1, Math.hypot(x, y)) * reflectionIntensity;
  });

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
    // The glare layer is absolutely positioned against the wrapper.
    ...(reflection ? { position: "relative" } : {}),
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
        radiusRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      style={motionStyle}
      {...rest}
    >
      {children}
      {reflection && enabled ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: "-50%",
              x: glareX,
              y: glareY,
              opacity: glareOpacity,
              willChange: "transform, opacity",
              background:
                "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)",
            }}
          />
        </div>
      ) : null}
    </MotionTag>
  );
});
