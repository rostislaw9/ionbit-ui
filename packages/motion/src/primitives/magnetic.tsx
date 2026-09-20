import {
  motion,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useFinePointer } from "../hooks/use-fine-pointer";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { subscribePointerMove } from "../pointer-coordinator";
import { motionTokens } from "../tokens";

export interface MagneticProps {
  children: ReactNode;
  /**
   * 0..1 — max translate as a fraction of the element's half-size.
   * @default motionTokens.intensity.magnetic
   */
  intensity?: number;
  /**
   * Proximity radius in pixels. The magnetic pull activates when the cursor
   * is within this distance of the element's bounding box, before actually
   * touching it. Set to 0 to only activate on hover.
   * @default 20
   */
  proximity?: number;
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
 * Magnetic — subtly translates the child toward the cursor using a spring.
 *
 * The effect activates when the cursor is within `proximity` pixels of the
 * element, creating a pull that starts before the cursor touches it. The
 * pull strength scales with closeness — maximum when the cursor is directly
 * over the element, fading to zero at the proximity edge.
 *
 * Implementation: a window-level `pointermove` listener drives two
 * `useMotionValue`s (x, y) which feed `useSpring` so the motion is
 * physically plausible and interruptible. The bounding rect is cached and
 * refreshed on scroll/resize to avoid layout thrashing.
 *
 * Reduced motion: the effect is disabled entirely. The element does not
 * move; the click target is unchanged.
 *
 * Performance: only transform is animated (compositor-only). No React state
 * updates on pointer move — Motion values bypass React's render cycle.
 */
export const Magnetic = forwardRef<HTMLDivElement, MagneticProps>(
  function Magnetic(
    {
      children,
      intensity = motionTokens.intensity.magnetic,
      proximity = 20,
      disabled = false,
      as: Tag = "div",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const fine = useFinePointer();
    const enabled = !disabled && !reduced && fine;
    const innerRef = useRef<HTMLDivElement | null>(null);
    const rectRef = useRef<DOMRect | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, motionTokens.spring.magnetic);
    const sy = useSpring(y, motionTokens.spring.magnetic);

    const refreshRect = useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      rectRef.current = el.getBoundingClientRect();
    }, []);

    const updateMagnetic = useCallback(
      (clientX: number, clientY: number) => {
        const el = innerRef.current;
        if (!el) return;
        const rect = rectRef.current ?? el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const relX = clientX - cx;
        const relY = clientY - cy;

        // Distance from cursor to the nearest edge of the element.
        const nearestX = Math.max(rect.left, Math.min(clientX, rect.right));
        const nearestY = Math.max(rect.top, Math.min(clientY, rect.bottom));
        const distX = clientX - nearestX;
        const distY = clientY - nearestY;
        const edgeDist = Math.sqrt(distX * distX + distY * distY);

        if (edgeDist > proximity) {
          x.set(0);
          y.set(0);
          return;
        }

        // Scale: 1 when cursor is over the element, 0 at proximity edge.
        const scale = 1 - edgeDist / proximity;
        const maxX = (rect.width / 2) * intensity;
        const maxY = (rect.height / 2) * intensity;
        x.set(Math.max(-maxX, Math.min(maxX, relX * intensity * scale)));
        y.set(Math.max(-maxY, Math.min(maxY, relY * intensity * scale)));
      },
      [intensity, proximity, x, y],
    );

    useEffect(() => {
      if (!enabled) return;
      refreshRect();
      const unsubscribe = subscribePointerMove(updateMagnetic);
      window.addEventListener("scroll", refreshRect, { passive: true });
      window.addEventListener("resize", refreshRect, { passive: true });
      return () => {
        unsubscribe();
        window.removeEventListener("scroll", refreshRect);
        window.removeEventListener("resize", refreshRect);
        x.set(0);
        y.set(0);
      };
    }, [enabled, updateMagnetic, refreshRect, x, y]);

    const MotionTag = motion[Tag] as typeof motion.div;

    const motionStyle: MotionStyle = {
      display: "inline-flex",
      ...style,
    };
    if (enabled) {
      motionStyle.x = sx;
      motionStyle.y = sy;
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
  },
);
