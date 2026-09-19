import { Tilt } from "@/components/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TiltReflectionDemo() {
  return (
    <Tilt reflection>
      <Card elevated className="max-w-sm">
        <CardHeader>
          <CardTitle>Tilt + Reflection</CardTitle>
          <CardDescription>A specular glare follows the tilt.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground-muted">
            The highlight slides across the surface as the card tilts.
          </p>
        </CardContent>
      </Card>
    </Tilt>
  );
}
