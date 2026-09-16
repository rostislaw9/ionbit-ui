import type { ComponentProps } from "react";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type ContextMenuProps = ContextMenuPrimitive.Root.Props;

/**
 * ContextMenu — displays a menu of actions triggered by a right click.
 */
export function ContextMenu({ ...props }: ContextMenuProps) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

export type ContextMenuTriggerProps = ContextMenuPrimitive.Trigger.Props;
/**
 * ContextMenuTrigger — opens the menu on right-click or long-press.
 * Renders a `<div>`. Use the `render` prop to swap the element.
 */
export function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  );
}

export type ContextMenuPortalProps = ContextMenuPrimitive.Portal.Props;
/**
 * ContextMenuPortal — portals menu content out of the DOM hierarchy.
 */
export function ContextMenuPortal({ ...props }: ContextMenuPortalProps) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

export type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;
/**
 * ContextMenuContent — the floating menu panel with collision-aware positioning.
 */
export function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border bg-surface-elevated p-1 text-foreground shadow-md duration-100 outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

export type ContextMenuGroupProps = ContextMenuPrimitive.Group.Props;
/**
 * ContextMenuGroup — logical grouping of items, often paired with a label.
 */
export function ContextMenuGroup({ ...props }: ContextMenuGroupProps) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

export type ContextMenuSubProps = ContextMenuPrimitive.SubmenuRoot.Props;
/**
 * ContextMenuSub — nested sub-menu. Use with SubTrigger and SubContent.
 */
export function ContextMenuSub({ ...props }: ContextMenuSubProps) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  );
}

export type ContextMenuRadioGroupProps = ContextMenuPrimitive.RadioGroup.Props;
/**
 * ContextMenuRadioGroup — mutually exclusive radio items.
 */
export function ContextMenuRadioGroup({
  ...props
}: ContextMenuRadioGroupProps) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

export interface ContextMenuItemProps extends ContextMenuPrimitive.Item.Props {
  inset?: boolean;
  variant?: "default" | "destructive";
}
/**
 * ContextMenuItem — a single action. `inset` indents the label;
 * `variant="destructive"` styles it with error colors.
 */
export function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex cursor-default items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-foreground-muted outline-hidden transition-colors select-none focus:bg-surface-hover focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-inset:ps-7 data-[variant=destructive]:text-error data-[variant=destructive]:focus:bg-error-muted data-[variant=destructive]:focus:text-error [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-foreground data-[variant=destructive]:*:[svg]:text-error",
        className,
      )}
      {...props}
    />
  );
}

export interface ContextMenuSubTriggerProps
  extends ContextMenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean;
}
/**
 * ContextMenuSubTrigger — opens a nested sub-menu. Shows a right-chevron.
 */
export function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-foreground-muted outline-hidden transition-colors select-none focus:bg-surface-hover focus:text-foreground data-inset:ps-7 data-popup-open:bg-surface-hover data-popup-open:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

export type ContextMenuSubContentProps = ComponentProps<
  typeof ContextMenuContent
>;
/**
 * ContextMenuSubContent — floating panel for a nested sub-menu.
 * Defaults to `side="right"`; Base UI flips it on collision.
 */
export function ContextMenuSubContent({
  className,
  ...props
}: ContextMenuSubContentProps) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={cn("shadow-lg", className)}
      side="right"
      {...props}
    />
  );
}

export interface ContextMenuCheckboxItemProps
  extends ContextMenuPrimitive.CheckboxItem.Props {
  inset?: boolean;
}
/**
 * ContextMenuCheckboxItem — toggleable item with a check indicator.
 */
export function ContextMenuCheckboxItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-sm py-1.5 ps-2 pe-8 text-sm text-foreground-muted outline-hidden transition-colors select-none focus:bg-surface-hover focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-inset:ps-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute end-2 flex items-center justify-center">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

export interface ContextMenuRadioItemProps
  extends ContextMenuPrimitive.RadioItem.Props {
  inset?: boolean;
}
/**
 * ContextMenuRadioItem — single-choice item within a RadioGroup.
 */
export function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-sm py-1.5 ps-2 pe-8 text-sm text-foreground-muted outline-hidden transition-colors select-none focus:bg-surface-hover focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-inset:ps-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute end-2 flex items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

export interface ContextMenuLabelProps
  extends ContextMenuPrimitive.GroupLabel.Props {
  inset?: boolean;
}
/**
 * ContextMenuLabel — non-interactive heading for a group.
 */
export function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold tracking-wider text-foreground-subtle uppercase data-inset:ps-7",
        className,
      )}
      {...props}
    />
  );
}

export type ContextMenuSeparatorProps = ContextMenuPrimitive.Separator.Props;
/**
 * ContextMenuSeparator — horizontal divider between groups.
 */
export function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuSeparatorProps) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export type ContextMenuShortcutProps = ComponentProps<"span">;
/**
 * ContextMenuShortcut — right-aligned keyboard shortcut hint.
 */
export function ContextMenuShortcut({
  className,
  ...props
}: ContextMenuShortcutProps) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ms-auto text-xs tracking-widest text-foreground-subtle group-focus/context-menu-item:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
