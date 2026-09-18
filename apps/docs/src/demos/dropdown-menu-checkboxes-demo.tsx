import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuCheckboxesDemo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMinimap, setShowMinimap] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        Open Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showSidebar}
            onCheckedChange={setShowSidebar}
          >
            Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showMinimap}
            onCheckedChange={setShowMinimap}
            disabled
          >
            Minimap
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
