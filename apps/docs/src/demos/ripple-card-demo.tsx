import { Ripple } from "@/components/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RippleCardDemo() {
  return (
    <Ripple className="flex">
      <Card elevated className="w-full max-w-sm cursor-pointer">
        <CardHeader>
          <CardTitle>Nightly build</CardTitle>
          <CardDescription>Click anywhere on this card.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground-muted">
            The ripple expands from the exact press position.
          </p>
        </CardContent>
      </Card>
    </Ripple>
  );
}
