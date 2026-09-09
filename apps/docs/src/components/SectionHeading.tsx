import type { ElementType } from "react";

import { Link } from "react-router-dom";

import { cn } from "@ionbit-ui/ui";

interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Heading element to render. Defaults to "h2". */
  as?: ElementType;
}

/**
 * Section heading with an anchor link.
 *
 * Renders a heading (h2 by default) wrapped in a link button. A muted
 * "#" symbol appears to the right on hover. Clicking navigates to
 * `#<id>`, and the scroll-spy / scroll-to-anchor logic handles the
 * actual scrolling.
 */
export function SectionHeading({
  id,
  children,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        Tag === "h2"
          ? "text-xl font-semibold text-foreground md:text-lg"
          : "text-base font-semibold text-foreground",
        className,
      )}
    >
      <span className="group inline-flex items-center gap-1">
        <Link
          to={`#${id}`}
          className="inline-flex items-center gap-1 rounded-sm bg-transparent px-0 text-foreground underline-offset-4"
        >
          <span className="group-hover:underline">{children}</span>
          <span
            aria-hidden="true"
            className="text-foreground-subtle opacity-0 transition-opacity group-hover:opacity-100"
          >
            #
          </span>
        </Link>
      </span>
    </Tag>
  );
}
