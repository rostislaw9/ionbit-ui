import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface DropdownMenuProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Close the menu when the focus leaves its bounds. @default true */
  modal?: boolean;
}

/**
 * DropdownMenu — the root container for a Radix-based dropdown menu.
 *
 * Accessibility: Radix handles focus management, keyboard navigation
 * (Arrow keys to move between items, Escape to dismiss), and ARIA
 * attributes. The trigger is announced as a menu button via
 * `aria-haspopup` and `aria-expanded`.
 */
export function DropdownMenu({
  children,
  open,
  defaultOpen,
  onOpenChange,
  modal = true,
}: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </DropdownMenuPrimitive.Root>
  );
}

export type DropdownMenuTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
>;
/**
 * DropdownMenuTrigger — the element that opens the dropdown menu on click.
 *
 * Wraps the Radix trigger with `asChild` so the child element becomes the
 * trigger. Place around a button or interactive element.
 */
export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Trigger ref={ref} asChild {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
});

export type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;
/**
 * DropdownMenuContent — the floating panel containing the menu items.
 *
 * Portals and renders the Radix content with entrance/exit animations,
 * border, shadow, and elevated surface styling. Positioned relative to the
 * trigger with a configurable `sideOffset`.
 */
export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(function DropdownMenuContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-elevated p-1 text-foreground shadow-md duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

export type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
>;
/**
 * DropdownMenuItem — a single selectable action in the dropdown menu.
 *
 * Renders the Radix item with hover and focus states. Use `onSelect` to
 * trigger the action when the user chooses this item.
 */
export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground-muted transition-colors outline-none select-none hover:bg-surface-hover hover:text-foreground focus:bg-surface-hover focus:text-foreground data-[disabled]:opacity-40",
        className,
      )}
      {...props}
    />
  );
});

export type DropdownMenuSeparatorProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Separator
>;
/**
 * DropdownMenuSeparator — a horizontal divider between menu groups.
 *
 * Renders a thin border line. Use to visually separate sections of the
 * dropdown menu.
 */
export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
});

export type DropdownMenuLabelProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Label
>;
/**
 * DropdownMenuLabel — a non-interactive heading for a group of items.
 *
 * Renders a muted, semibold label. Use to label sections within the
 * dropdown menu.
 */
export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-foreground-subtle",
        className,
      )}
      {...props}
    />
  );
});
