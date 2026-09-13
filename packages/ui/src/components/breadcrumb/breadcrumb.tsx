import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

export type BreadcrumbProps = HTMLAttributes<HTMLElement>;

/**
 * Breadcrumb — a navigation trail showing the user's location in a hierarchy.
 *
 * Accessibility: renders a `<nav>` with `aria-label="breadcrumb"`. The
 * `BreadcrumbList` uses an ordered list (`<ol>`) as recommended by WAI-ARIA.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn("text-sm", className)}
        {...props}
      />
    );
  },
);

export type BreadcrumbListProps = HTMLAttributes<HTMLOListElement>;

/**
 * BreadcrumbList — the ordered list container for breadcrumb items.
 *
 * Renders an `<ol>` with flex layout to lay out `BreadcrumbItem` children
 * horizontally with consistent spacing. Using an ordered list is the
 * WAI-ARIA recommended pattern for breadcrumb trails.
 */
export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, ...props }, ref) {
    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-foreground-muted",
          className,
        )}
        {...props}
      />
    );
  },
);

export type BreadcrumbItemProps = HTMLAttributes<HTMLLIElement>;

/**
 * BreadcrumbItem — a single step in the breadcrumb trail.
 *
 * Renders an `<li>` with inline-flex layout. Place a `BreadcrumbLink` or
 * `BreadcrumbPage` inside, optionally followed by a `BreadcrumbSeparator`.
 */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      />
    );
  },
);

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as the child element instead of an `<a>`. Useful with routers. */
  asChild?: boolean;
}

/**
 * BreadcrumbLink — a navigable link to a parent page in the trail.
 *
 * Renders an `<a>` by default. Use `asChild` to compose with a router Link
 * component (e.g. React Router, Next.js Link) for client-side navigation.
 * Includes hover and focus-visible styles for keyboard accessibility.
 */
export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(function BreadcrumbLink({ className, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cn(
        "rounded transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
});

export type BreadcrumbPageProps = HTMLAttributes<HTMLSpanElement>;

/**
 * BreadcrumbPage — the current page indicator (last item in the trail).
 *
 * Renders a `<span>` with `aria-current="page"` so assistive technologies
 * announce it as the current page. Styled with medium font weight to
 * visually distinguish it from navigable `BreadcrumbLink` items.
 */
export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-current="page"
        className={cn("font-medium text-foreground", className)}
        {...props}
      />
    );
  },
);

export type BreadcrumbSeparatorProps = HTMLAttributes<HTMLLIElement>;

/**
 * BreadcrumbSeparator — the visual divider between breadcrumb items.
 *
 * Renders a `<li>` with `role="presentation"` (decorative, ignored by screen
 * readers). Displays a `ChevronRight` icon by default; pass custom `children`
 * to use a different separator character or icon.
 */
export const BreadcrumbSeparator = forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator({ className, children, ...props }, ref) {
  return (
    <li
      ref={ref}
      role="presentation"
      className={cn("text-foreground-subtle", className)}
      {...props}
    >
      {children ?? <ChevronRight className="size-3.5" />}
    </li>
  );
});

export interface BreadcrumbEllipsisProps extends HTMLAttributes<HTMLSpanElement> {
  /** Optional label for the ellipsis, defaults to "More". */
  label?: string;
}

/**
 * BreadcrumbEllipsis — a collapsed-trail indicator showing hidden levels.
 *
 * Renders an ellipsis (`…`) with `role="presentation"` and an `aria-label`
 * (defaults to "More"). Use when the breadcrumb trail is too long to display
 * in full, typically as a clickable element that expands the hidden levels.
 */
export const BreadcrumbEllipsis = forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis({ className, label = "More", ...props }, ref) {
  return (
    <span
      ref={ref}
      role="presentation"
      aria-label={label}
      className={cn("flex size-4 items-center justify-center", className)}
      {...props}
    >
      &hellip;
    </span>
  );
});
