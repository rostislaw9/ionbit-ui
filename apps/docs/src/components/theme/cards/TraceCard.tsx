import { Trace } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Trace — the border beam keeps the card in a busy state. */
export function TraceCard({
  intensity,
  speed,
}: {
  intensity: number;
  speed: number;
}) {
  return (
    <Trace as="div" double intensity={intensity} speed={speed}>
      <PreviewCard
        label="Trace"
        title="Beam on the border"
        badge={<Badge variant="accent">{(intensity * 100).toFixed(0)}%</Badge>}
        description="One accent point laps the perimeter — the card reads as busy while it runs."
      >
        <p className="mt-3 flex items-center gap-2 font-mono text-xs text-foreground-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          syncing node-07
        </p>
      </PreviewCard>
    </Trace>
  );
}
