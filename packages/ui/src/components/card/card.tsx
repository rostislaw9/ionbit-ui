import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Elevate the surface (stronger border + shadow). @default false */
  elevated?: boolean;
  /** Make the card interactive (hover surface + cursor). @default false */
  interactive?: boolean;
}

/**
 * Card — a surface container.
 *
 * Uses semantic tokens only. Pair with `<Spotlight>` from
 * `@ionbit-ui/motion` for a pointer-follow highlight, or `<Reveal>` for an
 * in-view entrance. The card itself stays presentational.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, elevated = false, interactive = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-surface text-foreground transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        elevated && "border-border-strong bg-surface-elevated shadow-md",
        interactive && "hover:border-border-strong hover:bg-surface-hover",
        className,
      )}
      {...props}
    />
  );
});

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
/**
 * CardHeader — the top section of a card, typically containing a title and
 * description.
 *
 * Renders a flex column with standard padding. Use it to group the card's
 * heading area above the main content.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5 p-5", className)}
        {...props}
      />
    );
  },
);

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
/**
 * CardTitle — the heading element of a card.
 *
 * Renders as an `<h3>` with semibold typography. Use inside `CardHeader` to
 * label the card's purpose.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ className, children, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn(
          "text-base leading-tight font-semibold tracking-tight text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
/**
 * CardDescription — a muted supporting description below the card title.
 *
 * Renders as a `<p>` with muted foreground text and relaxed leading. Use
 * inside `CardHeader` to provide secondary context.
 */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(function CardDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("text-sm leading-relaxed text-foreground-muted", className)}
      {...props}
    />
  );
});

export type CardContentProps = HTMLAttributes<HTMLDivElement>;
/**
 * CardContent — the main body area of a card.
 *
 * Renders a padded container (no top padding, since it follows the header).
 * Place the primary content of the card here.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />;
  },
);

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
/**
 * CardFooter — the bottom action area of a card.
 *
 * Renders a flex row aligned to the end, with padding but no top padding.
 * Use for buttons or secondary actions at the bottom of the card.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 p-5 pt-0", className)}
        {...props}
      />
    );
  },
);
