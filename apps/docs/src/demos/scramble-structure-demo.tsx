import { useEffect, useState } from "react";

import { Scramble } from "@/components/motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const FIELDS = [
  { label: "SIGNAL", value: "NODE-07 // relay-2" },
  { label: "PAYLOAD", value: "handshake keys rotated" },
  { label: "STATUS", value: "ACCESS GRANTED" },
];

const mask = (text: string) => text.replace(/[^\s]/g, "░");

export function ScrambleStructureDemo() {
  const [stage, setStage] = useState<"idle" | "decrypting" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const decrypting = stage === "decrypting";
  const done = stage === "done";

  useEffect(() => {
    if (!decrypting) return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 5 + Math.random() * 14));
    }, 200);
    return () => clearInterval(timer);
  }, [decrypting]);

  useEffect(() => {
    if (decrypting && progress >= 100) setStage("done");
  }, [decrypting, progress]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Scramble trigger="focus">
        <Button
          variant="primary"
          className="w-full font-mono"
          disabled={decrypting}
          onClick={() => {
            setProgress(0);
            setStage(done ? "idle" : "decrypting");
          }}
        >
          {decrypting
            ? "DECRYPTING…"
            : done
              ? "WIPE TRACE"
              : "DECRYPT TRANSMISSION"}
        </Button>
      </Scramble>

      <Card>
        <CardHeader className={`${decrypting && "pb-0"}`}>
          <CardTitle className="font-mono text-sm tracking-widest text-foreground-muted">
            <Scramble>
              {done ? "TRANSMISSION DECODED" : "INCOMING TRANSMISSION"}
            </Scramble>
          </CardTitle>
          <CardDescription className="font-mono">
            {decrypting
              ? `decrypting… ${Math.round(progress)}%`
              : done
                ? "channel verified"
                : "channel: encrypted"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 font-mono text-sm">
          {decrypting ? <Progress value={progress} /> : null}
          {FIELDS.map((f) => (
            <div
              key={f.label}
              className="flex items-baseline justify-between gap-4"
            >
              <span className="text-foreground-muted">{f.label}</span>
              <Scramble className={done ? "text-accent" : "text-foreground"}>
                {done ? f.value : mask(f.value)}
              </Scramble>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
