import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Invalid/error state. */
  invalid?: boolean;
}

/**
 * Input — a text input field with the Ionbit UI visual language.
 *
 * Uses semantic tokens only. The focus state uses an accent-tinted ring
 * plus a subtle border shift. Invalid state switches the border to error.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex h-8 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-base text-foreground transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] placeholder:text-foreground-subtle hover:border-border-strong focus-visible:shadow-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm",
        invalid && [
          "border-error hover:border-error",
          "focus-visible:shadow-focus-error",
        ],
        className,
      )}
      {...props}
    />
  );
});
