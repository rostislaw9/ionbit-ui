import type { ComponentMeta } from "./types";

import { DropdownMenuBasicDemo } from "../../demos/dropdown-menu-basic-demo";
import DropdownMenuBasicDemoSource from "../../demos/dropdown-menu-basic-demo.tsx?highlighted";
import DropdownMenuBasicDemoRaw from "../../demos/dropdown-menu-basic-demo.tsx?raw";

export const dropdownMenuMeta: ComponentMeta = {
  name: "dropdown-menu",
  label: "Dropdown Menu",
  description:
    "Dropdown menu with items, labels, separators, and keyboard navigation.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description: "Menu with label, items, and separator.",
      code: DropdownMenuBasicDemoSource,
      rawCode: DropdownMenuBasicDemoRaw,
      render: () => <DropdownMenuBasicDemo />,
    },
  ],
  usageImport: `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";`,
  usageCode: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  composition: [
    "DropdownMenu",
    "├── DropdownMenuTrigger",
    "└── DropdownMenuContent",
    "    ├── DropdownMenuItem",
    "    ├── DropdownMenuLabel",
    "    └── DropdownMenuSeparator",
  ],
  props: [
    { name: "open", type: "boolean", description: "Controlled open state." },
    {
      name: "defaultOpen",
      type: "boolean",
      description: "Uncontrolled default open state.",
    },
    {
      name: "onOpenChange",
      type: "function",
      description: "Called when the open state changes.",
    },
    {
      name: "modal",
      type: "boolean",
      default: "true",
      description: "Whether the menu is modal.",
    },
  ],
  accessibility: [
    "Radix manages roving tabindex for items",
    "Arrow keys navigate",
    "Escape closes menu",
    "aria-haspopup on trigger",
  ],
  basedOn: "radix",
  isNew: false,
};
