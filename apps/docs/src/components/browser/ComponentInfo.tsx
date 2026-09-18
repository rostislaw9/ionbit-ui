import type { ManifestEntry } from "../../registry/manifest";

import { ArrowRight } from "lucide-react";

import { NewDot } from "./NewDot";

/**
 * Shared component details — label, category, description, and example
 * count. Rendered inside component cards on the components page and inside
 * HoverCardContent in links view.
 */
export function ComponentInfo({
  comp,
  hideNewBadges,
}: {
  comp: ManifestEntry;
  hideNewBadges?: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-[var(--duration-fast)] group-hover:text-accent">
          {comp.label}
          {comp.isNew && !hideNewBadges && <NewDot />}
        </h3>
        <span className="font-mono text-[10px] tracking-wider text-foreground-subtle uppercase">
          {comp.category}
        </span>
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-foreground-muted">
        {comp.description}
      </p>
      <span className="mt-auto flex items-center gap-1 text-xs text-foreground-subtle">
        {comp.exampleCount} example
        {comp.exampleCount > 1 ? "s" : ""}
        <ArrowRight className="size-3" />
      </span>
    </>
  );
}
