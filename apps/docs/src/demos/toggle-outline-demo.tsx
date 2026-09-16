import { Bold, Italic } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export function ToggleOutlineDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline">
        <Italic />
        Italic
      </Toggle>
      <Toggle variant="outline">
        <Bold />
        Bold
      </Toggle>
    </div>
  );
}
