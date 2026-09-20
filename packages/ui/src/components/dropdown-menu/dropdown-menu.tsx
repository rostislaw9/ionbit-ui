import type { ComponentProps, ReactNode } from "react";

import { Menu as DropdownMenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

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
 * DropdownMenu — the root container for a Base UI dropdown menu.
 *
 * Accessibility: Base UI handles focus management, keyboard navigation
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

export type DropdownMenuPortalProps = DropdownMenuPrimitive.Portal.Props;
/**
 * DropdownMenuPortal — portals menu content out of the DOM hierarchy.
 *
 * `DropdownMenuContent` already renders inside a portal; use this only
 * when portalling custom content anchored to the menu.
 */
export function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

export type DropdownMenuTriggerProps = DropdownMenuPrimitive.Trigger.Props;
/**
 * DropdownMenuTrigger — the element that opens the dropdown menu on click.
 *
 * Renders a `<button>` by default. Use the `render` prop to compose
 * another element or component as the trigger.
 */
export function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      // Explicit tabindex keeps the trigger in sequential keyboard nav on
      // macOS browsers (Safari, Firefox), which skip plain buttons unless
      // Full Keyboard Access is enabled.
      tabIndex={0}
      {...props}
    />
  );
}

export type DropdownMenuContentProps = DropdownMenuPrimitive.Popup.Props &
  Pick<
    DropdownMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;
/**
 * DropdownMenuContent — the floating panel containing the menu items.
 *
 * Portals and renders the Base UI popup with entrance/exit animations,
 * border, shadow, and elevated surface styling. Positioned relative to the
 * trigger with a configurable `sideOffset`.
 */
export function DropdownMenuContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border bg-surface-elevated p-1 text-foreground shadow-md duration-100 outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Positioner>
    </DropdownMenuPrimitive.Portal>
  );
}

export type DropdownMenuGroupProps = DropdownMenuPrimitive.Group.Props;
/**
 * DropdownMenuGroup — logical grouping of items, often paired with a
 * `DropdownMenuLabel` so the group is announced by its label.
 */
export function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

export interface DropdownMenuLabelProps
  extends DropdownMenuPrimitive.GroupLabel.Props {
  inset?: boolean;
}
/**
 * DropdownMenuLabel — a non-interactive heading for a group of items.
 *
 * Renders a muted, semibold label. Place inside a `DropdownMenuGroup` so
 * the label is associated with its items for assistive technology.
 */
export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold whitespace-nowrap text-foreground-subtle data-inset:ps-7",
        className,
      )}
      {...props}
    />
  );
}

export interface DropdownMenuItemProps
  extends DropdownMenuPrimitive.Item.Props {
  inset?: boolean;
  variant?: "default" | "destructive";
}
/**
 * DropdownMenuItem — a single selectable action in the dropdown menu.
 *
 * Renders the Base UI item with highlight and disabled states. Use
 * `onClick` to trigger the action when the user chooses this item.
 * `inset` indents the label to align with checkbox/radio items, and
 * `variant="destructive"` styles it with error colors.
 */
export function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm whitespace-nowrap text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-inset:ps-7 data-[variant=destructive]:text-error data-[variant=destructive]:focus:bg-error-muted data-[variant=destructive]:focus:text-error [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-foreground data-[variant=destructive]:*:[svg]:text-error",
        className,
      )}
      {...props}
    />
  );
}

export type DropdownMenuSubProps = DropdownMenuPrimitive.SubmenuRoot.Props;
/**
 * DropdownMenuSub — a nested sub-menu. Use with `DropdownMenuSubTrigger`
 * and `DropdownMenuSubContent`.
 */
export function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return (
    <DropdownMenuPrimitive.SubmenuRoot
      data-slot="dropdown-menu-sub"
      {...props}
    />
  );
}

export interface DropdownMenuSubTriggerProps
  extends DropdownMenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean;
}
/**
 * DropdownMenuSubTrigger — opens a nested sub-menu on hover or ArrowRight.
 * Shows a right-pointing chevron.
 */
export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm whitespace-nowrap text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-inset:ps-7 data-popup-open:bg-surface-hover data-popup-open:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto" />
    </DropdownMenuPrimitive.SubmenuTrigger>
  );
}

export type DropdownMenuSubContentProps = ComponentProps<
  typeof DropdownMenuContent
>;
/**
 * DropdownMenuSubContent — the floating panel for a nested sub-menu.
 * Defaults to `side="right"`; Base UI flips it on collision.
 */
export function DropdownMenuSubContent({
  className,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("min-w-24 shadow-lg", className)}
      align="start"
      alignOffset={-3}
      side="right"
      sideOffset={0}
      {...props}
    />
  );
}

export interface DropdownMenuCheckboxItemProps
  extends DropdownMenuPrimitive.CheckboxItem.Props {
  inset?: boolean;
}
/**
 * DropdownMenuCheckboxItem — a toggleable item with a check indicator.
 * Stays open on toggle so several options can be changed at once.
 */
export function DropdownMenuCheckboxItem({
  className,
  children,
  inset,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-sm py-1.5 ps-2 pe-8 text-sm whitespace-nowrap text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-inset:ps-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute end-2 flex items-center justify-center">
        <DropdownMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export type DropdownMenuRadioGroupProps =
  DropdownMenuPrimitive.RadioGroup.Props;
/**
 * DropdownMenuRadioGroup — a group of mutually exclusive radio items.
 */
export function DropdownMenuRadioGroup({
  ...props
}: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

export interface DropdownMenuRadioItemProps
  extends DropdownMenuPrimitive.RadioItem.Props {
  inset?: boolean;
}
/**
 * DropdownMenuRadioItem — a single-choice item within a
 * `DropdownMenuRadioGroup`.
 */
export function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-sm py-1.5 ps-2 pe-8 text-sm whitespace-nowrap text-foreground-muted transition-colors outline-none select-none focus:bg-surface-hover focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-inset:ps-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute end-2 flex items-center justify-center">
        <DropdownMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export type DropdownMenuSeparatorProps = DropdownMenuPrimitive.Separator.Props;
/**
 * DropdownMenuSeparator — a horizontal divider between menu groups.
 *
 * Renders a thin border line. Use to visually separate sections of the
 * dropdown menu.
 */
export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export type DropdownMenuShortcutProps = ComponentProps<"span">;
/**
 * DropdownMenuShortcut — a right-aligned keyboard shortcut hint.
 * Presentational only; wire the actual key handling yourself.
 */
export function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ms-auto text-xs tracking-widest text-foreground-subtle group-focus/dropdown-menu-item:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
