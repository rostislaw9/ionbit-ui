import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ProgressProps extends Omit<
  ProgressPrimitive.Root.Props,
  "value"
> {
  /** 0..100 — the progress value. */
  value?: number;
}

/**
 * Progress — displays an indicator showing the completion progress of a
 * task, typically displayed as a progress bar.
 *
 * Built on `@base-ui/react`, shadcn-inspired.
 * Shows completion from 0 to 100 via the `value` prop (clamped to [0, 100]).
 * The indicator fills horizontally; the transition uses the standard
 * duration/easing tokens.
 *
 * Accessibility: Base UI sets `role="progressbar"` and `aria-valuenow` /
 * `aria-valuemin` / `aria-valuemax`. Use `ProgressLabel` to provide an
 * accessible name, or an `aria-label` describing what is progressing.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress({ className, value = 0, children, ...props }, ref) {
    const pct = Math.min(100, Math.max(0, value));
    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={pct}
        className={cn("flex w-full flex-col gap-2", className)}
        {...props}
      >
        {children}
        <ProgressPrimitive.Track className="h-2 w-full overflow-hidden rounded-full border border-border bg-surface">
          <ProgressPrimitive.Indicator className="h-full rounded-full bg-accent transition-[width] duration-[var(--duration-normal)] ease-[var(--ease-standard)]" />
        </ProgressPrimitive.Track>
      </ProgressPrimitive.Root>
    );
  },
);

export type ProgressLabelProps = ProgressPrimitive.Label.Props;

/**
 * ProgressLabel — an accessible label for the progress bar.
 *
 * Renders a `<span>` element. Place inside `Progress` to label it.
 */
export const ProgressLabel = forwardRef<HTMLSpanElement, ProgressLabelProps>(
  function ProgressLabel({ className, ...props }, ref) {
    return (
      <ProgressPrimitive.Label
        ref={ref}
        className={cn("text-sm font-medium text-foreground", className)}
        {...props}
      />
    );
  },
);

export type ProgressValueProps = ProgressPrimitive.Value.Props;

/**
 * ProgressValue — a text element displaying the current progress value.
 *
 * Renders a `<span>` element. Place inside `Progress` to show the
 * formatted percentage. Accepts a render function for custom formatting.
 */
export const ProgressValue = forwardRef<HTMLSpanElement, ProgressValueProps>(
  function ProgressValue({ className, ...props }, ref) {
    return (
      <ProgressPrimitive.Value
        ref={ref}
        className={cn("text-sm text-foreground-muted tabular-nums", className)}
        {...props}
      />
    );
  },
);
