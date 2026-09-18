import { Spotlight, Tilt } from "@/components/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TiltSpotlightDemo() {
  return (
    <Tilt>
      <Spotlight intensity={0.5}>
        <Card elevated className="max-w-sm">
          <CardHeader>
            <CardTitle>Tilt + Spotlight</CardTitle>
            <CardDescription>
              Effects compose on the same element.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground-muted">
              The card tilts while the highlight tracks the pointer.
            </p>
          </CardContent>
        </Card>
      </Spotlight>
    </Tilt>
  );
}
