import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface HoverCardProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

/**
 * HoverCard — a popover revealed on hover.
 *
 * Built on `@radix-ui/react-hover-card`, shadcn-inspired.
 * Useful for previewing linked content (e.g. user profiles, link cards)
 * without navigating away. Open/close delays are configurable via
 * `openDelay` and `closeDelay` (defaults 200ms / 300ms).
 *
 * Accessibility: Radix handles focus management and ARIA attributes. The
 * content is announced via `aria-describedby` on the trigger. Content is
 * dismissible with Escape.
 */
export function HoverCard({
  children,
  open,
  defaultOpen,
  onOpenChange,
  openDelay = 200,
  closeDelay = 300,
}: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      {children}
    </HoverCardPrimitive.Root>
  );
}

export type HoverCardTriggerProps = React.ComponentProps<
  typeof HoverCardPrimitive.Trigger
>;
/**
 * HoverCardTrigger — the element that opens the hover card on hover.
 *
 * Renders as a child element via `asChild`, so the trigger is whatever
 * element you wrap (e.g. an `<a>` or `<button>`). Hover and focus open
 * the card content.
 */
export const HoverCardTrigger = forwardRef<
  HTMLAnchorElement,
  HoverCardTriggerProps
>(function HoverCardTrigger({ children, ...props }, ref) {
  return (
    <HoverCardPrimitive.Trigger ref={ref} asChild {...props}>
      {children}
    </HoverCardPrimitive.Trigger>
  );
});

export type HoverCardContentProps = React.ComponentProps<
  typeof HoverCardPrimitive.Content
>;
/**
 * HoverCardContent — the floating panel shown when the card is open.
 *
 * Portaled to the body and positioned relative to the trigger. Includes
 * open/close animations (fade + zoom) using the fast duration and standard
 * easing tokens. Accepts a `sideOffset` (default 6px) for spacing from the
 * trigger.
 */
export const HoverCardContent = forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(function HoverCardContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-64 rounded-md border border-border-strong bg-surface-elevated p-4 text-foreground shadow-md duration-[var(--duration-fast)] ease-[var(--ease-standard)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
});
