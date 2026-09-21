import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useFinePointer } from "../hooks/use-fine-pointer";
import { useInheritedRadius } from "../hooks/use-inherited-radius";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { subscribePointerMove } from "../pointer-coordinator";
import { motionTokens } from "../tokens";

export interface SpotlightProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: ReactNode;
  /**
   * 0..1 — how strong the radial highlight is.
   * @default motionTokens.intensity.spotlight
   */
  intensity?: number;
  /** Radius of the spotlight in px. @default 220 */
  radius?: number;
  /** Disable the effect entirely (keeps the wrapper DOM). @default false */
  disabled?: boolean;
  /** Render as a different element. @default "div" */
  as?: "div" | "section" | "article" | "li" | "button";
  /**
   * How far (in px) the effect starts before the cursor reaches the element.
   * The spotlight activates when the pointer is within this distance of the
   * element's bounding box.
   * @default 0
   */
  proximity?: number;
}

/**
 * Spotlight — a pointer-following radial highlight for surfaces.
 *
 * Implementation: a window-level `pointermove` listener tracks the cursor
 * and activates the highlight when it comes within `proximity` px of the
 * element's bounding box. The highlight is an oversized radial-gradient
 * layer moved via `translate3d` on a `requestAnimationFrame`-throttled
 * callback — compositor-only motion, no per-frame repaints, and no
 * JavaScript animation loop runs while the pointer is idle.
 *
 * Reduced motion: the effect is disabled entirely. The surface remains
 * fully usable; spotlight is purely decorative.
 *
 * The gradient lives in its own clipped layer (`overflow: hidden` +
 * inherited `border-radius`), so children are never clipped — a
 * child's `box-shadow` and other overflowing paint render normally.
 */
export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(
  function Spotlight(
    {
      children,
      intensity = motionTokens.intensity.spotlight,
      radius = 220,
      disabled = false,
      proximity = 0,
      as: Tag = "div",
      style,
      onPointerMove,
      onPointerLeave,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const fine = useFinePointer();
    const frame = useRef<number | null>(null);
    // The first element child is the overlay span, so resolve the
    // content child through the trailing `display: contents` wrapper.
    const innerRef = useInheritedRadius<HTMLDivElement>({
      resolveChild: (el) =>
        (el.lastElementChild?.firstElementChild as HTMLElement | null) ?? null,
    });
    const overlayRef = useRef<HTMLSpanElement | null>(null);
    const activeRef = useRef(false);
    const rectRef = useRef<DOMRect | null>(null);

    // Pointer-driven — skipped entirely on touch devices, where hover
    // never fires and pointermove only fires during scroll gestures.
    const enabled = !disabled && !reduced && fine;

    // Cache the bounding rect and refresh on scroll/resize to avoid
    // calling getBoundingClientRect on every pointermove event.
    const refreshRect = useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      rectRef.current = el.getBoundingClientRect();
    }, [innerRef]);

    const updateSpotlight = useCallback(
      (clientX: number, clientY: number) => {
        const el = innerRef.current;
        if (!el) return;
        const rect = rectRef.current ?? el.getBoundingClientRect();
        const expandedRect = {
          left: rect.left - proximity,
          top: rect.top - proximity,
          right: rect.right + proximity,
          bottom: rect.bottom + proximity,
        };
        const inside =
          clientX >= expandedRect.left &&
          clientX <= expandedRect.right &&
          clientY >= expandedRect.top &&
          clientY <= expandedRect.bottom;

        if (frame.current != null) cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          const ov = overlayRef.current;
          if (!ov) return;
          if (inside) {
            // The overlay is a 200% layer whose gradient is centered at
            // the element's center at rest — translating it by the
            // pointer offset lands the highlight under the cursor while
            // staying on compositor properties (no per-frame repaint).
            const x = clientX - rect.left - rect.width / 2;
            const y = clientY - rect.top - rect.height / 2;
            ov.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            const target = String(intensity);
            if (ov.style.opacity !== target) ov.style.opacity = target;
            activeRef.current = true;
          } else if (activeRef.current) {
            ov.style.opacity = "0";
            activeRef.current = false;
          }
          frame.current = null;
        });
      },
      [intensity, proximity, innerRef],
    );

    useEffect(() => {
      if (!enabled) return;
      refreshRect();
      const unsubscribe = subscribePointerMove(updateSpotlight);
      window.addEventListener("scroll", refreshRect, { passive: true });
      window.addEventListener("resize", refreshRect, { passive: true });
      return () => {
        unsubscribe();
        window.removeEventListener("scroll", refreshRect);
        window.removeEventListener("resize", refreshRect);
        if (frame.current != null) cancelAnimationFrame(frame.current);
      };
    }, [enabled, updateSpotlight, refreshRect]);

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(e);
      },
      [onPointerMove],
    );

    const handlePointerLeave = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(e);
      },
      [onPointerLeave],
    );

    const surfaceStyle: CSSProperties = {
      position: "relative",
      isolation: "isolate",
      ...style,
    };

    const Comp = Tag as "div";

    return (
      <Comp
        {...rest}
        ref={(node: HTMLDivElement | null) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        style={surfaceStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {enabled && (
          // Clip layer, not the wrapper: the gradient stays inside the
          // rounded bounds (radius inherited via `useInheritedRadius`)
          // while the child's own box-shadow can still paint outside.
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <span
              ref={overlayRef}
              style={{
                position: "absolute",
                // 200% layer: its center coincides with the element's
                // center, so translate3d(pointer-offset) places the
                // static gradient under the cursor — compositor-only
                // motion.
                inset: "-50%",
                opacity: 0,
                transition: `opacity ${motionTokens.duration.fast}ms var(--ease-standard, cubic-bezier(${motionTokens.easing.standard.join(", ")}))`,
                willChange: "transform, opacity",
                background: `radial-gradient(${radius}px circle at center, color-mix(in oklab, var(--accent, oklch(0.82 0.16 220)) 18%, transparent), transparent 70%)`,
              }}
            />
          </span>
        )}
        <span style={{ position: "relative", zIndex: 1, display: "contents" }}>
          {children}
        </span>
      </Comp>
    );
  },
);
