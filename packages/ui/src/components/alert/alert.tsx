import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

// prettier-ignore
export const alertVariants = cva(
  "relative flex w-full flex-col gap-2 rounded-lg border p-4 text-sm text-foreground transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-foreground",
        accent: "border-border-accent bg-accent-subtle text-foreground [&_svg]:text-accent",
        info: "border-border-info bg-info-subtle text-foreground [&_svg]:text-info",
        success: "border-border-success bg-success-muted text-foreground [&_svg]:text-success",
        warning: "border-border-warning bg-warning-muted text-foreground [&_svg]:text-warning",
        error: "border-border-error bg-error-muted text-foreground [&_svg]:text-error",
        "accent-soft": "border-border bg-surface text-accent [&_svg]:text-accent",
        "info-soft": "border-border bg-surface text-info [&_svg]:text-info",
        "success-soft": "border-border bg-surface text-success [&_svg]:text-success",
        "warning-soft": "border-border bg-surface text-warning [&_svg]:text-warning",
        "error-soft": "border-border bg-surface text-error [&_svg]:text-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

/**
 * Alert — a callout for surfacing status messages.
 *
 * Layout: `AlertTitle` renders as a flex row pairing an icon (if present)
 * with the title text. `AlertDescription` is an optional second row for
 * additional context.
 *
 * Accessibility: use `role="alert"` for critical messages (the `error` and
 * `warning` variants set this automatically). Use `role="status"` for
 * informational messages. Provide a clear title via `AlertTitle`.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant, role, ...props },
  ref,
) {
  const implicitRole =
    role ??
    (variant === "error" ||
    variant === "warning" ||
    variant === "error-soft" ||
    variant === "warning-soft"
      ? "alert"
      : "status");
  return (
    <div
      ref={ref}
      role={implicitRole}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
});

export type AlertTitleProps = HTMLAttributes<HTMLDivElement>;

/**
 * AlertTitle — the first row of an Alert. Renders as a flex row so an icon
 * (placed as the first child) sits inline with the title text.
 */
export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  function AlertTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        // prettier-ignore
        className={cn("flex items-center gap-2 font-medium leading-none tracking-tight [&_svg]:size-4 [&_svg]:shrink-0", className)}
        {...props}
      />
    );
  },
);

export type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;

/**
 * AlertDescription — an optional second row for additional context text.
 * Renders with reduced opacity to establish visual hierarchy below the title.
 */
export const AlertDescription = forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(function AlertDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("ps-6 text-sm leading-relaxed opacity-70", className)}
      {...props}
    />
  );
});
