import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Invalid/error state. */
  invalid?: boolean;
}

/**
 * NativeSelect — a styled native HTML `<select>` element.
 *
 * Built on native HTML, shadcn-inspired. Uses the same border, focus,
 * and invalid-state styling as `Input` and `Textarea`. A custom
 * `ChevronDown` icon replaces the default browser arrow. Use this
 * instead of the Radix-based `Select` when JavaScript-free progressive
 * enhancement is required.
 *
 * Accessibility: the underlying `<select>` is fully accessible by
 * default. Associate a `<Label htmlFor>` or use `aria-label` for screen
 * reader support. The `invalid` prop sets `aria-invalid`.
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(
    { className, invalid = false, children, ...props },
    ref,
  ) {
    return (
      <div className="relative flex w-full">
        <select
          ref={ref}
          aria-invalid={invalid || undefined}
          className={cn(
            "flex h-8 w-full appearance-none rounded-md border border-border bg-surface px-3 py-1.5 pe-9 text-base text-foreground transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong focus-visible:shadow-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm",
            invalid && [
              "border-error hover:border-error",
              "focus-visible:shadow-focus-error",
            ],
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"

          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted"
        />
      </div>
    );
  },
);
