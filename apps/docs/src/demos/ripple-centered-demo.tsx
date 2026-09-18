import { Play } from "lucide-react";

import { Ripple } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function RippleCenteredDemo() {
  return (
    <div className="flex items-center gap-3">
      <Ripple centered>
        <Button variant="outline" size="xl" className="w-48" aria-label="Play">
          <Play data-icon="inline-start" />
          Play
        </Button>
      </Ripple>
      <Ripple centered>
        <Button variant="ghost" size="xl" className="w-48" aria-label="Play">
          <Play data-icon="inline-start" />
          Play
        </Button>
      </Ripple>
    </div>
  );
}
