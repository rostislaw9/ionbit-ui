import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef, useMemo } from "react";

import { cn } from "@/lib/utils";

export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root>;

/**
 * Slider — a range input with one or more thumbs.
 *
 * Built on `@radix-ui/react-slider`, shadcn-inspired. Supports single and
 * multi-thumb (range) values. Pass an array `value` (or `defaultValue`)
 * to render multiple thumbs. The track, range, and thumbs use accent
 * tokens; thumbs show a focus/active glow shadow.
 *
 * Accessibility: Radix sets `role="slider"` on each thumb, manages
 * `aria-valuenow` / `aria-valuemin` / `aria-valuemax`, arrow-key
 * adjustment, and focus. Label the slider via `aria-label` or a sibling
 * `<Label htmlFor>`.
 */
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(function Slider(
  { className, defaultValue, value, min = 0, max = 100, ...props },
  ref,
) {
  const values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full cursor-grab touch-none items-center select-none active:cursor-grabbing data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full border border-border bg-surface-elevated data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute bg-accent data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            "relative block size-4 shrink-0 rounded-full border-2 border-background bg-accent shadow-sm transition-shadow duration-[var(--duration-fast)] ease-[var(--ease-standard)] after:absolute after:-inset-2 hover:shadow-[var(--shadow-focus)] focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none active:shadow-[var(--shadow-focus)] disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
