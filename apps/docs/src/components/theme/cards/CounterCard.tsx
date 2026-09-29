import { Counter } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Counter — the stat rolls up when the card enters view. */
export function CounterCard({ speed }: { speed: number }) {
  return (
    <PreviewCard
      label="Counter"
      title="Hover the stat to count"
      badge={<Badge variant="accent">{(speed * 100).toFixed(0)}%</Badge>}
      description="Values roll from zero up to their target — hover the number itself to run it again."
    >
      <p className="mt-3 font-mono text-2xl text-foreground tabular-nums">
        <Counter
          value={48210}
          duration={Math.round(1200 / speed)}
          trigger="hover"
        />
        <span className="ml-2 text-xs text-foreground-muted">installs</span>
      </p>
    </PreviewCard>
  );
}
