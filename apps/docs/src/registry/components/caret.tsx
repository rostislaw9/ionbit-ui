import type { ComponentMeta } from "./types";

import { CaretDemo } from "../../demos/caret-demo";
import CaretDemoSource from "../../demos/caret-demo.tsx?highlighted";
import CaretDemoRaw from "../../demos/caret-demo.tsx?raw";

export const caretMeta: ComponentMeta = {
  name: "caret",
  label: "Caret",
  description:
    "A blinking terminal block cursor as a standalone primitive — the same caret Typewriter trails while typing. Static under reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description:
        "Block, custom glyph, faster blink, and a static cursor for closed channels.",
      code: CaretDemoSource,
      rawCode: CaretDemoRaw,
      render: () => <CaretDemo />,
    },
  ],
  usageImport: `import { Caret } from "@/components/motion/caret";`,
  usageCode: `<p>&gt; awaiting input<Caret /></p>`,
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: '"▌"',
      description: "Glyph to blink — any character or element.",
    },
    {
      name: "blink",
      type: "boolean",
      default: "true",
      description: "Blink on/off — when false the glyph renders static.",
    },
    {
      name: "interval",
      type: "number",
      default: "1100",
      description: "Blink cycle in ms.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional classes on the caret span.",
    },
  ],
  accessibility: [
    "Always aria-hidden — the cursor is decoration, not content",
    "Renders statically when reduced motion is active",
  ],
};
