import { Trace } from "@/components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TraceDoubleDemo() {
  return (
    <div className="flex w-full max-w-md gap-4">
      <Trace as="div" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-xs">single</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground-muted">
            One beam circles the border.
          </CardContent>
        </Card>
      </Trace>
      <Trace as="div" double className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-xs">double</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground-muted">
            Two beams, opposite sides.
          </CardContent>
        </Card>
      </Trace>
    </div>
  );
}
