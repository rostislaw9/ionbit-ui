import { Ripple } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function RippleDemo() {
  return (
    <div className="flex items-center gap-3">
      <Ripple>
        <Button size="xl" className="w-48" variant="secondary">
          Deploy
        </Button>
      </Ripple>
      <Ripple>
        <Button size="xl" className="w-48" variant="outline">
          Preview
        </Button>
      </Ripple>
      <Ripple>
        <Button size="xl" className="w-48">
          Publish
        </Button>
      </Ripple>
    </div>
  );
}
