import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const spinnerVariants = cva("animate-spin shrink-0 text-current", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
      xl: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends
    Omit<SVGProps<SVGSVGElement>, "size">,
    VariantProps<typeof spinnerVariants> {}

/**
 * Spinner — a loading indicator icon.
 *
 * Built on lucide-react's `Loader2` with `animate-spin`, shadcn-inspired.
 * Compose into buttons (`<Button disabled><Spinner data-icon="inline-start" />
 * Saving...</Button>`) or any loading context. Uses `text-current` so it
 * inherits the surrounding text color and adapts to any surface (accent
 * button, outline button, muted container, etc.) without manual color
 * overrides.
 *
 * Accessibility: the spinner is decorative by default. Add `aria-label` or
 * wrap with a live region (`aria-live="polite"`) for screen reader
 * announcements during async operations.
 */
export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  { className, size, ...props },
  ref,
) {
  return (
    <Loader2
      ref={ref}
      data-slot="spinner"
      aria-hidden="true"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
});
