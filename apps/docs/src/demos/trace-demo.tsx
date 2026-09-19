import { Trace } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TraceDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Trace as="div">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Syncing library
              <Badge variant="accent-soft">processing</Badge>
            </CardTitle>
            <CardDescription>indexing 1,248 components</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground-muted">
            A beam travels the border while work is in progress.
          </CardContent>
        </Card>
      </Trace>
      <Trace duration={1600}>
        <span className="inline-flex items-center rounded-md border border-border px-3 py-1.5 font-mono text-xs">
          awaiting handshake
        </span>
      </Trace>
    </div>
  );
}
