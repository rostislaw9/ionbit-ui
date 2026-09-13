import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, forwardRef, useContext, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { toggleVariants, type ToggleProps } from "../toggle/toggle";

type ToggleGroupVariant = NonNullable<ToggleProps["variant"]>;
type ToggleGroupSize = NonNullable<ToggleProps["size"]>;

interface ToggleGroupContextValue {
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
  spacing: number;
}

const ToggleGroupCtx = createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "md",
  spacing: 2,
});

type ToggleGroupSingleProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    type: "single";
  },
  "asChild"
>;

type ToggleGroupMultipleProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    type: "multiple";
  },
  "asChild"
>;

export type ToggleGroupProps = (
  ToggleGroupSingleProps | ToggleGroupMultipleProps
) & {
  children: ReactNode;
  className?: string;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  spacing?: number;
};

const spacingGapMap: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
};

/**
 * ToggleGroup — a set of two-state buttons with single or multiple selection.
 *
 * Built on `@radix-ui/react-toggle-group`, shadcn-inspired. Set `type` to
 * `"single"` for radio-like behavior or `"multiple"` for independent toggles.
 * Pass `variant`, `size`, and `spacing` on the group to propagate them to all
 * items.
 *
 * Accessibility: Radix sets `role="radiogroup"` (single) or `role="toolbar"`
 * (multiple) on the root and `aria-pressed` on each item. Keyboard navigation
 * is handled by Radix. Use `aria-label` to label the group.
 */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      className,
      variant = "default",
      size = "md",
      spacing = 2,
      children,
      ...props
    },
    ref,
  ) {
    const orientation = props.orientation ?? "horizontal";
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group"
        className={cn(
          "group/toggle-group flex w-fit items-center",
          spacingGapMap[spacing] ?? `gap-${spacing}`,
          orientation === "vertical" && "flex-col",
          className,
        )}
        {...props}
      >
        <ToggleGroupCtx.Provider value={{ variant, size, spacing }}>
          {children}
        </ToggleGroupCtx.Provider>
      </ToggleGroupPrimitive.Root>
    );
  },
);

export type ToggleGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
  "asChild"
> &
  Pick<ToggleProps, "variant" | "size"> & {
    asChild?: boolean;
  };

/**
 * ToggleGroupItem — a single toggle within a `ToggleGroup`.
 *
 * Inherits `variant`, `size`, and `spacing` from the parent group via context.
 * Override `variant` and `size` individually if needed.
 */
export const ToggleGroupItem = forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(function ToggleGroupItem(
  { className, variant, size, asChild, children, ...props },
  ref,
) {
  const ctx = useContext(ToggleGroupCtx);
  const effectiveVariant = ctx.variant || variant;
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={effectiveVariant}
      asChild={asChild}
      className={cn(
        toggleVariants({
          variant: effectiveVariant,
          size: ctx.size || size,
        }),
        "focus-visible:z-10",
        // When spacing is 0, join items together with shared borders
        ctx.spacing === 0 &&
          "rounded-sm border-0 first:rounded-s-md last:rounded-e-md data-[variant=outline]:border data-[variant=outline]:[border-inline-start-width:0] data-[variant=outline]:first:[border-inline-start-width:1px]",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
