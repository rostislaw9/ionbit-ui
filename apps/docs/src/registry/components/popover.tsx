import type { ComponentMeta } from "./types";

import { PopoverBasicDemo } from "../../demos/popover-basic-demo";
import PopoverBasicDemoSource from "../../demos/popover-basic-demo.tsx?highlighted";
import PopoverBasicDemoRaw from "../../demos/popover-basic-demo.tsx?raw";

export const popoverMeta: ComponentMeta = {
  name: "popover",
  label: "Popover",
  description: "Popover with anchored content, fade and zoom animation.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description: "Click trigger to show anchored content.",
      code: PopoverBasicDemoSource,
      rawCode: PopoverBasicDemoRaw,
      render: () => <PopoverBasicDemo />,
    },
  ],
  usageImport: `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";`,
  usageCode: `<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>`,
  composition: ["Popover", "├── PopoverTrigger", "└── PopoverContent"],
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
      description: "Whether the popover is modal.",
    },
  ],
  accessibility: [
    "Radix handles focus trapping and restoration",
    "Escape key closes popover",
    "Click outside dismisses",
  ],
  basedOn: "radix",
  isNew: false,
};
