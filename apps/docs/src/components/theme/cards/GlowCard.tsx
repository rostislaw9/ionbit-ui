import { Glow } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Glow — accent halo builds while the cursor is near. */
export function GlowCard({ intensity }: { intensity: number }) {
  return (
    <Glow intensity={intensity}>
      <PreviewCard
        label="Glow"
        title="Hover to energize"
        badge={<Badge variant="accent">{(intensity * 100).toFixed(0)}%</Badge>}
        description="An accent halo charges the border while the cursor rests on the surface."
      />
    </Glow>
  );
}
