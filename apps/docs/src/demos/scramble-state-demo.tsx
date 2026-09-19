import { useState } from "react";

import { Scramble } from "@/components/motion";
import { Button } from "@/components/ui/button";

const STATUSES = ["STANDBY", "DECRYPTING", "ACCESS GRANTED"];

export function ScrambleStateDemo() {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col items-center gap-5">
      <Scramble className="font-mono text-2xl text-accent">
        {STATUSES[index]!}
      </Scramble>
      <Button
        variant="outline"
        onClick={() => setIndex((i) => (i + 1) % STATUSES.length)}
      >
        Cycle status
      </Button>
    </div>
  );
}
