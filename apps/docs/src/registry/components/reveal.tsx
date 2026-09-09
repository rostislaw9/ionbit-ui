import type { ComponentMeta } from "./types";

import { RevealDemo } from "../../demos/reveal-demo";
import RevealDemoSource from "../../demos/reveal-demo.tsx?highlighted";
import RevealDemoRaw from "../../demos/reveal-demo.tsx?raw";

export const revealMeta: ComponentMeta = {
  name: "reveal",
  label: "Reveal",
  description: "In-view entrance animation with directional offset.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description: "In-view entrance animation.",
      code: RevealDemoSource,
      rawCode: RevealDemoRaw,
      render: () => <RevealDemo />,
    },
  ],
  usageImport: `import { Reveal } from "@/components/motion/reveal";`,
  usageCode: `<Reveal direction="up">
  <div>Content</div>
</Reveal>`,
  props: [
    {
      name: "direction",
      type: '"up" | "down" | "left" | "right" | "none"',
      default: '"up"',
      description: "Direction of the reveal offset.",
    },
    {
      name: "delay",
      type: "number",
      default: "0",
      description: "Delay before animation in ms.",
    },
    {
      name: "distance",
      type: "number",
      default: "12",
      description: "Offset distance in px for the reveal animation.",
    },
    {
      name: "once",
      type: "boolean",
      default: "true",
      description: "Animate only once or every time it enters the viewport.",
    },
    {
      name: "threshold",
      type: "number",
      default: "0.15",
      description: "Intersection ratio at which the animation triggers (0-1).",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the reveal animation.",
    },
  ],
  accessibility: [
    "Content is always in DOM — animation is visual only",
    "Disabled when reduced motion is active",
    "Does not affect screen reader content order",
  ],
  isNew: false,
};
