import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton — a loading placeholder with a subtle pulse animation.
 *
 * Built on native HTML, shadcn-inspired. Uses semantic surface tokens so
 * it adapts to the active theme. Consumers control sizing via `className`
 * (e.g. `h-4 w-full`); the component itself only provides shape, color,
 * and animation defaults.
 *
 * Accessibility: the element has no semantic role by default. Add
 * `aria-label` or `aria-hidden` as appropriate for the loading context.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse rounded-md bg-surface-elevated",
          className,
        )}
        {...props}
      />
    );
  },
);
