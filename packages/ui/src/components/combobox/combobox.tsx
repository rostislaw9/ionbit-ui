import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

/**
 * Combobox — a filterable select with an inline editable input.
 *
 * Built on Base UI's Combobox primitive (from the MUI team), shadcn-inspired.
 * Compose the dropdown from `ComboboxInput`, `ComboboxTrigger`,
 * `ComboboxClear`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`,
 * `ComboboxGroup`, `ComboboxLabel`, `ComboboxSeparator`, `ComboboxChips`,
 * `ComboboxChip`, `ComboboxChipsInput`, `ComboboxCollection`, and
 * `ComboboxValue`. Use `useComboboxAnchor` to anchor the popup to the
 * chips container in multiple mode.
 *
 * Accessibility: Base UI handles focus management, keyboard navigation
 * (Arrow keys, Enter, Escape, Home, End), ARIA attributes (`aria-expanded`,
 * `aria-activedescendant`, `aria-selected`), and listbox semantics. The
 * input is labelled via a native `<label>` or `aria-label`.
 */
const Combobox = ComboboxPrimitive.Root;

/**
 * A ref hook for anchoring the popup to the chips container in multiple
 * mode. Pass the ref to `ComboboxChips` and the `anchor` prop of
 * `ComboboxContent`.
 */
function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

/**
 * ComboboxValue — renders the selected value(s) inside the trigger.
 *
 * Without children, displays the selected label. Pass a render callback
 * to render chips in multi-select mode.
 *
 * Accessibility: announces the selected value to assistive technology.
 */
function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

/**
 * ComboboxTrigger — the button that toggles the popup open and closed.
 *
 * Renders a chevron-down icon. Use the `render` prop to render as a
 * custom element (e.g. a `Button`).
 *
 * Accessibility: labelled via `aria-label` or surrounding
 * `Combobox.Label`.
 */
function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-foreground-muted" />
    </ComboboxPrimitive.Trigger>
  );
}

/**
 * ComboboxClear — a button that clears the current selection.
 *
 * Renders as an `InputGroupButton` with an X icon. Hidden when no value
 * is selected.
 *
 * Accessibility: provide an `aria-label` (e.g. "Clear selection").
 */
function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      render={
        <InputGroupButton variant="ghost" size="icon-xs">
          <XIcon className="pointer-events-none" />
        </InputGroupButton>
      }
      {...props}
    />
  );
}

/**
 * ComboboxInput — the editable search field that doubles as the trigger.
 *
 * Wraps the Base UI input in an `InputGroup` with optional toggle and
 * clear buttons. Children are rendered inside the `InputGroup` (e.g.
 * leading `InputGroupAddon` icons).
 *
 * Accessibility: the input is the form control — label it with a native
 * `<label>` (via `id`) or `aria-label`. It carries `aria-expanded` and
 * `aria-activedescendant` for listbox interaction.
 */
function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <ComboboxTrigger
            render={
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                data-slot="input-group-button"
                className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
                disabled={disabled}
              />
            }
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

/**
 * ComboboxContent — the floating popup containing the filtered list.
 *
 * Portaled and positioned relative to the input/trigger with a
 * `sideOffset` of 6px. Animates in/out with fade + zoom using the
 * normal duration and standard easing tokens. When `anchor` is set the
 * popup is anchored to the chips container (multi-select mode).
 *
 * Accessibility: receives focus when opened and restores focus on close.
 */
function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}

          className={cn(
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg border border-border bg-surface-elevated text-foreground shadow-md duration-[var(--duration-normal)] ease-[var(--ease-standard)] data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-border/30 *:data-[slot=input-group]:bg-surface/30 *:data-[slot=input-group]:shadow-none",
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

/**
 * ComboboxList — the scrollable list of items inside the popup.
 *
 * Accepts a render callback `(item) => <ComboboxItem />` to map the
 * `items` collection, or composed `ComboboxGroup`/`ComboboxItem`
 * children for manual layout.
 *
 * Accessibility: has `role="listbox"`. Items have `role="option"`.
 */
function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ComboboxItem — a single selectable option inside `ComboboxList`.
 *
 * Pass the item (or its ID) to the `value` prop. Shows a check
 * indicator when selected.
 *
 * Accessibility: has `role="option"`, `aria-selected`, and keyboard
 * focus styling. Disabled items are dimmed and non-interactive.
 */
function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1 ps-1.5 pe-8 text-sm text-foreground-muted outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-surface-hover data-highlighted:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
            <CheckIcon className="pointer-events-none" />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  );
}

