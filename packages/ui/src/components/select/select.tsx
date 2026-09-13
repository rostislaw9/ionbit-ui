import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;

/**
 * Select — the root container for a Radix-based select dropdown.
 *
 * Built on `@radix-ui/react-select`, shadcn-inspired. Compose the dropdown
 * from `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`,
 * `SelectGroup`, `SelectLabel`, and `SelectSeparator` subcomponents.
 *
 * Accessibility: Radix handles focus management, keyboard navigation
 * (Arrow keys to move between items, Escape to dismiss), and ARIA
 * attributes. The trigger is announced as a combobox via
 * `aria-haspopup` and `aria-expanded`.
 */
export function Select({ children, ...props }: SelectProps) {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
}

export type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
>;
/**
 * SelectTrigger — the button that opens the select dropdown.
 *
 * Renders a bordered pill with the current value and a chevron-down icon.
 * Accepts a `placeholder` via the child `SelectValue`. Focus and disabled
 * states are styled with semantic tokens.
 */
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex h-8 items-center justify-between rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:border-border-strong focus-visible:shadow-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 data-[placeholder]:text-foreground-muted",
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);

export type SelectValueProps = React.ComponentProps<
  typeof SelectPrimitive.Value
>;
/**
 * SelectValue — displays the currently selected value inside the trigger.
 *
 * Pass a `placeholder` prop to show greyed-out text when nothing is
 * selected.
 */
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  function SelectValue({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Value ref={ref} className={cn(className)} {...props} />
    );
  },
);

export type SelectContentProps = React.ComponentProps<
  typeof SelectPrimitive.Content
>;
/**
 * SelectContent — the floating panel that contains the list of options.
 *
 * Rendered inside a Radix Portal with a popper position and configurable
 * `sideOffset`. Animates in/out with fade and slide. The viewport scrolls
 * when the list exceeds `max-h-96`.
 */
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(
    { className, children, position = "popper", sideOffset = 4, ...props },
    ref,
  ) {
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          position={position}
          sideOffset={sideOffset}
          className={cn(
            "z-50 max-h-96 min-w-[max(var(--radix-select-trigger-width),8rem)] overflow-hidden rounded-md border border-border bg-surface-elevated p-1 text-foreground shadow-md duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2",
            className,
          )}
          {...props}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);

export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;
/**
 * SelectItem — a single selectable option within `SelectContent`.
 *
 * Shows a check indicator when selected. Hover and focus states highlight
 * the row with the surface-hover token. Disabled items are dimmed.
 */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex items-center rounded-sm py-2 ps-2 pe-8 text-sm text-foreground-muted transition-colors outline-none select-none hover:bg-surface-hover hover:text-foreground focus:bg-surface-hover focus:text-foreground data-[disabled]:opacity-40 data-[state=checked]:text-accent",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <span className="absolute end-2 flex size-4 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <Check className="size-4" />
          </SelectPrimitive.ItemIndicator>
        </span>
      </SelectPrimitive.Item>
    );
  },
);

export type SelectGroupProps = React.ComponentProps<
  typeof SelectPrimitive.Group
>;
/**
 * SelectGroup — groups related items semantically.
 *
 * Use inside `SelectContent` to group related `SelectItem` components.
 * Pair with `SelectLabel` to provide a visible heading for the group.
 */
export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  function SelectGroup({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Group
        ref={ref}
        className={cn("p-1", className)}
        {...props}
      />
    );
  },
);

export type SelectLabelProps = React.ComponentProps<
  typeof SelectPrimitive.Label
>;
/**
 * SelectLabel — a non-selectable heading for grouping related items.
 *
 * Use inside a `SelectGroup` to label a section of options. Styled as a
 * small, semibold, muted-text label.
 */
export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  function SelectLabel({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Label
        ref={ref}
        className={cn(
          "px-2 py-1.5 text-xs font-semibold text-foreground-subtle",
          className,
        )}
        {...props}
      />
    );
  },
);

export type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
>;
/**
 * SelectSeparator — a horizontal divider between groups of items.
 *
 * Use inside `SelectContent` to visually separate `SelectGroup` sections.
 */
export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Separator
        ref={ref}
        className={cn("my-1 h-px bg-border", className)}
        {...props}
      />
    );
  },
);
