import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

/**
 * Sheet — a slide-in panel that anchors to a screen edge.
 *
 * Built on `@radix-ui/react-dialog`, shadcn-inspired. A panel that slides
 * in from a screen edge (`side`: top/right/bottom/left). Uses the same
 * Radix Dialog primitive as `Dialog`, but anchored to a side with a slide
 * animation. Includes an optional close button.
 *
 * Accessibility: Radix handles focus trapping, Escape to dismiss, scroll
 * lock, and ARIA attributes. Provide a `SheetTitle` and `SheetDescription`
 * for screen readers.
 */
export function Sheet({ ...props }: SheetProps) {
  return <DialogPrimitive.Root {...props} />;
}

export type SheetTriggerProps = React.ComponentProps<
  typeof DialogPrimitive.Trigger
>;
/**
 * SheetTrigger — the element that opens the sheet.
 *
 * Wraps a Radix Dialog Trigger with `asChild`, so pass a button or other
 * interactive element as the child.
 */
export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(
  function SheetTrigger({ ...props }, ref) {
    return <DialogPrimitive.Trigger ref={ref} asChild {...props} />;
  },
);

export type SheetCloseProps = React.ComponentProps<
  typeof DialogPrimitive.Close
>;
/**
 * SheetClose — the element that closes the sheet.
 *
 * Wraps a Radix Dialog Close with `asChild`. Place inside `SheetContent`
 * to provide a custom close affordance.
 */
export const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  function SheetClose({ ...props }, ref) {
    return <DialogPrimitive.Close ref={ref} asChild {...props} />;
  },
);

export type SheetContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
> & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
};

/**
 * SheetContent — the panel body that slides in from the chosen edge.
 *
 * Renders a Radix Portal with an overlay and the content panel. The `side`
 * prop controls which edge the panel animates from. An optional close
 * button (X icon) is shown in the top-right corner when `showCloseButton`
 * is enabled (default).
 */
export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  function SheetContent(
    { className, children, side = "right", showCloseButton = true, ...props },
    ref,
  ) {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm duration-[var(--duration-normal)] ease-[var(--ease-standard)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          data-side={side}
          className={cn(
            "fixed z-50 flex flex-col gap-4 bg-surface-elevated shadow-lg transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:border-b data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[side=bottom]:data-[state=closed]:slide-out-to-bottom data-[side=left]:data-[state=closed]:slide-out-to-left data-[side=right]:data-[state=closed]:slide-out-to-right data-[side=top]:data-[state=closed]:slide-out-to-top data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[side=bottom]:data-[state=open]:slide-in-from-bottom data-[side=left]:data-[state=open]:slide-in-from-left data-[side=right]:data-[state=open]:slide-in-from-right data-[side=top]:data-[state=open]:slide-in-from-top data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn("absolute end-3 top-3")}
            >
              <DialogPrimitive.Close aria-label="Close">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </Button>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);

export type SheetHeaderProps = React.ComponentProps<"div">;
/**
 * SheetHeader — a layout container for the top of the sheet panel.
 *
 * Provides flex column spacing and padding for a `SheetTitle` and
 * `SheetDescription`.
 */
export const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(
  function SheetHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5 p-4", className)}
        {...props}
      />
    );
  },
);

export type SheetFooterProps = React.ComponentProps<"div">;
/**
 * SheetFooter — a layout container pinned to the bottom of the sheet.
 *
 * Uses `mt-auto` to push content to the bottom. Typically holds action
 * buttons (e.g. Save / Cancel).
 */
export const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(
  function SheetFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("mt-auto flex flex-col gap-2 p-4", className)}
        {...props}
      />
    );
  },
);

export type SheetTitleProps = React.ComponentProps<
  typeof DialogPrimitive.Title
>;
/**
 * SheetTitle — the accessible title for the sheet.
 *
 * Rendered as a Radix Dialog Title. Required for screen reader support;
 * omitting it will cause Radix to emit a console warning.
 */
export const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(
  function SheetTitle({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={cn("text-base font-medium text-foreground", className)}
        {...props}
      />
    );
  },
);

export type SheetDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;
/**
 * SheetDescription — the accessible description for the sheet.
 *
 * Rendered as a Radix Dialog Description. Provides supplementary
 * information for screen reader users.
 */
export const SheetDescription = forwardRef<
  HTMLParagraphElement,
  SheetDescriptionProps
>(function SheetDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-foreground-muted", className)}
      {...props}
    />
  );
});
