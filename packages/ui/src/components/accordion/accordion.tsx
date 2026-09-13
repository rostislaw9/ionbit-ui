import type { AccordionSingleProps } from "@radix-ui/react-accordion";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type AccordionProps = Omit<AccordionSingleProps, "type"> & {
  collapsible?: boolean;
};

/**
 * Accordion — Radix-based single-value, collapsible accordion.
 *
 * Built on `@radix-ui/react-accordion` with `type="single"` and
 * `collapsible`, so only one item is open at a time and it can be
 * closed again by re-clicking its trigger.
 *
 * The expand/collapse animation uses CSS grid-row trick
 * (`grid-template-rows: 0fr → 1fr`) for smooth height transitions
 * that stay in sync with the content.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion({ className, collapsible = true, ...props }, ref) {
    return (
      <AccordionPrimitive.Root
        ref={ref}
        type="single"
        collapsible={collapsible}
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>;

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
        className={cn("border-b border-border last:border-b-0", className)}
        {...props}
      />
    );
  },
);

export type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
>;

/**
 * AccordionTrigger — the clickable header that toggles an AccordionItem.
 *
 * Renders a button inside a flex header row. Includes a `ChevronDown` icon
 * that rotates 180° when the item is open (`group-data-[state=open]`).
 * Keyboard accessible: Enter and Space toggle the panel.
 */
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between py-4 text-sm font-medium text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className="h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

export type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
>;

/**
 * AccordionContent — the collapsible body of an AccordionItem.
 *
 * Animates height via CSS grid-row transitions (`0fr → 1fr`) combined with
 * Radix's `data-[state]` attributes (`animate-accordion-up` / `animate-accordion-down`).
 * Content is wrapped in an inner `<div>` with vertical padding to prevent
 * clipping during the animation.
 */
export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm text-foreground-muted data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className,
      )}
      {...props}
    >
      <div className="pt-1 pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
});
