import { Tilt } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Tilt — the whole card surface tilts toward the cursor. */
export function TiltCard({
  intensity,
  reflectionIntensity,
}: {
  intensity: number;
  reflectionIntensity: number;
}) {
  return (
    <Tilt
      reflection
      reflectionIntensity={reflectionIntensity}
      intensity={intensity}
    >
      <PreviewCard
        label="Tilt"
        title="Move across the card"
        badge={<Badge variant="accent">{(intensity * 100).toFixed(0)}%</Badge>}
        description="The surface tilts toward your cursor and springs back when you leave."
      />
    </Tilt>
  );
}
