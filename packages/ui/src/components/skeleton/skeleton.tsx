import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton — a loading placeholder with a subtle pulse animation.
 *
 * Built on native HTML, shadcn-inspired. The fill is the theme's
 * foreground at low alpha — a recessed gray that stays visible on any
 * surface in both modes and in every generated theme, without a
 * dedicated token. Consumers control sizing via `className`
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
        className={cn("animate-pulse rounded-md bg-foreground/10", className)}
        {...props}
      />
    );
  },
);
