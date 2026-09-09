import type { ComponentMeta } from "./types";

import { PulseDemo } from "../../demos/pulse-demo";
import PulseDemoSource from "../../demos/pulse-demo.tsx?highlighted";
import PulseDemoRaw from "../../demos/pulse-demo.tsx?raw";
import { PulseTextDemo } from "../../demos/pulse-text-demo";
import PulseTextDemoSource from "../../demos/pulse-text-demo.tsx?highlighted";
import PulseTextDemoRaw from "../../demos/pulse-text-demo.tsx?raw";

export const pulseMeta: ComponentMeta = {
  name: "pulse",
  label: "Pulse",
  description:
    "Periodic accent halo for active status. Supports halo and text variants.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description: "Periodic accent halo for active status.",
      code: PulseDemoSource,
      rawCode: PulseDemoRaw,
      render: () => <PulseDemo />,
    },
    {
      title: "Text",
      description: "Text-shadow pulse that follows individual letter shapes.",
      code: PulseTextDemoSource,
      rawCode: PulseTextDemoRaw,
      render: () => <PulseTextDemo />,
    },
  ],
  usageImport: `import { Button } from "@/components/ui/button";
import { Pulse } from "@/components/motion/pulse";`,
  usageCode: `<Pulse>
  <Button>Active</Button>
</Pulse>`,
  props: [
    {
      name: "intensity",
      type: "number (0-1)",
      default: "motionTokens.intensity.glow",
      description: "Pulse strength.",
    },
    {
      name: "variant",
      type: '"halo" | "text"',
      default: '"halo"',
      description:
        "Halo uses box-shadow, text uses text-shadow following letter shapes.",
    },
    {
      name: "color",
      type: "string",
      default: "var(--accent)",
      description: "Color override.",
    },
    {
      name: "duration",
      type: "number",
      default: "1600",
      description: "Pulse cycle duration in ms.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the pulse.",
    },
  ],
  accessibility: [
    "Collapses to static state under reduced motion",
    "Status is communicated by color/shape, not motion",
    "Use sparingly — only for genuinely active states",
  ],
  isNew: false,
};
