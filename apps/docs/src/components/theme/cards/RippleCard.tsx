import { Ripple } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Ripple — press sends a wave across the surface. */
export function RippleCard({ intensity }: { intensity: number }) {
  return (
    <Ripple intensity={intensity}>
      <PreviewCard
        label="Ripple"
        title="Press anywhere on the card"
        badge={<Badge variant="accent">{(intensity * 100).toFixed(0)}%</Badge>}
        description="A wave radiates outward from the contact point — works on any surface, not just buttons."
      />
    </Ripple>
  );
}
