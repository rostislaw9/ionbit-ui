import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type EmptyProps = HTMLAttributes<HTMLDivElement>;

/**
 * Empty — a placeholder for empty states.
 *
 * Shadcn-inspired. Renders a centered container for empty-state content.
 * Use `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, and
 * `EmptyContent` subcomponents to build a structured empty state.
 *
 * Accessibility: the container has no implicit role. Add `role="status"`
 * or `aria-live="polite"` if the empty state appears after an async
 * operation. Ensure `EmptyTitle` uses an appropriate heading level.
 */
export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
        className,
      )}
      {...props}
    />
  );
});

export type EmptyHeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * EmptyHeader — the top section of an empty state, containing media,
 * title, and description.
 */
export const EmptyHeader = forwardRef<HTMLDivElement, EmptyHeaderProps>(
  function EmptyHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-header"
        className={cn("flex max-w-sm flex-col items-center gap-2", className)}
        {...props}
      />
    );
  },
);

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-foreground-muted [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface EmptyMediaProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyMediaVariants> {}

/**
 * EmptyMedia — an icon or media container within an empty state.
 *
 * Use `variant="icon"` for a rounded icon container, or
 * `variant="default"` (default) for an unstyled media slot (e.g. avatars).
 */
export const EmptyMedia = forwardRef<HTMLDivElement, EmptyMediaProps>(
  function EmptyMedia({ className, variant = "default", ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-media"
        data-variant={variant}
        className={cn(emptyMediaVariants({ variant, className }))}
        {...props}
      />
    );
  },
);

export type EmptyTitleProps = HTMLAttributes<HTMLHeadingElement>;

/**
 * EmptyTitle — the heading of an empty state.
 *
 * Renders as an `<h3>` by default. Use a semantic heading level
 * appropriate for the page outline.
 */
export const EmptyTitle = forwardRef<HTMLHeadingElement, EmptyTitleProps>(
  function EmptyTitle({ className, children, ...props }, ref) {
    return (
      <h3
        ref={ref}
        data-slot="empty-title"
        className={cn(
          "text-sm font-medium tracking-tight text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

export type EmptyDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/**
 * EmptyDescription — supporting text below the empty state title.
 */
export const EmptyDescription = forwardRef<
  HTMLParagraphElement,
  EmptyDescriptionProps
>(function EmptyDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="empty-description"
      className={cn(
        "text-sm text-foreground-muted [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-accent",
        className,
      )}
      {...props}
    />
  );
});

export type EmptyContentProps = HTMLAttributes<HTMLDivElement>;

/**
 * EmptyContent — the action area of an empty state, typically
 * containing a `Button` or link.
 */
export const EmptyContent = forwardRef<HTMLDivElement, EmptyContentProps>(
  function EmptyContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-content"
        className={cn(
          "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
          className,
        )}
        {...props}
      />
    );
  },
);

export type EmptyFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * EmptyFooter — optional footer section for secondary actions or links.
 *
 * Ionbit-specific addition not present in shadcn.
 */
export const EmptyFooter = forwardRef<HTMLDivElement, EmptyFooterProps>(
  function EmptyFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-footer"
        className={cn("flex items-center gap-2", className)}
        {...props}
      />
    );
  },
);
