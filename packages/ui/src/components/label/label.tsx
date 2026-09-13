import * as LabelPrimitive from "@radix-ui/react-label";
import { forwardRef, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

/**
 * Label — a form label associated with a control via `htmlFor`.
 *
 * Accessibility: Radix Label automatically handles the `htmlFor` ↔ `id`
 * association. Clicking the label focuses the associated control.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, ...props },
  ref,
) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm leading-none font-medium text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] peer-disabled:cursor-not-allowed peer-disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
});
