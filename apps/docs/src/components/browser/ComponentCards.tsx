import type { ManifestEntry } from "../../registry/manifest";

import { Link } from "react-router-dom";

import { Reveal } from "@ionbit-ui/motion";

import { ComponentInfo } from "./ComponentInfo";

/** Grid of detailed component cards. */
export function ComponentCards({
  items,
  hideNewBadges,
}: {
  items: ManifestEntry[];
  hideNewBadges?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((comp, i) => (
        <Reveal key={comp.name} direction="up" delay={(i % 3) * 60}>
          <Link
            to={`/docs/components/${comp.name}`}
            className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:bg-surface-hover"
          >
            <ComponentInfo comp={comp} hideNewBadges={hideNewBadges} />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
