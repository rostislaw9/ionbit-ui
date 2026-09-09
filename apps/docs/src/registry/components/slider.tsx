import type { ComponentMeta } from "./types";

import { SliderBasicDemo } from "../../demos/slider-basic-demo";
import SliderBasicDemoSource from "../../demos/slider-basic-demo.tsx?highlighted";
import SliderBasicDemoRaw from "../../demos/slider-basic-demo.tsx?raw";

export const sliderMeta: ComponentMeta = {
  name: "slider",
  label: "Slider",
  description:
    "Slider with accent range and thumb, focus ring and hover scale.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "Adjustable single-value slider with live value display.",
      code: SliderBasicDemoSource,
      rawCode: SliderBasicDemoRaw,
      render: () => <SliderBasicDemo />,
    },
  ],
  usageImport: `import { Slider } from "@/components/ui/slider";`,
  usageCode: `<Slider defaultValue={[50]} max={100} step={1} />`,
  props: [
    {
      name: "value",
      type: "number[]",
      description: "Controlled value array.",
    },
    {
      name: "defaultValue",
      type: "number[]",
      description: "Uncontrolled default value.",
    },
    {
      name: "onValueChange",
      type: "function",
      description: "Called when the value changes.",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Step increment.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Prevents interaction.",
    },
  ],
  accessibility: [
    'role="slider" with aria-valuenow/min/max',
    "Arrow keys to adjust",
    "Keyboard focusable",
  ],
  basedOn: "radix",
  isNew: false,
};
