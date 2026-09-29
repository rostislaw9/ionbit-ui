import { Marquee } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

/** Marquee — a status ticker; hovering the card pauses the loop via
 *  the pause-scope attribute. */
export function MarqueeCard({ speed }: { speed: number }) {
  return (
    <PreviewCard
      label="Marquee"
      title="Hover to pause"
      badge={<Badge variant="accent">{(speed * 100).toFixed(0)}%</Badge>}
      description="The ticker loops seamlessly — hover anywhere on the card and the scroll pauses so items stay readable."
      className="overflow-hidden"
      data-marquee-pause-scope=""
      after={
        <Marquee
          duration={Math.round(24 / speed)}
          gap={16}
          className="px-6 pb-6"
        >
          {["build ok", "docs live", "v0.2.3", "ci passing"].map((t) => (
            <span
              key={t}
              className="font-mono text-xs whitespace-nowrap text-foreground-muted"
            >
              {t}
            </span>
          ))}
        </Marquee>
      }
    />
  );
}
