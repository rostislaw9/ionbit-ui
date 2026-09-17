import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PaginationProps = ComponentProps<"nav">;

/**
 * Pagination — navigation for paged content.
 *
 * Built on native HTML, shadcn-inspired.
 * Composes `PaginationContent` (a `<ul>`), `PaginationItem`, `PaginationLink`,
 * `PaginationPrevious`, `PaginationNext`, and `PaginationEllipsis`. Links
 * render a `Button` via its `render` prop, so they inherit button sizing and
 * variants. The active page uses `aria-current="page"`.
 *
 * Accessibility: the `<nav>` has `aria-label="pagination"`. Provide
 * descriptive `aria-label`s on previous/next (defaults: "Go to previous
 * page" / "Go to next page"). The ellipsis is `aria-hidden` with an
 * `sr-only` "More pages" label.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    );
  },
);

export type PaginationContentProps = ComponentProps<"ul">;

/**
 * PaginationContent — the list container for pagination items.
 *
 * Renders as a `<ul>` with horizontal flex layout and tight spacing
 * between items. Place `PaginationItem` children inside it.
 */
export const PaginationContent = forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(function PaginationContent({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
});

export type PaginationItemProps = ComponentProps<"li">;

/**
 * PaginationItem — a single list item wrapper for pagination links.
 *
 * Renders as a `<li>`. Wrap a `PaginationLink`, `PaginationPrevious`,
 * `PaginationNext`, or `PaginationEllipsis` inside it.
 */
export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  function PaginationItem({ ...props }, ref) {
    return <li ref={ref} data-slot="pagination-item" {...props} />;
  },
);

export type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ComponentProps<typeof Button>, "size"> &
  ComponentProps<"a">;

/**
 * PaginationLink — a clickable page link rendered as a styled button.
 *
 * Uses `Button`'s `render` prop to wrap an `<a>` element, inheriting button
 * sizing and variant styles. When `isActive` is true, the link uses the
 * `secondary` variant and sets `aria-current="page"`. Supports `size`
 * prop (defaults to `"icon"`).
 */
export const PaginationLink = forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(function PaginationLink(
  { className, isActive, size = "icon", children, ...props },
  ref,
) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        >
          {children}
        </a>
      }
    />
  );
});

export type PaginationPreviousProps = ComponentProps<typeof PaginationLink> & {
  text?: string;
};

/**
 * PaginationPrevious — a "go to previous page" navigation link.
 *
 * Renders a `PaginationLink` with a left chevron icon and optional text
 * label (default "Previous", hidden on small screens). Includes
 * `aria-label="Go to previous page"` for screen readers.
 */
export const PaginationPrevious = forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(function PaginationPrevious({ className, text = "Previous", ...props }, ref) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size="md"
      className={cn("ps-1.5", className)}
      {...props}
    >
      <ChevronLeft data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
});

export type PaginationNextProps = ComponentProps<typeof PaginationLink> & {
  text?: string;
};

/**
 * PaginationNext — a "go to next page" navigation link.
 *
 * Renders a `PaginationLink` with optional text label (default "Next",
 * hidden on small screens) and a right chevron icon. Includes
 * `aria-label="Go to next page"` for screen readers.
 */
export const PaginationNext = forwardRef<
  HTMLAnchorElement,
  PaginationNextProps
>(function PaginationNext({ className, text = "Next", ...props }, ref) {
  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size="md"
      className={cn("pe-1.5", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRight data-icon="inline-end" />
    </PaginationLink>
  );
});

export type PaginationEllipsisProps = ComponentProps<"span">;

/**
 * PaginationEllipsis — a non-interactive "…" indicator for skipped pages.
 *
 * Renders a `MoreHorizontal` icon inside a `<span>` that is `aria-hidden`
 * for assistive technology, with an `sr-only` "More pages" label for
 * screen reader users.
 */
export const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(function PaginationEllipsis({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4 text-foreground-subtle" />
      <span className="sr-only">More pages</span>
    </span>
  );
});