/**
 * ComboboxGroup — a labelled group of `ComboboxItem`s inside the list.
 *
 * Use a `ComboboxLabel` child for the heading. Items inside the group
 * are still filtered by the combobox input.
 *
 * Accessibility: has `role="group"` with an associated label.
 */
function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  );
}

/**
 * ComboboxLabel — the heading for a `ComboboxGroup`.
 *
 * Renders as a small, muted, semibold label.
 */
function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-foreground-subtle",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ComboboxCollection — renders items from a `createItems` collection,
 * used for virtualized or async-loaded item sets.
 */
function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

/**
 * ComboboxEmpty — shown when no items match the current filter.
 *
 * Hidden by default and displayed via the `group-data-empty` variant
 * on the popup.
 */
function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-foreground-muted group-data-empty/combobox-content:flex",
        className,
      )}
      {...props}
    />
  );
}

/**
 * ComboboxSeparator — a horizontal divider between groups of items.
 */
function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

/**
 * ComboboxChips — the multi-select container holding chips and an
 * inline input.
 *
 * Use in `multiple` mode. Renders a bordered, wrapping container with
 * focus-within styling. Place `ComboboxChip`s and a `ComboboxChipsInput`
 * inside. Pass a ref from `useComboboxAnchor` and the same ref to
 * `ComboboxContent`'s `anchor` prop to anchor the popup to the chips.
 *
 * Accessibility: has `role="listbox"` for the chip collection. Provide
 * an `aria-label` describing the selection.
 */
const ComboboxChips = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
    ComboboxPrimitive.Chips.Props
>(function ComboboxChips({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Chips
      ref={ref}
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-8 flex-wrap items-center gap-1 rounded-md border border-border bg-surface bg-clip-padding px-2.5 py-1 text-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-within:border-border-strong focus-within:shadow-focus has-aria-invalid:border-error has-aria-invalid:shadow-focus-error has-data-[slot=combobox-chip]:px-1",
        className,
      )}
      {...props}
    />
  );
});

/**
 * ComboboxChip — a single selected-value chip in multi-select mode.
 *
 * Renders the selected value with an optional remove button. Use
 * `ComboboxValue`'s render callback to map selected values to chips.
 *
 * Accessibility: provide `aria-label` and `aria-description` so screen
 * readers announce how to remove the chip.
 */
function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm bg-surface-hover px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pe-0",
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="-ms-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
          render={
            <Button variant="ghost" size="icon-xs">
              <XIcon className="pointer-events-none" />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  );
}

/**
 * ComboboxChipsInput — the inline editable input inside `ComboboxChips`.
 *
 * Filters items and accepts typeahead. Sits inline after the chips.
 *
 * Accessibility: label via `aria-label` or a surrounding `<label>`.
 */
function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxValue,
  useComboboxAnchor,
};

export type {
  ComboboxProps as ComboboxRootProps,
  ComboboxInputProps,
  ComboboxTriggerProps,
  ComboboxClearProps,
  ComboboxContentProps,
  ComboboxListProps,
  ComboboxItemProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxLabelProps,
  ComboboxCollectionProps,
  ComboboxSeparatorProps,
  ComboboxChipsProps,
  ComboboxChipsInputProps,
  ComboboxChipProps,
  ComboboxValueProps,
};

type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
> = ComboboxPrimitive.Root.Props<Value, Multiple, Item>;
type ComboboxInputProps = ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
};
type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;
type ComboboxClearProps = ComboboxPrimitive.Clear.Props;
type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >;
type ComboboxListProps = ComboboxPrimitive.List.Props;
type ComboboxItemProps = ComboboxPrimitive.Item.Props;
type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;
type ComboboxGroupProps = ComboboxPrimitive.Group.Props;
type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;
type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;
type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;
type ComboboxChipsProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Chips
> &
  ComboboxPrimitive.Chips.Props;
type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;
type ComboboxChipProps = ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
};
type ComboboxValueProps = ComboboxPrimitive.Value.Props;
