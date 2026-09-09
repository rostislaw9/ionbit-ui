import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type CollapsibleProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Root
>;

/**
 * Collapsible — a single expand/collapse section built on
 * `@radix-ui/react-collapsible`.
 *
 * Simpler than `Accordion` when you need a single toggle rather than a
 * coordinated set of sections. Compose with `CollapsibleTrigger` and
 * `CollapsibleContent`.
 *
 * Accessibility: Radix manages `aria-expanded`, `aria-controls`, and
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

export type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

/**
 * CollapsibleTrigger — the button that toggles the collapsible content.
 *
 * Use `asChild` to render as a custom trigger (e.g. a `Button`).
 */
export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(function CollapsibleTrigger({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn(className)}
      {...props}
    />
  );
});

export type CollapsibleContentProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Content
>;

/**
 * CollapsibleContent — the collapsible body.
 *
 * Unstyled by default; apply layout classes via `className`. Radix
 * handles the open/closed state and mounts/unmounts the content.
 */
export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(function CollapsibleContent({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      data-slot="collapsible-content"
      className={cn(className)}
      {...props}
    />
  );
});
