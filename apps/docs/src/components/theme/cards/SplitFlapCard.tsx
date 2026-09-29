import { useEffect, useState } from "react";

import { SplitFlap } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { PreviewCard } from "./PreviewCard";

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Live clock — one SplitFlap per digit so unchanged digits are
 *  literally untouched DOM (no jiggle), like the clock demo. */
function PreviewClock({ interval }: { interval: number }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(
    now.getSeconds(),
  )}`;
  return (
    <p className="mt-3 font-mono text-2xl text-foreground tabular-nums">
      {Array.from(time).map((ch, i) =>
        ch === ":" ? (
          <span key={i}>:</span>
        ) : (
          <SplitFlap
            key={i}
            trigger="mount"
            charset="0123456789"
            interval={interval}
          >
            {ch}
          </SplitFlap>
        ),
      )}
    </p>
  );
}

/** SplitFlap — a live clock; only the changed digit flips. */
export function SplitFlapCard({ speed }: { speed: number }) {
  return (
    <PreviewCard
      label="SplitFlap"
      title="Local time"
      badge={<Badge variant="accent">{(speed * 100).toFixed(0)}%</Badge>}
      description="Only the digit that changed flips forward through its drum — every other module is untouched DOM."
    >
      <PreviewClock interval={Math.round(280 / speed)} />
    </PreviewCard>
  );
}
