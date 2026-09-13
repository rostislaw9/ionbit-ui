import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: ReactNode;
  /** Tooltip content. */
  content: ReactNode;
  /** Side of the trigger the tooltip appears on. @default "top" */
  side?: "top" | "right" | "bottom" | "left";
  /** Delay before showing in ms. @default 200 */
  delayDuration?: number;
  /** Disable the tooltip. @default false */
  disabled?: boolean;
}

const slideInBySide: Record<NonNullable<TooltipProps["side"]>, string> = {
  top: "slide-in-from-bottom-2",
  bottom: "slide-in-from-top-2",
  right: "slide-in-from-left-2",
  left: "slide-in-from-right-2",
};

/**
 * Tooltip — a Radix-based tooltip with Ionbit UI styling.
 *
 * Built on `@radix-ui/react-tooltip`, shadcn-inspired. Wraps Provider,
 * Root, Trigger, Portal, and Content into a single component for
 * convenience. Pass any element as `children` (rendered via `asChild`)
 * and tooltip text/JSX as `content`.
 *
 * Accessibility: Radix handles focus management, keyboard navigation
 * (Escape to dismiss), and ARIA attributes. The tooltip is announced to
 * screen readers via `aria-describedby`.
 *
 * Animation: appearance uses fade + slide-in from the trigger direction;
 * disappearance uses fade-out only (no movement on exit).
 *
 * Reduced motion: the CSS base layer collapses the animation duration.
 */
export function Tooltip({
  children,
  content,
  side = "top",
  delayDuration = 200,
  disabled = false,
}: TooltipProps) {
  if (disabled) return <>{children}</>;

  const slideIn = slideInBySide[side];

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(
              "z-50 rounded-md border border-border-strong bg-surface-elevated px-2.5 py-1.5 text-xs text-foreground shadow-md duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0",
              `data-[state=delayed-open]:${slideIn}`,
              `data-[state=instant-open]:${slideIn}`,
            )}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
