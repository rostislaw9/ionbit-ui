import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  /** Switch size. @default "default" */
  size?: "sm" | "default";
}

const switchSizes = {
  sm: "h-3.5 w-6",
  default: "h-5 w-9",
} as const;

const switchThumbSizes = {
  sm: "h-2.5 w-2.5 data-checked:translate-x-[12px]",
  default: "h-3.5 w-3.5 data-checked:translate-x-[18px]",
} as const;

/**
 * Switch — a toggle for a binary on/off state.
 *
 * Built on `@base-ui/react`, shadcn-inspired. A pill-shaped control
 * that flips between off and on. The thumb slides horizontally; the track
 * fills with the accent color when checked.
 *
 * Accessibility: Base UI sets `role="switch"` and manages `aria-checked`,
 * keyboard toggling (Space), and focus. Label the control via a sibling
 * `<Label htmlFor>` or `aria-label`.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch({ className, size = "default", ...props }, ref) {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        data-slot="switch"
        data-size={size}
        className={cn(
          "peer inline-flex shrink-0 items-center rounded-full border border-border bg-surface leading-none transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none aria-invalid:border-error aria-invalid:hover:border-error-hover aria-invalid:focus-visible:shadow-focus-error data-checked:border-accent data-checked:bg-accent data-disabled:cursor-not-allowed data-disabled:opacity-40",
          switchSizes[size],
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block translate-x-0.5 rounded-full bg-foreground shadow-sm transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-checked:bg-accent-foreground",
            switchThumbSizes[size],
          )}
        />
      </SwitchPrimitive.Root>
    );
  },
);
