import type { ComponentMeta } from "./types";

import { TraceDemo } from "../../demos/trace-demo";
import TraceDemoSource from "../../demos/trace-demo.tsx?highlighted";
import TraceDemoRaw from "../../demos/trace-demo.tsx?raw";
import { TraceStateDemo } from "../../demos/trace-state-demo";
import TraceStateDemoSource from "../../demos/trace-state-demo.tsx?highlighted";
import TraceStateDemoRaw from "../../demos/trace-state-demo.tsx?raw";

export const traceMeta: ComponentMeta = {
  name: "trace",
  label: "Trace",
  description:
    "A single accent point that travels along an element's border, marking processing or active states on cards and inputs. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description:
        "Beam traveling along the border of a card and a status chip.",
      code: TraceDemoSource,
      rawCode: TraceDemoRaw,
      render: () => <TraceDemo />,
    },
    {
      title: "State",
      description:
        "Toggle the beam with the active prop — works for any boolean state.",
      code: TraceStateDemoSource,
      rawCode: TraceStateDemoRaw,
      render: () => <TraceStateDemo />,
    },
  ],
  usageImport: `import { Trace } from "@/components/motion/trace";`,
  usageCode: `<Trace as="div" active={processing}>
  <Card>...</Card>
</Trace>`,
  props: [
    {
      name: "intensity",
      type: "number (0-1)",
      default: "0.6",
      description: "Beam strength (opacity).",
    },
    {
      name: "color",
      type: "string",
      default: "var(--accent)",
      description: "Beam color override.",
    },
    {
      name: "duration",
      type: "number",
      default: "2400",
      description: "Time for one lap around the border in ms.",
    },
    {
      name: "thickness",
      type: "number",
      default: "1.5",
      description: "Beam thickness in px.",
    },
    {
      name: "arc",
      type: "number (0-1)",
      default: "0.15",
      description: "Beam length as a fraction of the border perimeter.",
    },
    {
      name: "as",
      type: '"span" | "div"',
      default: '"span"',
      description: "Wrapper element tag; use div for block children.",
    },
    {
      name: "active",
      type: "boolean",
      default: "true",
      description:
        "Whether the beam is running; toggles without unmounting the wrapper.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the effect entirely.",
    },
  ],
  accessibility: [
    "Beam layer is decorative and aria-hidden",
    "Reduced motion replaces the animation with a static accent ring",
    "State should also be conveyed by text or icon, not the beam alone",
  ],
};
