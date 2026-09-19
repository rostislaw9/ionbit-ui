import { useState } from "react";

import { Trace } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Phase = "idle" | "syncing" | "online";

export function TraceStateDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  const run = () => {
    setPhase("syncing");
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setPhase("online");
          return 100;
        }
        return p + 4;
      });
    }, 120);
  };

  const syncing = phase === "syncing";
  const dotClass =
    phase === "online"
      ? "bg-success"
      : syncing
        ? "bg-accent animate-pulse"
        : "bg-foreground-muted/40";

  return (
    <div className="w-full max-w-sm space-y-4">
      <Button size="sm" onClick={run} disabled={syncing}>
        {syncing
          ? "Syncing…"
          : phase === "online"
            ? "Re-sync node"
            : "Start sync"}
      </Button>
      <Trace as="div" active={syncing}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${dotClass}`} />
              Node uplink
            </CardTitle>
            <CardDescription>
              {syncing
                ? `replicating blocks… ${Math.round(progress)}%`
                : phase === "online"
                  ? "all replicas verified"
                  : "standby — link dormant"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={phase === "idle" ? 0 : progress} />
          </CardContent>
        </Card>
      </Trace>
    </div>
  );
}
