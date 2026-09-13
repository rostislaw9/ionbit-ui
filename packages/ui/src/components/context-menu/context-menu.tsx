import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type ContextMenuProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Root
>;

/**
 * ContextMenu — a right-click menu, Radix-based, shadcn-inspired.
 *
 * Built on `@radix-ui/react-context-menu`, shadcn-inspired. Triggered by
 * right-clicking the `ContextMenuTrigger`. Supports sub-menus, checkbox
 * items, radio groups, labels, separators, and shortcuts. Items accept an
 * `inset` prop for indented labels and a `variant="destructive"` for
 * dangerous actions.
 *
 * Accessibility: Radix handles focus management, keyboard navigation
 * (Arrow keys, Escape), positioning, and ARIA attributes. The menu is
 * announced as a context menu via `role="menu"`.
 */
export function ContextMenu({ ...props }: ContextMenuProps) {
  return <ContextMenuPrimitive.Root {...props} />;
}

export type ContextMenuTriggerProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Trigger
>;
/**
 * ContextMenuTrigger — the element that opens the context menu on right-click.
 *
 * Wraps the Radix trigger with `select-none` to prevent text selection.
 * Place around the content the user right-clicks to reveal the menu.
 */
export const ContextMenuTrigger = forwardRef<
  HTMLSpanElement,
  ContextMenuTriggerProps
>(function ContextMenuTrigger({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Trigger
      ref={ref}
      className={cn("select-none", className)}
      {...props}
    />
  );
});

export type ContextMenuGroupProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Group
>;
/**
 * ContextMenuGroup — a logical grouping of context menu items.
 *
 * Renders the Radix group primitive. Use to organize related items, often
 * paired with a `ContextMenuLabel`.
 */
export const ContextMenuGroup = forwardRef<
  HTMLDivElement,
  ContextMenuGroupProps
>(function ContextMenuGroup({ ...props }, ref) {
  return <ContextMenuPrimitive.Group ref={ref} {...props} />;
});

export type ContextMenuPortalProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Portal
>;
/**
 * ContextMenuPortal — portals the menu content out of the DOM hierarchy.
 *
 * Renders the Radix portal primitive. Ensures the menu is positioned
 * correctly relative to the viewport rather than its parent.
 */
export function ContextMenuPortal({ ...props }: ContextMenuPortalProps) {
  return <ContextMenuPrimitive.Portal {...props} />;
}

export type ContextMenuSubProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Sub
>;
/**
 * ContextMenuSub — a nested sub-menu within the context menu.
 *
 * Renders the Radix sub primitive. Combine with `ContextMenuSubTrigger` and
 * `ContextMenuSubContent` to create cascading menus.
 */
export function ContextMenuSub({ ...props }: ContextMenuSubProps) {
  return <ContextMenuPrimitive.Sub {...props} />;
}

export type ContextMenuRadioGroupProps = React.ComponentProps<
  typeof ContextMenuPrimitive.RadioGroup
>;
/**
 * ContextMenuRadioGroup — a group of mutually exclusive radio items.
 *
 * Renders the Radix radio group primitive. Use with `ContextMenuRadioItem`
 * to present a single-choice selection within the menu.
 */
export const ContextMenuRadioGroup = forwardRef<
  HTMLDivElement,
  ContextMenuRadioGroupProps
>(function ContextMenuRadioGroup({ ...props }, ref) {
  return <ContextMenuPrimitive.RadioGroup ref={ref} {...props} />;
});

export type ContextMenuContentProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Content
>;
/**
 * ContextMenuContent — the floating panel containing the menu items.
 *
 * Portals and renders the Radix content with entrance/exit animations,
 * border, shadow, and elevated surface styling.
 */
