import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type AccordionProps = AccordionPrimitive.Root.Props;

/**
 * Accordion — Base UI accordion.
 *
 * Built on `@base-ui/react/accordion`. By default only one item can be
 * open at a time and it can be closed again by re-clicking its trigger;
 * pass `multiple` to allow several open items. `value` and
 * `defaultValue` take an array of item values.
 *
 * The expand/collapse animation uses keyframes driven by Base UI's
 * `--accordion-panel-height` variable for smooth height transitions
 * that stay in sync with the content.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion({ className, ...props }, ref) {
    return (
      <AccordionPrimitive.Root
        ref={ref}
        data-slot="accordion"
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);

export type AccordionItemProps = AccordionPrimitive.Item.Props;

/**
 * AccordionItem — a single collapsible section within an Accordion.
 *
 * Renders a bordered container that wraps an `AccordionTrigger` and
 * `AccordionContent` pair. Use the `value` prop to control which item
 * is open (must be unique within the Accordion).
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ className, ...props }, ref) {
    return (
      <AccordionPrimitive.Item
        ref={ref}
        data-slot="accordion-item"
        className={cn("border-b border-border last:border-b-0", className)}
        {...props}
      />
    );
  },
);

export type AccordionTriggerProps = AccordionPrimitive.Trigger.Props;

/**
 * AccordionTrigger — the clickable header that toggles an AccordionItem.
 *
 * Renders a button inside a flex header row. Includes a `ChevronDown` icon
 * that rotates 180° when the item is open (`group-aria-expanded`).
 * Keyboard accessible: Enter and Space toggle the panel.
 */
export const AccordionTrigger = forwardRef<HTMLElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, ...props }, ref) {
    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          data-slot="accordion-trigger"
          className={cn(
            "group flex flex-1 items-center justify-between py-4 text-sm font-medium text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-40",
            className,
          )}
          {...props}
        >
          {children}
          <ChevronDown
            className="h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-aria-expanded:rotate-180"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);

export type AccordionContentProps = AccordionPrimitive.Panel.Props;

/**
 * AccordionContent — the collapsible body of an AccordionItem.
 *
 * Renders a Base UI `Accordion.Panel` with `role="region"`. Animates height
 * via keyframes synced to the `--accordion-panel-height` variable, combined
 * with `data-open` / `data-closed` attributes (`animate-accordion-up` /
 * `animate-accordion-down`). Content is wrapped in an inner `<div>` with
 * vertical padding to prevent clipping during the animation.
 */
export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Panel
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-foreground-muted data-closed:animate-accordion-up data-open:animate-accordion-down",
        className,
      )}
      {...props}
    >
      <div className="pt-1 pb-4">{children}</div>
    </AccordionPrimitive.Panel>
  );
});
