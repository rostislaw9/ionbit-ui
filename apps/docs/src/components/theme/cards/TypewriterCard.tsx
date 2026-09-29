import { Typewriter } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Typewriter — hover replays the typing like terminal output. */
export function TypewriterCard({ speed }: { speed: number }) {
  return (
    <Typewriter as="div" interval={Math.round(30 / speed)} trigger="hover">
      <PreviewCard
        label="Typewriter"
        title="Hover to type"
        badge={
          <Badge variant="accent" data-motion-skip>
            {(speed * 100).toFixed(0)}%
          </Badge>
        }
        description="Every text node types character by character — the caret keeps blinking once it settles."
      >
        <p className="mt-3 font-mono text-xs text-foreground-muted">
          &gt; tail -f /var/log/deploy.log
        </p>
      </PreviewCard>
    </Typewriter>
  );
}
