import type { ComponentMeta } from "./types";

import { RippleCardDemo } from "../../demos/ripple-card-demo";
import RippleCardDemoSource from "../../demos/ripple-card-demo.tsx?highlighted";
import RippleCardDemoRaw from "../../demos/ripple-card-demo.tsx?raw";
import { RippleCenteredDemo } from "../../demos/ripple-centered-demo";
import RippleCenteredDemoSource from "../../demos/ripple-centered-demo.tsx?highlighted";
import RippleCenteredDemoRaw from "../../demos/ripple-centered-demo.tsx?raw";
import { RippleDemo } from "../../demos/ripple-demo";
import RippleDemoSource from "../../demos/ripple-demo.tsx?highlighted";
import RippleDemoRaw from "../../demos/ripple-demo.tsx?raw";

export const rippleMeta: ComponentMeta = {
  name: "ripple",
  label: "Ripple",
  description:
    "A radial circle that expands from the press point and fades out — like the Mode Switcher's reveal, contained to the element. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description:
        "Press feedback on buttons. The circle grows from the exact click position.",
      code: RippleDemoSource,
      rawCode: RippleDemoRaw,
      render: () => <RippleDemo />,
    },
    {
      title: "Centered",
      description:
        "The centered prop expands from the element's center — suited to icon buttons.",
      code: RippleCenteredDemoSource,
      rawCode: RippleCenteredDemoRaw,
      render: () => <RippleCenteredDemo />,
    },
    {
      title: "Card",
      description:
        "Block-level targets need a display override on the wrapper so it covers the element.",
      code: RippleCardDemoSource,
      rawCode: RippleCardDemoRaw,
      render: () => <RippleCardDemo />,
    },
  ],
  usageImport: `import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/motion/ripple";`,
  usageCode: `<Ripple>
  <Button>Press</Button>
</Ripple>`,
  props: [
    {
      name: "intensity",
      type: "number (0-1)",
      default: "0.3",
      description: "Peak opacity of the expanding circle.",
    },
    {
      name: "centered",
      type: "boolean",
      default: "false",
      description:
        "Expand from the element center instead of the pointer position.",
    },
    {
      name: "color",
      type: "string",
      default: "element's computed text color",
      description: "Ripple color override.",
    },
    {
      name: "duration",
      type: "number",
      default: "motionTokens.duration.slow (420)",
      description: "Ripple duration in ms.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the ripple.",
    },
  ],
  accessibility: [
    "Keyboard users get the same feedback — Enter and Space spawn a centered ripple",
    "No ripple is spawned under prefers-reduced-motion",
    "Ripple spans are aria-hidden and pointer-events-none",
  ],
};
