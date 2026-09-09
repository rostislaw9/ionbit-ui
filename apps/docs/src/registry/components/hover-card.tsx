import type { ComponentMeta } from "./types";

import { HoverCardDemo } from "../../demos/hover-card-demo";
import HoverCardDemoSource from "../../demos/hover-card-demo.tsx?highlighted";
import HoverCardDemoRaw from "../../demos/hover-card-demo.tsx?raw";

export const hoverCardMeta: ComponentMeta = {
  name: "hover-card",
  label: "Hover Card",
  description: "Hover card with delayed open/close and zoom animation.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description: "Preview content on hover with a delay.",
      code: HoverCardDemoSource,
      rawCode: HoverCardDemoRaw,
      render: () => <HoverCardDemo />,
    },
  ],
  usageImport: `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";`,
  usageCode: `<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Preview content</HoverCardContent>
</HoverCard>`,
  composition: ["HoverCard", "├── HoverCardTrigger", "└── HoverCardContent"],
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
      description: "Called when open state changes.",
    },
    {
      name: "openDelay",
      type: "number",
      default: "200",
      description: "Delay before opening (ms).",
    },
    {
      name: "closeDelay",
      type: "number",
      default: "300",
      description: "Delay before closing (ms).",
    },
  ],
  accessibility: [
    "Radix manages ARIA attributes",
    "Keyboard accessible via focus",
  ],
  basedOn: "radix",
  isNew: false,
};
