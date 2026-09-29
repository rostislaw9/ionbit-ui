import { useEffect, useState } from "react";

import { SplitFlap } from "@/components/motion";

const pad = (n: number) => String(n).padStart(2, "0");

export function SplitFlapClockDemo() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-mono text-4xl tracking-[0.15em] text-accent tabular-nums">
        {Array.from(time).map((ch, i) =>
          ch === ":" ? (
            <span key={i}>:</span>
          ) : (
            <SplitFlap
              key={i}
              trigger="mount"
              charset="0123456789"
              interval={280}
            >
              {ch}
            </SplitFlap>
          ),
        )}
      </div>
      <p className="font-mono text-xs text-foreground-muted">
        local time — only the changed digits flip each second
      </p>
    </div>
  );
}
