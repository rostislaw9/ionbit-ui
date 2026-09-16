import { Bookmark } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle variant="outline">
      <Bookmark className="group-data-pressed/toggle:fill-accent" />
      Bookmark
    </Toggle>
  );
}
