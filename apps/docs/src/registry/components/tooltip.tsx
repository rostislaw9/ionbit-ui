import type { ComponentMeta } from "./types";

import { TooltipPositionsDemo } from "../../demos/tooltip-positions-demo";
import TooltipPositionsDemoSource from "../../demos/tooltip-positions-demo.tsx?highlighted";
import TooltipPositionsDemoRaw from "../../demos/tooltip-positions-demo.tsx?raw";

export const tooltipMeta: ComponentMeta = {
  name: "tooltip",
  label: "Tooltip",
  description:
    "Tooltip with directional slide-in on appearance, fade-out on dismiss, and keyboard accessibility.",
  category: "Overlay",
  examples: [
    {
      title: "Positions",
      description: "Top, bottom, left and right positions.",
      code: TooltipPositionsDemoSource,
      rawCode: TooltipPositionsDemoRaw,
      render: () => <TooltipPositionsDemo />,
    },
  ],
  usageImport: `import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";`,
  usageCode: `<Tooltip content="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>`,
  props: [
    {
      name: "content",
      type: "ReactNode",
      description: "Tooltip text or JSX content.",
    },
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      default: '"top"',
      description: "Side the tooltip appears on.",
    },
    {
      name: "delayDuration",
      type: "number",
      default: "200",
      description: "Delay before showing in ms.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the tooltip.",
    },
  ],
  accessibility: [
    "Radix handles ARIA attributes (aria-describedby)",
    "Keyboard focus triggers tooltip",
    "Screen readers announce content",
  ],
  basedOn: "radix",
  isNew: false,
};
