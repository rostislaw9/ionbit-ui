import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const buttonGroupVariants = cva(
  "group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 [&>input]:flex-1",
  {
    variants: {
      variant: {
        overlapped: "",
        separated: "",
      },
      orientation: {
        horizontal: "",
        vertical: "flex-col",
      },
    },
    compoundVariants: [
      {
        variant: "overlapped",
        orientation: "horizontal",
        className:
          "[&>*:not(:first-child)]:-ms-px [&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child):not(:hover)]:border-s-border-strong/50 [&>*:hover+*]:border-s-border-strong! [&>*:not(:last-child)]:rounded-e-none [&>*:not(:last-child):not(:hover)]:border-e-border-strong/50 [&>*:not(:last-child):has(+ *:hover)]:border-e-border-strong!",
      },
      {
        variant: "overlapped",
        orientation: "vertical",
        className:
          "[&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child):not(:hover)]:border-t-border-strong/50 [&>*:hover+*]:border-t-border-strong! [&>*:not(:last-child)]:rounded-b-none [&>*:not(:last-child):not(:hover)]:border-b-border-strong/50 [&>*:not(:last-child):has(+ *:hover)]:border-b-border-strong!",
      },
      {
        variant: "separated",
        orientation: "horizontal",
        className:
          "[&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none [&>*:hover]:border-border-strong!",
      },
      {
        variant: "separated",
        orientation: "vertical",
        className:
          "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>*:hover]:border-border-strong!",
      },
    ],
    defaultVariants: {
      variant: "overlapped",
      orientation: "horizontal",
    },
  },
);

export interface ButtonGroupProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof buttonGroupVariants> {
  children?: ReactNode;
}

/**
 * ButtonGroup — a container that groups related buttons with consistent
 * styling.
 *
 * Not built on Radix — a lightweight wrapper that applies `role="group"`
 * and connected border styling. Children share borders so inner edges have
 * no gap: the first child keeps its left/top rounding, the last keeps its
 * right/bottom rounding, and middle children have both squared. Use
 * `ButtonGroupSeparator` to visually divide sections, and `ButtonGroupText`
 * for non-interactive labels within the group.
 *
 * Accessibility: sets `role="group"`. Use `aria-label` or `aria-labelledby`
 * to label the group. Keyboard navigation follows the natural Tab order of
 * the children.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup({ className, variant, orientation, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="button-group"
        data-variant={variant ?? "overlapped"}
        data-orientation={orientation ?? "horizontal"}
        className={cn(buttonGroupVariants({ variant, orientation }), className)}
        {...props}
      />
    );
  },
);

export interface ButtonGroupSeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * ButtonGroupSeparator — a visual divider between buttons in a group.
 *
 * Renders a 1px line. For horizontal groups the separator is vertical;
 * for vertical groups it is horizontal. Buttons with `variant="outline"`
 * already have borders and may not need a separator.
 */
export function ButtonGroupSeparator({
  orientation = "vertical",
  className,
}: ButtonGroupSeparatorProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="button-group-separator"
      className={cn(
        "relative self-stretch bg-accent-foreground",
        orientation === "vertical" ? "w-px" : "h-px w-full",
        className,
      )}
    />
  );
}

export interface ButtonGroupTextProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

/**
 * ButtonGroupText — non-interactive text within a button group.
 *
 * Useful for labels or descriptions placed alongside buttons. Use
 * `asChild` to render a custom element (e.g. a `Label`).
 */
export const ButtonGroupText = forwardRef<HTMLDivElement, ButtonGroupTextProps>(
  function ButtonGroupText({ children, asChild, className }, ref) {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-slot="button-group-text"
        className={cn(
          "flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 text-sm font-medium text-foreground-muted [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
      >
        {children}
      </Comp>
    );
  },
);
