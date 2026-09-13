import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type CheckboxProps = CheckboxPrimitive.Root.Props;

/**
 * Checkbox — a binary selection control.
 *
 * Built on `@base-ui/react`, shadcn-inspired. Renders a
 * circular checkbox with a check icon indicator. The checked state uses the
 * accent color; the unchecked state uses a subtle foreground border.
 *
 * Accessibility: Base UI sets `role="checkbox"` and manages `aria-checked`,
 * keyboard toggling (Space), and focus. Label the control via a sibling
 * `<Label htmlFor>` or `aria-label`.
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        className={cn(
          "peer inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-foreground-subtle bg-surface leading-none transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-accent focus-visible:shadow-focus focus-visible:outline-none aria-invalid:border-error aria-invalid:hover:border-error-hover aria-invalid:focus-visible:shadow-focus-error data-checked:border-accent data-checked:bg-accent data-disabled:cursor-not-allowed data-disabled:opacity-40",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          keepMounted
          className={cn(
            "flex items-center justify-center text-accent-foreground data-checked:animate-in data-checked:fade-in",
          )}
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
