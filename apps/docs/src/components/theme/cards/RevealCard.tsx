import { useState } from "react";

import { Reveal } from "@ionbit-ui/motion";

import { PreviewCard } from "./PreviewCard";

/** Reveal — a couple of lines entering in sequence; remounting the
 *  Reveal wrappers on hover restarts the entrance. */
export function RevealCard() {
  const [replay, setReplay] = useState(0);
  return (
    <PreviewCard
      label="Reveal"
      title="Hover to replay"
      description="An in-view entrance — lines slide up and settle in sequence."
      onPointerEnter={() => setReplay((n) => n + 1)}
    >
      <div
        key={replay}
        className="mt-3 space-y-1 font-mono text-xs text-foreground-muted"
      >
        <Reveal>
          <p>&gt; resolving modules…</p>
        </Reveal>
        <Reveal delay={140}>
          <p>&gt; 12 modules ready</p>
        </Reveal>
        <Reveal delay={280}>
          <p className="text-accent">&gt; done in 214ms</p>
        </Reveal>
      </div>
    </PreviewCard>
  );
}
