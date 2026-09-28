import { Reveal, Scramble } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ScrambleRevealDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Reveal direction="up" distance={16}>
        <Scramble as="div" trigger="view">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Incoming transmission
                <Badge variant="accent-soft">live</Badge>
              </CardTitle>
              <CardDescription>decrypted on arrival</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-xs text-foreground-muted">
                &gt; payload verified — channel secure
              </p>
            </CardContent>
          </Card>
        </Scramble>
      </Reveal>
      <p className="font-mono text-xs text-foreground-subtle">
        the card slides up while its text decodes — one scroll, two primitives
      </p>
    </div>
  );
}
