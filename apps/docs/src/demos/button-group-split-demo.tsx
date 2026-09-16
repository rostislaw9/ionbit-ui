import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

export function ButtonGroupSplitDemo() {
  return (
    <ButtonGroup variant="separated">
      <Button variant="destructive">Archive</Button>
      <ButtonGroupSeparator />
      <Button variant="destructive" size="icon" aria-label="Delete">
        <Trash2 />
      </Button>
    </ButtonGroup>
  );
}
