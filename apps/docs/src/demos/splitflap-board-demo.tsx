import { useCallback, useEffect, useRef, useState } from "react";

import { SplitFlap } from "@/components/motion";

const STATUSES = ["ON TIME", "BOARDING", "DELAYED", "DEPARTED"];

const ROWS = [
  { flight: "IB 3113", dest: "AMS", offset: 0 },
  { flight: "KL 1672", dest: "BCN", offset: 1 },
  { flight: "LH 1024", dest: "FRA", offset: 2 },
];

/**
 * One board row. A real board updates flights independently — each
 * row waits a random beat after its own pass lands, then flips to a
 * random new status, so the board never marches in lockstep.
 */
function BoardRow({
  flight,
  dest,
  offset,
}: {
  flight: string;
  dest: string;
  offset: number;
}) {
  const [index, setIndex] = useState(offset);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    timerRef.current = setTimeout(
      () =>
        setIndex(
          (i) =>
            (i + 1 + Math.floor(Math.random() * (STATUSES.length - 1))) %
            STATUSES.length,
        ),
      1500 + Math.random() * 6000,
    );
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2">
      <span className="text-foreground">
        {flight} <span className="text-foreground-subtle">→ {dest}</span>
      </span>
      <SplitFlap
        trigger="mount"
        interval={90}
        cards
        onComplete={handleComplete}
        className="min-w-[8ch] text-end text-accent tabular-nums"
      >
        {STATUSES[index]}
      </SplitFlap>
    </div>
  );
}

export function SplitFlapBoardDemo() {
  return (
    <div className="w-xs divide-y divide-border rounded-md border border-border font-mono text-sm">
      {ROWS.map((row) => (
        <BoardRow key={row.flight} {...row} />
      ))}
    </div>
  );
}
