import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { forwardRef, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type CommandProps = React.ComponentProps<typeof CommandPrimitive>;

/**
 * Command — a composable command palette built on `cmdk`, shadcn-inspired.
 *
 * `Command` is a search-driven menu. `CommandDialog` wraps it in a `Dialog`
 * for a ⌘K-style modal. Sub-components (`CommandInput`, `CommandList`,
 * `CommandGroup`, `CommandItem`, `CommandEmpty`, `CommandSeparator`,
 * `CommandShortcut`) compose the layout.
 *
 * Accessibility: `cmdk` handles keyboard navigation (Arrow keys, Enter) and
 * `aria-selected` on the active item. `CommandDialog` provides a visually
 * hidden `DialogTitle`/`DialogDescription` for screen readers.
 */
export const Command = forwardRef<HTMLDivElement, CommandProps>(
  function Command({ className, ...props }, ref) {
    return (
      <CommandPrimitive
        ref={ref}
        // prettier-ignore
        className={cn("flex size-full flex-col overflow-hidden rounded-md bg-surface-elevated text-foreground", className)}
        {...props}
      />
    );
  },
);

export interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

/**
 * CommandDialog — a modal wrapper around `Command` for a ⌘K-style palette.
 *
 * Renders the command palette inside a `Dialog` with a visually hidden title
 * and description for screen readers. Pass `Command` sub-components as
 * children.
 */
export function CommandDialog({
  open,
  onOpenChange,
  children,
  className,
}: CommandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // prettier-ignore
        className={cn("top-[20%] -translate-y-0 overflow-hidden p-0 max-w-xl", className)}
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search for a command to run.
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export type CommandInputProps = React.ComponentProps<
  typeof CommandPrimitive.Input
>;

/**
 * CommandInput — the search input field for the command palette.
 *
 * Renders a search icon followed by the `cmdk` input. Filters the visible
 * items as the user types.
 */
export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  function CommandInput({ className, ...props }, ref) {
    return (
      <div className="flex items-center border-b border-border px-3">
        <Search className="me-2 h-4 w-4 shrink-0 text-foreground-subtle" />
        <CommandPrimitive.Input
          ref={ref}
          // prettier-ignore
          className={cn("flex h-12 w-full bg-transparent text-sm text-foreground placeholder:text-foreground-subtle focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40", className)}
          {...props}
        />
      </div>
    );
  },
);

export type CommandListProps = React.ComponentProps<
  typeof CommandPrimitive.List
>;

/**
 * CommandList — the scrollable container for command items.
 *
 * Renders the `cmdk` list with a max height and overflow scrolling. Only
 * items matching the current search are shown.
 */
export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  function CommandList({ className, ...props }, ref) {
    return (
      <CommandPrimitive.List
        ref={ref}
        // prettier-ignore
        className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-0.5", className)}
        {...props}
      />
    );
  },
);

export type CommandEmptyProps = React.ComponentProps<
  typeof CommandPrimitive.Empty
>;

/**
 * CommandEmpty — the placeholder shown when no items match the search.
 *
 * Renders a centered muted message. Place inside `CommandList` to indicate
 * an empty result set.
 */
export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  function CommandEmpty({ className, ...props }, ref) {
    return (
      <CommandPrimitive.Empty
        ref={ref}
        // prettier-ignore
        className={cn("py-6 text-center text-sm text-foreground-subtle", className)}
        {...props}
      />
    );
  },
);

export type CommandGroupProps = React.ComponentProps<
  typeof CommandPrimitive.Group
>;

/**
 * CommandGroup — a labeled group of command items.
 *
 * Renders a `cmdk` group with a styled heading. Use to categorize related
 * items within the command palette.
 */
export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  function CommandGroup({ className, ...props }, ref) {
    return (
      <CommandPrimitive.Group
        ref={ref}
        // prettier-ignore
        className={cn("overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-foreground-subtle", className)}
        {...props}
      />
    );
  },
);

export type CommandItemProps = React.ComponentProps<
  typeof CommandPrimitive.Item
>;

/**
 * CommandItem — a single selectable action in the command palette.
 *
 * Renders a `cmdk` item with hover and selected states. Use `onSelect` to
 * trigger the action when the user chooses this item.
 */
export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  function CommandItem({ className, ...props }, ref) {
    return (
      <CommandPrimitive.Item
        ref={ref}
        // prettier-ignore
        className={cn("relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground-muted outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] data-[selected=true]:bg-surface-hover data-[selected=true]:text-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)}
        {...props}
      />
    );
  },
);

export type CommandSeparatorProps = React.ComponentProps<
  typeof CommandPrimitive.Separator
>;

/**
 * CommandSeparator — a horizontal divider between command groups.
 *
 * Renders a thin border line. Use to visually separate groups within the
 * command list.
 */
export const CommandSeparator = forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  );
});

export type CommandShortcutProps = React.ComponentProps<"span">;

/**
 * CommandShortcut — a right-aligned keyboard shortcut hint for a command item.
 *
 * Renders muted, letter-spaced text. Place inside a `CommandItem` to display
 * the associated shortcut (e.g. ⌘K).
 */
export const CommandShortcut = forwardRef<
  HTMLSpanElement,
  CommandShortcutProps
>(function CommandShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      // prettier-ignore
      className={cn("ms-auto text-xs tracking-widest text-foreground-subtle", className)}
      {...props}
    />
  );
});
