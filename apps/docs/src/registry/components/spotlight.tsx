import type { ComponentMeta } from "./types";

import { SpotlightBasicDemo } from "../../demos/spotlight-basic-demo";
import SpotlightBasicDemoSource from "../../demos/spotlight-basic-demo.tsx?highlighted";
import SpotlightBasicDemoRaw from "../../demos/spotlight-basic-demo.tsx?raw";
import { SpotlightProximityDemo } from "../../demos/spotlight-proximity-demo";
import SpotlightProximityDemoSource from "../../demos/spotlight-proximity-demo.tsx?highlighted";
import SpotlightProximityDemoRaw from "../../demos/spotlight-proximity-demo.tsx?raw";
import { TiltSpotlightDemo } from "../../demos/tilt-spotlight-demo";
import TiltSpotlightDemoSource from "../../demos/tilt-spotlight-demo.tsx?highlighted";
import TiltSpotlightDemoRaw from "../../demos/tilt-spotlight-demo.tsx?raw";

export const spotlightMeta: ComponentMeta = {
  name: "spotlight",
  label: "Spotlight",
  description:
    "A radial highlight that follows the pointer across a surface, activating through a proximity threshold before the cursor arrives. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description:
        "Wrap any surface to add a radial highlight that follows the cursor. The effect starts 20px before the pointer enters.",
      code: SpotlightBasicDemoSource,
      rawCode: SpotlightBasicDemoRaw,
      render: () => <SpotlightBasicDemo />,
    },
    {
      title: "Proximity",
      description:
        "Control how far before the cursor reaches the element the effect activates.",
      code: SpotlightProximityDemoSource,
      rawCode: SpotlightProximityDemoRaw,
      render: () => <SpotlightProximityDemo />,
    },
    {
      title: "With Tilt",
      description: "Spotlight and Tilt compose on the same element.",
      code: TiltSpotlightDemoSource,
      rawCode: TiltSpotlightDemoRaw,
      render: () => <TiltSpotlightDemo />,
    },
  ],
  usageImport: `import { Spotlight } from "@/components/motion/spotlight";`,
  usageCode: `<Spotlight intensity={0.4} radius={220}>
  <div className="surface">Hover me</div>
</Spotlight>`,
  props: [
    {
      name: "intensity",
      type: "number",
      default: "0.4",
      description: "Highlight intensity (0-1).",
    },
    {
      name: "radius",
      type: "number",
      default: "220",
      description: "Radius of the radial highlight.",
    },
    {
      name: "proximity",
      type: "number",
      default: "0",
      description: "Distance before cursor reaches element to activate.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the effect.",
    },
    {
      name: "as",
      type: '"div" | "section" | "article" | "li" | "button"',
      default: '"div"',
      description: "Render as a different element.",
    },
  ],
  accessibility: [
    "Purely decorative — disabled when reduced motion is active",
    "Does not interfere with keyboard navigation",
  ],
};
