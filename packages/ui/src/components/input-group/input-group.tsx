import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const inputGroupVariants = cva(
  "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-md border border-border bg-surface transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-border-strong has-[[data-slot=input-group-control]:focus-visible]:shadow-focus has-[[data-slot][aria-invalid=true]]:border-error has-[[data-slot][aria-invalid=true]]:shadow-focus-error has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export interface InputGroupProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupVariants> {}

/**
 * InputGroup — a container that groups an input with addons.
 *
 * Shadcn-inspired. Replaces the pattern of absolutely-positioning buttons
 * or icons inside inputs. Use `InputGroupInput` or `InputGroupTextarea`
 * for the field itself, and `InputGroupAddon` for leading/trailing icons,
 * buttons, or text. Addon position is controlled by the `align` prop on
 * `InputGroupAddon` (`inline-start`, `inline-end`, `block-start`,
 * `block-end`). The container auto-switches to a column layout when a
 * block addon is present.
 *
 * Accessibility: sets `role="group"`. Use `aria-label` or
 * `aria-labelledby` to label the group. Focus and invalid states are
 * detected via `data-slot="input-group-control"` on the inner input.
 */
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup({ className, orientation, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="input-group"
        role="group"
        className={cn(inputGroupVariants({ orientation }), className)}
        {...props}
      />
    );
  },
);

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 text-sm font-medium text-foreground-muted select-none group-data-[disabled=true]/input-group:opacity-50 [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      align: {
        "inline-start": "order-first ps-1.5 has-[>button]:-ms-0.5",
        "inline-end": "order-last pe-1.5 has-[>button]:-me-0.5",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

export interface InputGroupAddonProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupAddonVariants> {}

/**
 * InputGroupAddon — a leading, trailing, top, or bottom addon inside an
 * `InputGroup`.
 *
 * Use for icons, buttons, or text. The `align` prop controls position:
 * `inline-start` (default), `inline-end`, `block-start`, `block-end`.
 * Clicking the addon focuses the inner input, unless a button was clicked.
 */
export const InputGroupAddon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  function InputGroupAddon({ className, align, onClick, ...props }, ref) {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events -- click-to-focus is a progressive enhancement; buttons inside are keyboard accessible
      <div
        ref={ref}
        role="group"
        data-slot="input-group-addon"
        data-align={align ?? "inline-start"}
        className={cn(inputGroupAddonVariants({ align }), className)}
        onClick={(e) => {
          onClick?.(e);
          if ((e.target as HTMLElement).closest("button")) return;
          e.currentTarget.parentElement?.querySelector("input")?.focus();
        }}
        {...props}
      />
    );
  },
);

export type InputGroupButtonProps = ButtonProps;

/**
 * InputGroupButton — a `Button` pre-configured for use inside an
 * `InputGroupAddon`. Defaults to `variant="ghost"` and `size="xs"`.
 * Use `size="icon-xs"` for icon-only buttons.
 */
export const InputGroupButton = forwardRef<
  HTMLButtonElement,
  InputGroupButtonProps
>(function InputGroupButton(
  { className, type = "button", variant = "ghost", size = "xs", ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      type={type}
      variant={variant}
      size={size}
      className={cn("shadow-none", className)}
      {...props}
    />
  );
});

export type InputGroupTextProps = HTMLAttributes<HTMLSpanElement>;

/**
 * InputGroupText — non-interactive text within an `InputGroup` addon.
 *
 * Useful for units (e.g. "kg", "$"), prefixes, or suffixes.
 */
export const InputGroupText = forwardRef<HTMLSpanElement, InputGroupTextProps>(
  function InputGroupText({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="input-group-text"
        className={cn(
          "flex items-center gap-2 text-sm text-foreground-muted [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    );
  },
);

export type InputGroupInputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * InputGroupInput — the text input inside an `InputGroup`.
 *
 * Strips the outer border, background, and focus ring since the
 * `InputGroup` container provides them. Sets
 * `data-slot="input-group-control"` so the container can detect
 * focus and invalid states.
 */
export const InputGroupInput = forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(function InputGroupInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "flex w-full min-w-0 flex-1 bg-transparent px-3 py-1.5 text-base text-foreground outline-none placeholder:text-foreground-subtle disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
});

export type InputGroupTextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * InputGroupTextarea — the textarea inside an `InputGroup`.
 *
 * Strips the outer border, background, and focus ring since the
 * `InputGroup` container provides them. Sets
 * `data-slot="input-group-control"` so the container can detect
 * focus and invalid states.
 */
export const InputGroupTextarea = forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(function InputGroupTextarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "flex min-h-[80px] w-full min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-base text-foreground outline-none placeholder:text-foreground-subtle disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
});

export type InputGroupSeparatorProps = HTMLAttributes<HTMLSpanElement>;

/**
 * InputGroupSeparator — a vertical divider between the input and addons.
 *
 * Ionbit addition (not in shadcn). Useful when an addon contains a
 * button and you want a visual separation from the input field.
 */
export const InputGroupSeparator = forwardRef<
  HTMLSpanElement,
  InputGroupSeparatorProps
>(function InputGroupSeparator({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="input-group-separator"
      className={cn("mx-1 w-px self-stretch bg-border", className)}
      {...props}
    />
  );
});
