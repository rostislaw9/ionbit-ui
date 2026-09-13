import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type TableProps = React.ComponentProps<"table">;

/**
 * Table — a responsive container that wraps a native `<table>` with
 * horizontal scrolling on overflow.
 *
 * The container div has `overflow-x-auto` so wide
 * tables scroll horizontally without breaking the page layout.
 *
 * Accessibility: the native `<table>` element is used, so screen readers
 * announce it as a table. Use `<caption>` (via `TableCaption`) or an
 * `aria-label` to provide a descriptive name.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, ...props },
  ref,
) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
});

export type TableHeaderProps = React.ComponentProps<"thead">;

/**
 * TableHeader — wraps a native `<thead>`. Adds a bottom border to its
 * rows.
 */
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(function TableHeader({ className, ...props }, ref) {
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  );
});

export type TableBodyProps = React.ComponentProps<"tbody">;

/**
 * TableBody — wraps a native `<tbody>`. Removes the bottom border from
 * the last row.
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, ...props }, ref) {
    return (
      <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
      />
    );
  },
);

export type TableFooterProps = React.ComponentProps<"tfoot">;

/**
 * TableFooter — wraps a native `<tfoot>`. Adds a top border and a
 * subtle surface background.
 */
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-surface-hover font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
});

export type TableRowProps = React.ComponentProps<"tr">;

/**
 * TableRow — wraps a native `<tr>`. Adds a bottom border and a hover
 * background.
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b transition-colors hover:bg-surface-hover data-[state=selected]:bg-surface-hover",
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableHeadProps = React.ComponentProps<"th">;

/**
 * TableHead — wraps a native `<th>`. Uses `font-medium`, `whitespace-
 * nowrap`, and left alignment by default.
 */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead({ className, ...props }, ref) {
    return (
      <th
        ref={ref}
        className={cn(
          "h-10 px-2 text-start align-middle font-medium whitespace-nowrap text-foreground-muted [&:has([role=checkbox])]:pe-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableCellProps = React.ComponentProps<"td">;

/**
 * TableCell — wraps a native `<td>`. Uses `whitespace-nowrap` and
 * middle alignment by default.
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ className, ...props }, ref) {
    return (
      <td
        ref={ref}
        className={cn(
          "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export type TableCaptionProps = React.ComponentProps<"caption">;

/**
 * TableCaption — wraps a native `<caption>`. Placed at the bottom of
 * the table with muted foreground.
 */
export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-foreground-muted", className)}
      {...props}
    />
  );
});
