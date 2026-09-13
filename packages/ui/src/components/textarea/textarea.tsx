import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Invalid/error state. */
  invalid?: boolean;
}

/**
 * Textarea — a multi-line text input field with the Ionbit UI visual language.
 *
 * Built on native HTML, shadcn-inspired. Uses semantic tokens only. The
 * focus state uses an accent-tinted ring plus a subtle border shift.
 * Invalid state switches the border to error.
 *
 * Accessibility: the `invalid` prop sets `aria-invalid` on the underlying
 * `<textarea>`. Associate a `<Label htmlFor>` or use `aria-label` for
 * screen reader support.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid = false, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-border bg-surface px-3 py-2 text-base text-foreground transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] placeholder:text-foreground-subtle hover:border-border-strong focus-visible:shadow-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm",
          invalid && [
            "border-error hover:border-error",
            "focus-visible:shadow-focus-error",
          ],
          className,
        )}
        {...props}
      />
    );
  },
);
