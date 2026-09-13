import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type ScrollAreaProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
>;

/**
 * ScrollArea — a custom-styled scroll container.
 *
 * Built on `@radix-ui/react-scroll-area`, shadcn-inspired.
 * Replaces native scrollbars with themed ones that match the design system.
 * `ScrollArea` renders the viewport and a vertical `ScrollBar` by default;
 * use `ScrollBar` with `orientation="horizontal"` for horizontal scrolling.
 * The thumb uses the border token and brightens on hover.
 *
 * Accessibility: Radix preserves native scroll semantics and keyboard
 * scrolling. The scrollbar is presentational (`role="presentation"`).
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea({ className, children, ...props }, ref) {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  },
);

export type ScrollBarProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

/**
 * ScrollBar — a themed scrollbar for use within a `ScrollArea`.
 *
 * Supports `orientation` of `"vertical"` (default) or `"horizontal"`. The
 * thumb uses the border token and brightens on hover via `bg-border-strong`.
 * Automatically included by `ScrollArea` for vertical scrolling; add a
 * second instance with `orientation="horizontal"` for bidirectional scroll.
 */
export const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(
  function ScrollBar({ className, orientation = "vertical", ...props }, ref) {
    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
          "flex touch-none transition-colors select-none",
          orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-px",
          orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent p-px",
          className,
        )}
        {...props}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-border-strong" />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
  },
);
