import { Tilt } from "@/components/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TiltDemo() {
  return (
    <Tilt>
      <Card elevated className="max-w-sm">
        <CardHeader>
          <CardTitle>Tilt</CardTitle>
          <CardDescription>Move the cursor across this card.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground-muted">
            The card tilts toward the pointer and springs back on leave.
          </p>
        </CardContent>
      </Card>
    </Tilt>
  );
}