export const ContextMenuContent = forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(function ContextMenuContent({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-elevated p-1 text-foreground shadow-md duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
});

export interface ContextMenuItemProps extends React.ComponentProps<
  typeof ContextMenuPrimitive.Item
> {
  inset?: boolean;
  variant?: "default" | "destructive";
}
/**
 * ContextMenuItem — a single selectable action in the context menu.
 *
 * Supports an `inset` prop for indented labels and a `variant="destructive"`
 * for dangerous actions that should be styled with error colors.
 */
export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  function ContextMenuItem(
    { className, inset, variant = "default", ...props },
    ref,
  ) {
    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        data-inset={inset}
        data-variant={variant}
        className={cn(
          "relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-[disabled]:opacity-40 data-[inset]:ps-7 data-[variant=destructive]:text-error data-[variant=destructive]:focus:bg-error-muted data-[variant=destructive]:focus:text-error [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    );
  },
);

export type ContextMenuSubTriggerProps = React.ComponentProps<
  typeof ContextMenuPrimitive.SubTrigger
> & { inset?: boolean };
/**
 * ContextMenuSubTrigger — the trigger that opens a nested sub-menu.
 *
 * Displays a right-chevron indicator and supports an `inset` prop for
 * alignment with indented items. Opens the `ContextMenuSubContent` on hover
 * or arrow-key navigation.
 */
export const ContextMenuSubTrigger = forwardRef<
  HTMLDivElement,
  ContextMenuSubTriggerProps
>(function ContextMenuSubTrigger(
  { className, inset, children, ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      data-inset={inset}
      className={cn(
        "relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-[inset]:ps-7 data-[state=open]:bg-surface-hover data-[state=open]:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
});

export type ContextMenuSubContentProps = React.ComponentProps<
  typeof ContextMenuPrimitive.SubContent
>;
/**
 * ContextMenuSubContent — the floating panel for a nested sub-menu.
 *
 * Renders the Radix sub-content with entrance/exit animations, border,
 * shadow, and elevated surface styling. Position is managed by Radix.
 */
export const ContextMenuSubContent = forwardRef<
  HTMLDivElement,
  ContextMenuSubContentProps
>(function ContextMenuSubContent({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-elevated p-1 text-foreground shadow-md duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    />
  );
});

export interface ContextMenuCheckboxItemProps extends React.ComponentProps<
  typeof ContextMenuPrimitive.CheckboxItem
> {
  inset?: boolean;
}
/**
 * ContextMenuCheckboxItem — a toggleable item with a check indicator.
 *
 * Renders the Radix checkbox item with a check icon shown when selected.
 * Supports an `inset` prop for alignment with indented items.
 */
export const ContextMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>(function ContextMenuCheckboxItem(
  { className, children, inset, ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      data-inset={inset}
      className={cn(
        "relative flex items-center gap-2 rounded-sm py-1.5 ps-2 pe-8 text-sm text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-[disabled]:opacity-40 data-[inset]:ps-7",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute end-2 flex items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});

export interface ContextMenuRadioItemProps extends React.ComponentProps<
  typeof ContextMenuPrimitive.RadioItem
> {
  inset?: boolean;
}
/**
 * ContextMenuRadioItem — a single-choice item within a radio group.
 *
 * Renders the Radix radio item with a check icon shown when selected. Use
 * inside `ContextMenuRadioGroup` for mutually exclusive options. Supports
 * an `inset` prop for alignment with indented items.
 */
export const ContextMenuRadioItem = forwardRef<
  HTMLDivElement,
  ContextMenuRadioItemProps
>(function ContextMenuRadioItem({ className, children, inset, ...props }, ref) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      data-inset={inset}
      className={cn(
        "relative flex items-center gap-2 rounded-sm py-1.5 ps-2 pe-8 text-sm text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-[disabled]:opacity-40 data-[inset]:ps-7",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute end-2 flex items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});

export interface ContextMenuLabelProps extends React.ComponentProps<
  typeof ContextMenuPrimitive.Label
> {
  inset?: boolean;
}
/**
 * ContextMenuLabel — a non-interactive heading for a group of items.
 *
 * Renders a muted, uppercase, semibold label. Supports an `inset` prop for
 * alignment with indented items. Use to label sections within the menu.
 */
export const ContextMenuLabel = forwardRef<
  HTMLDivElement,
  ContextMenuLabelProps
>(function ContextMenuLabel({ className, inset, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold tracking-wider text-foreground-subtle uppercase data-[inset]:ps-7",
        className,
      )}
      {...props}
    />
  );
});

export type ContextMenuSeparatorProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Separator
>;
/**
 * ContextMenuSeparator — a horizontal divider between menu groups.
 *
 * Renders a thin border line. Use to visually separate sections of the
 * context menu.
 */
export const ContextMenuSeparator = forwardRef<
  HTMLDivElement,
  ContextMenuSeparatorProps
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
});

export type ContextMenuShortcutProps = React.ComponentProps<"span">;
/**
 * ContextMenuShortcut — a right-aligned keyboard shortcut hint for a menu item.
 *
 * Renders muted, letter-spaced text. Place inside a `ContextMenuItem` to
 * display the associated shortcut (e.g. ⌘C).
 */
export const ContextMenuShortcut = forwardRef<
  HTMLSpanElement,
  ContextMenuShortcutProps
>(function ContextMenuShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn(
        "ms-auto text-xs tracking-widest text-foreground-subtle",
        className,
      )}
      {...props}
    />
  );
});
