import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  XCircle,
} from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

export function AlertVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Alert>
        <AlertTitle>
          <Info />
          Default
        </AlertTitle>
      </Alert>
      <Alert variant="accent">
        <AlertTitle>
          <Sparkles />
          Accent
        </AlertTitle>
      </Alert>
      <Alert variant="info">
        <AlertTitle>
          <Info />
          Info
        </AlertTitle>
      </Alert>
      <Alert variant="success">
        <AlertTitle>
          <CheckCircle2 />
          Success
        </AlertTitle>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>
          <AlertTriangle />
          Warning
        </AlertTitle>
      </Alert>
      <Alert variant="error">
        <AlertTitle>
          <XCircle />
          Error
        </AlertTitle>
      </Alert>
    </div>
  );
}
