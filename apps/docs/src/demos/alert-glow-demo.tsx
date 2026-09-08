import { Info } from "lucide-react";

import { Glow } from "@/components/motion";
import { Alert, AlertTitle } from "@/components/ui/alert";

export function AlertGlowDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Glow>
        <Alert variant="info">
          <AlertTitle>
            <Info />
            New version available
          </AlertTitle>
        </Alert>
      </Glow>
      <Glow color="var(--success)">
        <Alert variant="success">
          <AlertTitle>
            <Info />
            Deployment completed
          </AlertTitle>
        </Alert>
      </Glow>
      <Glow color="var(--error)">
        <Alert variant="error">
          <AlertTitle>
            <Info />
            Build failed
          </AlertTitle>
        </Alert>
      </Glow>
    </div>
  );
}
