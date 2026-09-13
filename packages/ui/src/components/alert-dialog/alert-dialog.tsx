import type { HTMLAttributes } from "react";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AlertDialogProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * AlertDialog — a modal dialog that requires user acknowledgement.
 *
 * Built on `@radix-ui/react-alert-dialog`, shadcn-inspired. Unlike
 * `Dialog`, an AlertDialog is intentionally non-dismissable by clicking
 * outside or pressing Escape — the user must choose an action. Use it for
 * destructive or irreversible confirmations.
 *
 * Accessibility: Radix handles focus trapping, `aria-describedby`, and
 * announces the dialog as an alertdialog. `AlertDialogAction` and
 * `AlertDialogCancel` are styled `Button` wrappers that close on click.
 */
export function AlertDialog({
  children,
  open,
  defaultOpen,
  onOpenChange,
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </AlertDialogPrimitive.Root>
  );
}

export type AlertDialogTriggerProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>;
/**
 * AlertDialogTrigger — the element that opens the AlertDialog.
 *
 * Renders a Radix Trigger with `asChild`, so wrap it around a button or
 * other interactive element. Clicking the trigger opens the dialog.
 */
export const AlertDialogTrigger = forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(function AlertDialogTrigger({ children, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Trigger ref={ref} asChild {...props}>
      {children}
    </AlertDialogPrimitive.Trigger>
  );
});

export type AlertDialogContentProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Content
>;
/**
 * AlertDialogContent — the modal panel containing the dialog's content.
 *
 * Renders inside a Radix Portal with a backdrop overlay. Includes fade and
 * zoom animations on open/close. The overlay is non-dismissable (clicking
 * outside does not close the dialog) — this is the key behavioral difference
 * from a regular `Dialog`.
 */
export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(function AlertDialogContent({ className, children, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm duration-[var(--duration-normal)] ease-[var(--ease-standard)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        )}
      />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border-strong bg-surface-elevated p-6 shadow-lg duration-[var(--duration-normal)] ease-[var(--ease-standard)] focus-visible:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
});

export type AlertDialogTitleProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>;
/**
 * AlertDialogTitle — the heading of the AlertDialog.
 *
 * Renders an `<h2>` via Radix's Title primitive. Radix automatically wires
 * `aria-labelledby` on the dialog content to this element. Always include
 * a title to ensure the dialog is announced correctly by screen readers.
 */
export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(function AlertDialogTitle({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  );
});

export type AlertDialogDescriptionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>;
/**
 * AlertDialogDescription — the body text explaining the dialog's purpose.
 *
 * Renders a `<p>` via Radix's Description primitive. Radix automatically
 * wires `aria-describedby` on the dialog content to this element. Use it
 * to clearly state the consequences of the user's action.
 */
export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn(
        "mt-2 text-sm leading-relaxed text-foreground-muted",
        className,
      )}
      {...props}
    />
  );
});

export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * AlertDialogFooter — the action button container at the bottom of the dialog.
 *
 * Renders a flex row aligned to the end (right side). Place
 * `AlertDialogCancel` and `AlertDialogAction` inside, typically with
 * the cancel button on the left and the action button on the right.
 */
export const AlertDialogFooter = forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(function AlertDialogFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("mt-6 flex items-center justify-end gap-3", className)}
      {...props}
    />
  );
});

export type AlertDialogActionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Action
>;
/**
 * AlertDialogAction — the confirmation button that closes the dialog on click.
 *
 * A styled `Button` wrapper (variant `destructive`) around Radix's Action
 * primitive. Clicking it closes the dialog and fires `onOpenChange(false)`.
 * Use for the primary confirm action (e.g. "Delete", "Discard").
 */
export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(function AlertDialogAction({ className, ...props }, ref) {
  return (
    <Button asChild variant="destructive" className={cn(className)}>
      <AlertDialogPrimitive.Action ref={ref} {...props} />
    </Button>
  );
});

export type AlertDialogCancelProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Cancel
>;
/**
 * AlertDialogCancel — the dismissal button that closes the dialog on click.
 *
 * A styled `Button` wrapper (variant `secondary`) around Radix's Cancel
 * primitive. Clicking it closes the dialog without performing the action.
 * Use for the safe/opt-out action (e.g. "Cancel", "Keep").
 */
export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(function AlertDialogCancel({ className, ...props }, ref) {
  return (
    <Button asChild variant="secondary" className={cn(className)}>
      <AlertDialogPrimitive.Cancel ref={ref} {...props} />
    </Button>
  );
});
