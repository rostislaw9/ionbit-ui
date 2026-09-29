import { Spotlight } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Spotlight — large proximity so the glow leads the cursor. */
export function SpotlightCard({ intensity }: { intensity: number }) {
  return (
    <Spotlight intensity={intensity} proximity={220}>
      <PreviewCard
        label="Spotlight"
        title="Hover anywhere near"
        badge={<Badge variant="accent">{(intensity * 100).toFixed(0)}%</Badge>}
        description="The radial highlight follows your cursor up to 220px away from the card edges."
      />
    </Spotlight>
  );
}
