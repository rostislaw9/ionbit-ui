import { Caret } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Caret — the standalone blinking block cursor. */
export function CaretCard({ speed }: { speed: number }) {
  return (
    <PreviewCard
      label="Caret"
      title="Blinking block"
      badge={<Badge variant="accent">{(speed * 100).toFixed(0)}%</Badge>}
      description="The terminal cursor Typewriter trails — standalone, for prompts and open channels."
    >
      <p className="mt-3 font-mono text-xs text-foreground-muted">
        &gt; channel open
        <Caret interval={Math.round(1100 / speed)} className="ml-1" />
      </p>
    </PreviewCard>
  );
}
