import { Maximize, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupOrientationDemo() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Zoom controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon" aria-label="Zoom in">
        <Plus />
      </Button>
      <Button variant="outline" size="icon" aria-label="Zoom out">
        <Minus />
      </Button>
      <Button variant="outline" size="icon" aria-label="Fit to screen">
        <Maximize />
      </Button>
    </ButtonGroup>
  );
}
