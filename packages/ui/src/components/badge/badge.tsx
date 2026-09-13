import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex h-5 items-center gap-1 rounded-sm border px-1.5 text-xs font-medium leading-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        // Neutral
        default: "border-transparent bg-surface-hover text-foreground",
        outline: "border-border-strong bg-transparent text-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground-muted hover:bg-surface-hover hover:text-foreground",
        // Accent
        accent: "border-border-accent bg-accent-muted text-accent",
        "accent-soft": "border-transparent bg-accent-muted text-accent",
        "accent-text":
          "border-transparent bg-transparent text-accent hover:bg-surface-hover",
        // Success
        success: "border-border-success bg-success-muted text-success",
        "success-soft": "border-transparent bg-success-muted text-success",
        "success-text":
          "border-transparent bg-transparent text-success hover:bg-surface-hover",
        // Warning
        warning: "border-border-warning bg-warning-muted text-warning",
        "warning-soft": "border-transparent bg-warning-muted text-warning",
        "warning-text":
          "border-transparent bg-transparent text-warning hover:bg-surface-hover",
        // Error
        error: "border-border-error bg-error-muted text-error",
        "error-soft": "border-transparent bg-error-muted text-error",
        "error-text":
          "border-transparent bg-transparent text-error hover:bg-surface-hover",
        // Info
        info: "border-border-info bg-info-muted text-info",
        "info-soft": "border-transparent bg-info-muted text-info",
        "info-text":
          "border-transparent bg-transparent text-info hover:bg-surface-hover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

/**
 * Badge — a small status indicator.
 *
 * Built on `@radix-ui/react-slot` (for `asChild` composition),
 * shadcn-inspired. Variants cover neutral (default, outline,
 * ghost) and semantic colors (accent, success, warning, error, info),
 * each with soft (muted background) and text (color only) styles.
 *
 * Accessibility: use semantic variant colors to convey meaning, not color
 * alone. Include an icon or text label that describes the status.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
});
