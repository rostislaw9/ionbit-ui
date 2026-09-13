import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type RadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>;

/**
 * RadioGroup — a single-choice selection group.
 *
 * Built on `@radix-ui/react-radio-group`, shadcn-inspired.
 * `RadioGroup` is the container; `RadioGroupItem` is an individual option.
 * The checked item shows a filled accent dot. Items are circular and use
 * the accent color when selected.
 *
 * Accessibility: Radix sets `role="radiogroup"` on the container and
 * `role="radio"` on each item, manages `aria-checked`, arrow-key
 * navigation between items, and focus. Label each item via a sibling
 * `<Label htmlFor>` or `aria-label`.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup({ className, ...props }, ref) {
    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn("grid w-full gap-2", className)}
        {...props}
      />
    );
  },
);

export type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>;

/**
 * RadioGroupItem — an individual radio option within a `RadioGroup`.
 *
 * Renders as a circular button with a border that turns accent-colored when
 * selected. The checked state displays a filled accent dot via the Radix
 * indicator. Must be placed inside a `RadioGroup` container.
 */
export const RadioGroupItem = forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex aspect-square size-4 shrink-0 rounded-full border border-border-strong bg-surface transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] outline-none hover:border-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent data-[state=checked]:bg-accent",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex size-4 items-center justify-center">
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
