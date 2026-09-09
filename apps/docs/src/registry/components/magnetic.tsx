import type { ComponentMeta } from "./types";

import { MagneticDemo } from "../../demos/magnetic-demo";
import MagneticDemoSource from "../../demos/magnetic-demo.tsx?highlighted";
import MagneticDemoRaw from "../../demos/magnetic-demo.tsx?raw";

export const magneticMeta: ComponentMeta = {
  name: "magnetic",
  label: "Magnetic",
  description: "Spring-based cursor attraction for interactive elements.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description: "Spring-based cursor attraction.",
      code: MagneticDemoSource,
      rawCode: MagneticDemoRaw,
      render: () => <MagneticDemo />,
    },
  ],
  usageImport: `import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";`,
  usageCode: `<Magnetic>
  <Button>Hover me</Button>
</Magnetic>`,
  props: [
    {
      name: "intensity",
      type: "number (0-1)",
      default: "0.25",
      description: "Pull strength toward cursor.",
    },
    {
      name: "proximity",
      type: "number",
      default: "20",
      description:
        "Proximity radius in px. The pull activates before the cursor touches the element.",
    },
    {
      name: "as",
      type: '"div" | "span" | "button"',
      default: '"div"',
      description: "Render as a different element.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the magnetic effect.",
    },
  ],
  accessibility: [
    "Purely decorative — disabled when reduced motion is active",
    "Does not interfere with keyboard navigation",
    "Wrapped element remains fully focusable",
  ],
  isNew: false,
};
