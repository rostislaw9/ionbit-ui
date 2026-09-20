import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { createContext, useContext, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { toggleVariants, type ToggleProps } from "../toggle/toggle";

type ToggleGroupVariant = NonNullable<ToggleProps["variant"]>;
type ToggleGroupSize = NonNullable<ToggleProps["size"]>;

interface ToggleGroupContextValue {
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
  spacing: ToggleGroupSpacing;
}

const ToggleGroupCtx = createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "md",
  spacing: 2,
});

interface ToggleGroupBaseProps {
  children: ReactNode;
  className?: string;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  spacing?: ToggleGroupSpacing;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  "aria-label"?: string;
}

interface ToggleGroupSingleProps extends ToggleGroupBaseProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface ToggleGroupMultipleProps extends ToggleGroupBaseProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupProps =
  ToggleGroupSingleProps | ToggleGroupMultipleProps;

// Keys must be literal so Tailwind generates each gap class — the union
// type makes unsupported values a compile error instead of a silent
// missing gap (a dynamic `gap-${spacing}` class can never be scanned).
const spacingGapMap = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
} as const;

type ToggleGroupSpacing = keyof typeof spacingGapMap;

/**
 * ToggleGroup — a group of toggles with single or multiple selection.
 *
 * Built on `@base-ui/react/toggle-group`, shadcn-inspired. Set `type` to
 * `"single"` for radio-like behavior or `"multiple"` for independent toggles.
 * Pass `variant`, `size`, and `spacing` on the group to propagate them to all
 * items.
 *
 * Accessibility: Base UI sets `role="group"` on the root and `aria-pressed`
 * on each item. Keyboard navigation is handled by Base UI. Use `aria-label`
 * to label the group.
 */
export function ToggleGroup({
  className,
  variant = "default",
  size = "md",
  spacing = 2,
  orientation = "horizontal",
  disabled,
  children,
  type,
  value,
  defaultValue,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  const isMultiple = type === "multiple";

  const handleValueChange = (groupValue: string[]) => {
    if (type === "single") {
      onValueChange?.(groupValue[0] ?? "");
    } else {
      onValueChange?.(groupValue);
    }
  };

  const controlledValue = value ? (isMultiple ? value : [value]) : undefined;

  const defaultArrayValue = defaultValue
    ? isMultiple
      ? defaultValue
      : [defaultValue]
    : undefined;

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn(
        "group/toggle-group flex w-fit items-center",
        spacingGapMap[spacing],
        orientation === "vertical" && "flex-col",
        // When spacing is 0, join items into a combined element
        spacing === 0 &&
          orientation === "horizontal" && [
            "[&>[data-slot=toggle-group-item]:not(:first-child)]:rounded-s-none",
            "[&>[data-slot=toggle-group-item]:not(:first-child)]:data-[variant=outline]:border-s-0",
            "[&>[data-slot=toggle-group-item]:not(:last-child)]:rounded-e-none",
          ],
        spacing === 0 &&
          orientation === "vertical" && [
            "[&>[data-slot=toggle-group-item]:not(:first-child)]:rounded-t-none",
            "[&>[data-slot=toggle-group-item]:not(:first-child)]:data-[variant=outline]:border-t-0",
            "[&>[data-slot=toggle-group-item]:not(:last-child)]:rounded-b-none",
          ],
        className,
      )}
      multiple={isMultiple}
      orientation={orientation}
      disabled={disabled}
      value={controlledValue as readonly string[] | undefined}
      defaultValue={defaultArrayValue as readonly string[] | undefined}
      onValueChange={handleValueChange}
      {...props}
    >
      <ToggleGroupCtx.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupCtx.Provider>
    </ToggleGroupPrimitive>
  );
}

export interface ToggleGroupItemProps
  extends TogglePrimitive.Props, Pick<ToggleProps, "variant" | "size"> {}

/**
 * ToggleGroupItem — a single toggle within a `ToggleGroup`.
 *
 * Inherits `variant`, `size`, and `spacing` from the parent group via context.
 * Override `variant` and `size` individually if needed.
 */
export function ToggleGroupItem({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroupItemProps) {
  const ctx = useContext(ToggleGroupCtx);
  const effectiveVariant = variant ?? ctx.variant;
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={effectiveVariant}
      className={cn(
        toggleVariants({
          variant: effectiveVariant,
          size: size ?? ctx.size,
        }),
        "focus-visible:z-10",
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}
