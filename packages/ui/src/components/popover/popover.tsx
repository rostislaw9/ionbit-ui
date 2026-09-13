import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Close when clicking outside. @default true */
  modal?: boolean;
}

/**
 * Popover — a floating panel anchored to a trigger.
 *
 * Built on `@radix-ui/react-popover`, shadcn-inspired.
 * The root component manages open/close state and modal behavior. Compose
 * with `PopoverTrigger` and `PopoverContent` for the full popover pattern.
 *
 * Accessibility: Radix handles focus management, keyboard navigation
 * (Escape to dismiss), and ARIA attributes.
 */
export function Popover({
  children,
  open,
  defaultOpen,
  onOpenChange,
  modal = true,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </PopoverPrimitive.Root>
  );
}

export type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;
/**
 * PopoverTrigger — the element that toggles the popover open and closed.
 *
 * Renders as a child element via `asChild`, so the trigger is whatever
 * element you wrap (e.g. a `<button>`). Clicking the trigger toggles the
 * popover content.
 */
export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(function PopoverTrigger({ children, ...props }, ref) {
  return (
    <PopoverPrimitive.Trigger ref={ref} asChild {...props}>
      {children}
    </PopoverPrimitive.Trigger>
  );
});

export type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;
/**
 * PopoverContent — the floating panel shown when the popover is open.
 *
 * Portaled to the body and positioned relative to the trigger with a
 * `sideOffset` of 6px. Includes open/close animations (fade + zoom) using
 * the normal duration and standard easing tokens. Receives focus when
 * opened and restores focus to the trigger on close.
 */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({ className, children, ...props }, ref) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          sideOffset={6}
          className={cn(
            "z-50 w-72 rounded-md border border-border bg-surface-elevated p-4 text-foreground shadow-md duration-[var(--duration-normal)] ease-[var(--ease-standard)] focus-visible:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            className,
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  },
);
