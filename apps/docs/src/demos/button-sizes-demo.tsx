import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
      <div className="flex items-center gap-2">
        <Button size="xs" variant="outline">
          XS
        </Button>
        <Button size="icon-xs" variant="outline" aria-label="Add">
          <Plus />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Add">
          <Plus />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="md" variant="outline">
          Medium
        </Button>
        <Button size="icon" variant="outline" aria-label="Add">
          <Plus />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button size="icon-lg" variant="outline" aria-label="Add">
          <Plus />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="xl" variant="outline">
          XLarge
        </Button>
        <Button size="icon-xl" variant="outline" aria-label="Add">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
