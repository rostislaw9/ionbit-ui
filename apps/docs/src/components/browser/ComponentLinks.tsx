import type { ManifestEntry } from "../../registry/manifest";

import { Link } from "react-router-dom";

import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ionbit-ui/ui";

import { ComponentInfo } from "./ComponentInfo";
import { NewDot } from "./NewDot";

/** Compact grid of link-variant buttons with a HoverCard for details. */
export function ComponentLinks({
  items,
  hideNewBadges,
}: {
  items: ManifestEntry[];
  hideNewBadges?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 justify-items-start gap-y-1 md:grid-cols-3 md:gap-x-32">
      {items.map((comp) => (
        <HoverCard key={comp.name} openDelay={150} closeDelay={150}>
          <HoverCardTrigger asChild>
            <Button
              variant="link"
              size="xl"
              nativeButton={false}
              className="text-foreground"
              render={<Link to={`/docs/components/${comp.name}`} />}
            >
              <span className="flex items-center gap-1.5">
                {comp.label}
                {comp.isNew && !hideNewBadges && <NewDot />}
              </span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side="top" align="start">
            <div className="flex flex-col gap-3">
              <ComponentInfo comp={comp} hideNewBadges={hideNewBadges} />
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
