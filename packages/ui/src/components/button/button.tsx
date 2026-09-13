import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none rounded-md transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-[var(--shadow-glow)]",
        "primary-soft":
          "bg-accent-muted text-accent hover:shadow-[var(--shadow-glow)]",
        secondary:
          "bg-surface-elevated text-foreground border border-border hover:bg-surface-hover hover:border-border-strong",
        outline:
          "bg-transparent text-foreground border border-border-strong hover:bg-accent-muted hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-foreground hover:bg-surface-hover",
        destructive:
          "bg-error text-error-foreground hover:bg-error-hover hover:shadow-[var(--shadow-glow-error)]",
        "destructive-soft":
          "bg-error-muted text-error hover:shadow-[var(--shadow-glow-error)]",
        link: "bg-transparent text-accent underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-8 gap-1 px-2.5 text-sm has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-9 gap-2 px-3.5 text-base has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3 [&_svg:not([class*='size-'])]:size-4",
        xl: "h-10 gap-2 px-4.5 text-lg has-data-[icon=inline-end]:pe-4 has-data-[icon=inline-start]:ps-4 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-7 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-8 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-9 [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button — the primary action trigger.
 *
 * Built on `@radix-ui/react-slot` (for `asChild` composition), shadcn-inspired.
 * Variants cover primary, secondary, outline, ghost, destructive, and link.
 * Sizes include text buttons (`xs`–`xl`) and icon-only buttons (`icon-xs`–
 * `icon-xl`). On active, the button shifts 1px down for tactile feedback.
 *
 * Accessibility: renders a native `<button>` with `type="button"` by default.
 * Use `asChild` to render as a link or other element; the `type` prop is
 * ignored when `asChild` is set.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, asChild = false, type, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
