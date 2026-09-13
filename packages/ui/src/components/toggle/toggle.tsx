import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium select-none rounded-md transition-[background-color,border-color,color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground hover:bg-surface-hover data-[state=on]:bg-accent-muted data-[state=on]:text-accent",
        outline:
          "bg-transparent text-foreground border border-border-strong hover:bg-surface-hover hover:border-border-strong data-[state=on]:text-accent data-[state=on]:bg-accent-muted data-[state=on]:border-accent-muted",
      },
      size: {
        xs: "h-6 min-w-6 px-2 text-xs has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 min-w-7 px-2.5 text-xs has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-8 min-w-8 px-3 text-sm has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-9 min-w-9 px-4 text-base has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3 [&_svg:not([class*='size-'])]:size-4",
        xl: "h-10 min-w-10 px-5 text-lg has-data-[icon=inline-end]:pe-4 has-data-[icon=inline-start]:ps-4 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-7 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-8 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-9 [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ToggleProps
  extends
    Omit<React.ComponentProps<typeof TogglePrimitive.Root>, "asChild">,
    VariantProps<typeof toggleVariants> {
  asChild?: boolean;
}

/**
 * Toggle — a two-state button that can be either on or off.
 *
 * Built on `@radix-ui/react-toggle`, shadcn-inspired. Visually similar to
 * Button but maintains a pressed/unpressed state. Use `defaultPressed` for
 * uncontrolled usage or `pressed`/`onPressedChange` for controlled usage.
 *
 * Accessibility: Radix sets `aria-pressed` based on the pressed state.
 * Keyboard toggle via Space and Enter. Label the control with text content
 * or `aria-label`.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle({ className, variant, size, asChild, ...props }, ref) {
    return (
      <TogglePrimitive.Root
        ref={ref}
        data-slot="toggle"
        asChild={asChild}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
