import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
      <ButtonGroup>
        <Button variant="outline" size="xs">
          XS
        </Button>
        <Button variant="outline" size="icon-xs" aria-label="Add">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Add">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="md">
          Medium
        </Button>
        <Button variant="outline" size="icon" aria-label="Add">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>

        <Button variant="outline" size="icon-lg" aria-label="Add">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="xl">
          XL
        </Button>
        <Button variant="outline" size="icon-xl" aria-label="Add">
          <Plus />
        </Button>
      </ButtonGroup>
    </div>
  );
}
