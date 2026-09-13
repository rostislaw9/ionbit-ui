import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type SeparatorProps = React.ComponentProps<
  typeof SeparatorPrimitive.Root
>;

/**
 * Separator — a visual divider between content sections.
 *
 * Built on `@radix-ui/react-separator`, shadcn-inspired. Renders a
 * 1px-wide line that spans the full width (horizontal) or height
 * (vertical) of its container. The `decorative` prop (default `true`)
 * marks it as presentational so it is excluded from the accessibility
 * tree.
 *
 * Accessibility: Radix sets `role="separator"` with `aria-orientation`
 * based on the `orientation` prop. When the separator separates content
 * sections, it should not be focusable (default).
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        orientation={orientation}
        decorative={decorative}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
          className,
        )}
        {...props}
      />
    );
  },
);
