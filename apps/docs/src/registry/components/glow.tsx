import type { ComponentMeta } from "./types";

import { GlowAlwaysDemo } from "../../demos/glow-always-demo";
import GlowAlwaysDemoSource from "../../demos/glow-always-demo.tsx?highlighted";
import GlowAlwaysDemoRaw from "../../demos/glow-always-demo.tsx?raw";
import { GlowDemo } from "../../demos/glow-demo";
import GlowDemoSource from "../../demos/glow-demo.tsx?highlighted";
import GlowDemoRaw from "../../demos/glow-demo.tsx?raw";
import { GlowLinkDemo } from "../../demos/glow-link-demo";
import GlowLinkDemoSource from "../../demos/glow-link-demo.tsx?highlighted";
import GlowLinkDemoRaw from "../../demos/glow-link-demo.tsx?raw";
import { GlowTextDemo } from "../../demos/glow-text-demo";
import GlowTextDemoSource from "../../demos/glow-text-demo.tsx?highlighted";
import GlowTextDemoRaw from "../../demos/glow-text-demo.tsx?raw";

export const glowMeta: ComponentMeta = {
  name: "glow",
  label: "Glow",
  description:
    "State-driven accent halo on hover/focus. Supports halo and text variants.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description: "Accent halo that appears on hover.",
      code: GlowDemoSource,
      rawCode: GlowDemoRaw,
      render: () => <GlowDemo />,
    },
    {
      title: "Always On",
      description: "Constant glow without hover — use for active/live states.",
      code: GlowAlwaysDemoSource,
      rawCode: GlowAlwaysDemoRaw,
      render: () => <GlowAlwaysDemo />,
    },
    {
      title: "Link",
      description: "Link text with glow on hover.",
      code: GlowLinkDemoSource,
      rawCode: GlowLinkDemoRaw,
      render: () => <GlowLinkDemo />,
    },
    {
      title: "Text",
      description: "Text-shadow glow that follows letter shapes on hover.",
      code: GlowTextDemoSource,
      rawCode: GlowTextDemoRaw,
      render: () => <GlowTextDemo />,
    },
  ],
  usageImport: `import { Button } from "@/components/ui/button";
import { Glow } from "@/components/motion/glow";`,
  usageCode: `<Glow>
  <Button>Hover me</Button>
</Glow>`,
  props: [
    {
      name: "intensity",
      type: "number (0-1)",
      default: "motionTokens.intensity.glow",
      description: "Glow strength.",
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
      name: "always",
      type: "boolean",
      default: "false",
      description: "Show glow constantly, not just on hover/focus.",
    },
    {
      name: "onHover",
      type: "boolean",
      default: "true",
      description: "Trigger glow on hover.",
    },
    {
      name: "onFocus",
      type: "boolean",
      default: "true",
      description: "Trigger glow on focus-visible.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the glow entirely.",
    },
  ],
  accessibility: [
    "State signal, not motion — still visible with reduced motion",
    "Triggered on hover and focus-visible for keyboard users",
    "Does not add ARIA attributes — decorative enhancement only",
  ],
  isNew: false,
};
