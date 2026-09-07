import { Moon, Sun } from "lucide-react";
import { forwardRef, useCallback, useRef, type MouseEvent } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

export type Mode = "dark" | "light";

export interface ModeSwitcherProps extends Omit<
  ButtonProps,
  "onClick" | "children"
> {
  /** Current color mode. */
  mode: Mode;
  /** Called when the user toggles the mode. */
  onModeChange: (mode: Mode) => void;
}

/**
 * Mode Switcher — a dark/light theme toggle with a radial reveal animation.
 *
 * Built on the Button component, so it inherits all button variants and
 * sizes. Defaults to `variant="ghost"` and `size="icon"`.
 *
 * Uses the View Transitions API to animate the theme change as a growing
 * circle originating from the button's position. Falls back to an instant
 * toggle in browsers that do not support `document.startViewTransition`.
 *
 * Accessibility: the underlying Button is keyboard accessible (Enter and
 * Space). An `aria-label` reflects the next action (e.g. "Switch to light
 * mode"). The radial animation is skipped when `prefers-reduced-motion` is
 * set.
 */
export const ModeSwitcher = forwardRef<HTMLButtonElement, ModeSwitcherProps>(
  function ModeSwitcher({ mode, onModeChange, className, ...props }, ref) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = useCallback(
      (_event: MouseEvent<HTMLButtonElement>) => {
        const nextMode: Mode = mode === "dark" ? "light" : "dark";

        // Fall back to an instant toggle when the View Transitions API
        // is not supported.
        if (!document.startViewTransition) {
          onModeChange(nextMode);
          return;
        }

        // Origin of the radial reveal — the button's center.
        const button = buttonRef.current;
        if (!button) {
          onModeChange(nextMode);
          return;
        }

        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Distance to the furthest corner — the circle must cover the
        // entire viewport.
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );

        // Expose the geometry as CSS custom properties so the
        // view-transition CSS can reference them if needed.
        document.documentElement.style.setProperty("--vt-x", `${x}px`);
        document.documentElement.style.setProperty("--vt-y", `${y}px`);
        document.documentElement.style.setProperty(
          "--vt-radius",
          `${endRadius}px`,
        );

        const transition = document.startViewTransition(() => {
          onModeChange(nextMode);
        });

        transition.ready.then(() => {
          // The new theme always grows from the button center as an
          // expanding circle, regardless of which direction we switch.
          // The old snapshot sits underneath (z-index 0) and is
          // progressively covered by the new view.
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];

          document.documentElement.animate(
            { clipPath },
            {
              duration: 400,
              easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        });
      },
      [mode, onModeChange],
    );

    const isDark = mode === "dark";
    const label = isDark ? "Switch to light mode" : "Switch to dark mode";

    return (
      <Button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        variant="ghost"
        size="icon"
        onClick={handleClick}
        aria-label={label}
        title={label}
        className={className}
        {...props}
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
    );
  },
);
