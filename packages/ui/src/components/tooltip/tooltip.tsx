import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { type ReactElement, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: ReactElement;
  /** Tooltip content. */
  content: ReactNode;
  /** Side of the trigger the tooltip appears on. @default "top" */
  side?: "top" | "right" | "bottom" | "left";
  /** Delay before showing in ms. @default 200 */
  delayDuration?: number;
  /** Disable the tooltip. @default false */
  disabled?: boolean;
}

/**
 * Tooltip — a Base UI tooltip with Ionbit UI styling.
 *
 * Built on `@base-ui/react/tooltip`, shadcn-inspired. Wraps Provider,
 * Root, Trigger, Portal, Positioner, Popup, and Arrow into a single
 * component for convenience. Pass any element as `children` (rendered
 * via the `render` prop) and tooltip text/JSX as `content`.
 *
 * Colors are inverted relative to the page: the tooltip uses the
 * foreground color as its background and the background color as its
 * text, making it readable in both light and dark themes.
 *
 * The arrow is a rotated square clipped by the popup, so the border
 * follows the combined shape. It is rendered inside the popup so
 * entrance/exit animations apply to both together.
 *
 * Accessibility: Base UI handles focus management, keyboard navigation
 * (Escape to dismiss), and ARIA attributes. The tooltip is announced to
 * screen readers via `aria-describedby`.
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

  return (
    <TooltipPrimitive.Provider delay={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger render={children} />
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            side={side}
            sideOffset={6}
            className="z-50"
          >
            <TooltipPrimitive.Popup
              className={cn(
                "z-50 inline-flex w-fit max-w-xs items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background",
                "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
                "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              )}
            >
              {content}
              <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
