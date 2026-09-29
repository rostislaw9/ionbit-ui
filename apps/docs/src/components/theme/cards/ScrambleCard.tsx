import { Scramble } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Scramble — hover decodes every text node in the card. */
export function ScrambleCard({ speed }: { speed: number }) {
  return (
    <Scramble
      as="div"
      duration={Math.round(800 / speed)}
      intensity={1}
      trigger="hover"
    >
      <PreviewCard
        label="Scramble"
        title="Hover to decrypt"
        badge={
          <Badge variant="accent" data-motion-skip>
            {(speed * 100).toFixed(0)}%
          </Badge>
        }
        description="Every text node cycles cipher glyphs, then settles left to right."
      >
        <p className="mt-3 font-mono text-xs text-foreground-muted">
          &gt; channel: SECURE // keys rotated
        </p>
      </PreviewCard>
    </Scramble>
  );
}
