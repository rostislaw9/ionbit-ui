import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type RadioGroupProps = RadioGroupPrimitive.Props;

/**
 * RadioGroup — a single-choice selection group.
 *
 * Built on `@base-ui/react`, shadcn-inspired.
 * `RadioGroup` is the container; `RadioGroupItem` is an individual option.
 * The checked item shows a filled accent dot. Items are circular and use
 * the accent color when selected.
 *
 * Accessibility: Base UI sets `role="radiogroup"` on the container and
 * `role="radio"` on each item, manages `aria-checked`, arrow-key
 * navigation between items, and focus. Label each item via a sibling
 * `<Label htmlFor>` or `aria-label`.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup({ className, ...props }, ref) {
    return (
      <RadioGroupPrimitive
        ref={ref}
        className={cn("grid w-full gap-2", className)}
        {...props}
      />
    );
  },
);

export type RadioGroupItemProps = Omit<RadioPrimitive.Root.Props, "value"> & {
  value: string;
};

/**
 * RadioGroupItem — an individual radio option within a `RadioGroup`.
 *
 * Renders as a circular button with a border that turns accent-colored when
 * selected. The checked state displays a filled accent dot via the Base UI
 * indicator. Must be placed inside a `RadioGroup` container.
 */
export const RadioGroupItem = forwardRef<HTMLSpanElement, RadioGroupItemProps>(
  function RadioGroupItem({ className, ...props }, ref) {
    return (
      <RadioPrimitive.Root
        ref={ref}
        nativeButton
        render={<button type="button" />}
        className={cn(
          "relative flex aspect-square size-4 shrink-0 rounded-full border border-border-strong bg-surface leading-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover/field:border-accent hover:border-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error aria-invalid:hover:border-error-hover data-checked:border-accent data-checked:bg-accent aria-invalid:data-checked:border-error aria-invalid:data-checked:bg-error",
          className,
        )}
        {...props}
      >
        <RadioPrimitive.Indicator className="flex size-full items-center justify-center">
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-foreground aria-invalid:bg-error-foreground" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
    );
  },
);
