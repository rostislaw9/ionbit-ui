import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface SeparatorProps extends SeparatorPrimitive.Props {
  /**
   * Kept for API compatibility. Base UI always renders
   * `role="separator"` with `aria-orientation`.
   */
  decorative?: boolean;
}

/**
 * Separator — a visual divider between content sections.
 *
 * Built on `@base-ui/react`, shadcn-inspired. Renders a
 * 1px-wide line that spans the full width (horizontal) or height
 * (vertical) of its container.
 *
 * Accessibility: Base UI sets `role="separator"` with
 * `aria-orientation` based on the `orientation` prop.
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    {
      className,
      orientation = "horizontal",
      decorative: _decorative = true,
      ...props
    },
    ref,
  ) {
    return (
      <SeparatorPrimitive
        ref={ref}
        orientation={orientation}
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
