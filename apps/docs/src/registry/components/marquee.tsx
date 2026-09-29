import type { ComponentMeta } from "./types";

import { MarqueeDemo } from "../../demos/marquee-demo";
import MarqueeDemoSource from "../../demos/marquee-demo.tsx?highlighted";
import MarqueeDemoRaw from "../../demos/marquee-demo.tsx?raw";

export const marqueeMeta: ComponentMeta = {
  name: "marquee",
  label: "Marquee",
  description:
    "Content scrolls in a seamless horizontal loop — a status ticker with pause-on-hover, reverse direction, and reduced-motion support.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description:
        "A status ticker loops forever — hover pauses it so items stay readable and clickable.",
      code: MarqueeDemoSource,
      rawCode: MarqueeDemoRaw,
      render: () => <MarqueeDemo />,
    },
  ],
  usageImport: `import { Marquee } from "@/components/motion/marquee";`,
  usageCode: `<Marquee><Badge>build ok</Badge><Badge>docs live</Badge></Marquee>`,
  props: [
    {
      name: "children",
      type: "ReactNode",
      description:
        "Content repeated around the loop — chips, badges, feed items.",
    },
    {
      name: "duration",
      type: "number",
      default: "24",
      description: "Seconds per full loop.",
    },
    {
      name: "reverse",
      type: "boolean",
      default: "false",
      description: "Scroll right-to-left instead.",
    },
    {
      name: "pauseOnHover",
      type: "boolean",
      default: "true",
      description:
        "Pause the loop while the pointer is over the marquee. To pause from a larger containing surface (e.g. a whole card), mark that ancestor with data-marquee-pause-scope.",
    },
    {
      name: "gap",
      type: "number",
      default: "24",
      description:
        "Gap between items and between repeated copies, in px. Keep it wider than item margins so the seam stays invisible.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description:
        "Stop the loop — renders the content statically, clipped to the container.",
    },
  ],
  accessibility: [
    "The duplicated copy is aria-hidden — content is announced once",
    "Renders statically when reduced motion is active",
    "Pause-on-hover is disabled on touch devices (hover: hover media query)",
  ],
};
