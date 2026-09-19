import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/code/InlineCode";
import { TiltDemo } from "../../demos/tilt-demo";
import TiltDemoSource from "../../demos/tilt-demo.tsx?highlighted";
import TiltDemoRaw from "../../demos/tilt-demo.tsx?raw";
import { TiltReflectionDemo } from "../../demos/tilt-reflection-demo";
import TiltReflectionDemoSource from "../../demos/tilt-reflection-demo.tsx?highlighted";
import TiltReflectionDemoRaw from "../../demos/tilt-reflection-demo.tsx?raw";
import { TiltSpotlightDemo } from "../../demos/tilt-spotlight-demo";
import TiltSpotlightDemoSource from "../../demos/tilt-spotlight-demo.tsx?highlighted";
import TiltSpotlightDemoRaw from "../../demos/tilt-spotlight-demo.tsx?raw";

export const tiltMeta: ComponentMeta = {
  name: "tilt",
  label: "Tilt",
  description:
    "A subtle perspective tilt toward the cursor while hovering, spring-smoothed and capped at a few degrees. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description: "Perspective tilt on a card.",
      code: TiltDemoSource,
      rawCode: TiltDemoRaw,
      render: () => <TiltDemo />,
    },
    {
      title: "Reflection",
      description: (
        <>
          Add <InlineCode>reflection</InlineCode> prop to create a specular
          glare that follows the tilt.
        </>
      ),
      code: TiltReflectionDemoSource,
      rawCode: TiltReflectionDemoRaw,
      render: () => <TiltReflectionDemo />,
    },
    {
      title: "With Spotlight",
      description: "Tilt and Spotlight compose on the same element.",
      code: TiltSpotlightDemoSource,
      rawCode: TiltSpotlightDemoRaw,
      render: () => <TiltSpotlightDemo />,
    },
  ],
  usageImport: `import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tilt } from "@/components/motion/tilt";`,
  usageCode: `<Tilt>
  <Card elevated>
    <CardHeader>
      <CardTitle>Tilt</CardTitle>
    </CardHeader>
    <CardContent>Move the cursor across this card.</CardContent>
  </Card>
</Tilt>`,
  props: [
    {
      name: "intensity",
      type: "number (0-1)",
      default: "0.5",
      description: "Scales the tilt angle.",
    },
    {
      name: "maxAngle",
      type: "number",
      default: "20",
      description: "Maximum tilt angle in degrees at full intensity.",
    },
    {
      name: "perspective",
      type: "number",
      default: "800",
      description: "Perspective distance in px — lower feels deeper.",
    },
    {
      name: "reflection",
      type: "boolean",
      default: "false",
      description:
        "Add a specular sheen driven by the surface orientation — the reflection band sweeps across the card as it tilts, like light on a coated surface. A flat card shows no reflection.",
    },
    {
      name: "reflectionIntensity",
      type: "number (0-1)",
      default: "0.35",
      description: "Glare opacity at full tilt.",
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
      description: "Disable the tilt effect.",
    },
  ],
  accessibility: [
    "Purely decorative — disabled when reduced motion is active",
    "Only active while hovering — no layout or focus changes",
    "Wrapped element remains fully focusable",
  ],
};
