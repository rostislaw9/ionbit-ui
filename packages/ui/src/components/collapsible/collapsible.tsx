import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type CollapsibleProps = Omit<
  CollapsiblePrimitive.Root.Props,
  "className"
> & {
  className?: string;
};

/**
 * Collapsible — a single expand/collapse section built on
 * `@base-ui/react`.
 *
 * Simpler than `Accordion` when you need a single toggle rather than a
 * coordinated set of sections. Compose with `CollapsibleTrigger` and
 * `CollapsibleContent`.
 *
 * Accessibility: Base UI manages `aria-expanded`, `aria-controls`, and
 * keyboard activation (Enter/Space on the trigger).
 */
export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  function Collapsible({ className, ...props }, ref) {
    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        data-slot="collapsible"
        className={cn(className)}
        {...props}
      />
    );
  },
);

export type CollapsibleTriggerProps = Omit<
  CollapsiblePrimitive.Trigger.Props,
  "className"
> & {
  className?: string;
};

/**
 * CollapsibleTrigger — the button that toggles the collapsible content.
 *
 * Use the `render` prop to render as a custom trigger (e.g. a `Button`).
 */
export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(function CollapsibleTrigger({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn(className)}
      {...props}
    />
  );
});

export type CollapsibleContentProps = Omit<
  CollapsiblePrimitive.Panel.Props,
  "className"
> & {
  className?: string;
};

/**
 * CollapsibleContent — the collapsible body.
 *
 * Unstyled by default; apply layout classes via `className`. Base UI
 * handles the open/closed state and mounts/unmounts the content.
 */
export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(function CollapsibleContent({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Panel
      ref={ref}
      data-slot="collapsible-content"
      className={cn(className)}
      {...props}
    />
  );
});
