import { cva, type VariantProps } from "class-variance-authority";
import { useMemo } from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * FieldSet — a semantic `<fieldset>` that groups related fields.
 *
 * Use with `FieldLegend` for a visible group heading and `FieldGroup`
 * for the field list. Sets `role="group"` for screen readers.
 */
export function FieldSet({
  className,
  ...props
}: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}

/**
 * FieldLegend — the `<legend>` for a `FieldSet`.
 *
 * Use `variant="label"` when the legend should look like a regular label
 * (e.g. nested fieldsets).
 */
export function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className,
      )}
      {...props}
    />
  );
}

/**
 * FieldGroup — a flex column that stacks `Field` components.
 *
 * Provides consistent spacing between fields. Add `FieldSeparator`
 * to divide sections within the group. The `@container/field-group`
 * enables container-query-based responsive orientations on child
 * `Field` components with `orientation="responsive"`.
 */
export function FieldGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-error",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

/**
 * Field — the core wrapper for a single field.
 *
 * Groups a label, control, description, and error into one unit.
 * Set `orientation="horizontal"` for side-by-side layouts or
 * `orientation="responsive"` to switch at the `@md/field-group`
 * container breakpoint.
 * Add `data-invalid` to mark the field as invalid (styles all children).
 *
 * Accessibility: `role="group"` is set automatically. Add `data-invalid`
 * to switch the entire block to the error state.
 */
export function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

/**
 * FieldContent — a flex column that groups label and description.
 *
 * Use when a `Field` has both a label and helper text. Not needed
 * for fields without a description.
 */
export function FieldContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className,
      )}
      {...props}
    />
  );
}

/**
 * FieldLabel — the label for a field.
 *
 * Extends our `Label` with field-aware styling: dims when the field is
 * disabled, picks up the accent color when the nested control is
 * checked (via `data-checked`), and supports wrapping a `Field` child
 * for selectable card layouts.
 */
export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 group-data-[invalid=true]/field:text-error has-data-checked:border-accent/30 has-data-checked:bg-accent/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-surface-hover has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 *:data-[slot=field]:p-2.5",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

/**
 * FieldTitle — a title inside `FieldContent`.
 *
 * Renders label-styled text for the field name without a `<label>`
 * element. Useful when the control is not a native input.
 */
export function FieldTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * FieldDescription — helper text for a field.
 *
 * Muted foreground text that balances long lines in horizontal layouts.
 */
export function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-foreground-muted group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-accent",
        className,
      )}
      {...props}
    />
  );
}

/**
 * FieldSeparator — a visual divider between field sections.
 *
 * Accepts optional inline content (e.g. "Or continue with").
 */
export function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-foreground-muted"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

/**
 * FieldError — an accessible error message for a field.
 *
 * Accepts children or an `errors` array. When `errors` has a single
 * message, renders it as text. Multiple messages render as a list.
 * Works with any validator that returns `{ message?: string }` objects
 * (react-hook-form, Standard Schema, etc.).
 */
export function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-error", className)}
      {...props}
    >
      {content}
    </div>
  );
}
