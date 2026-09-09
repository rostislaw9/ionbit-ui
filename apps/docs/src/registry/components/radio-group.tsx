import type { ComponentMeta } from "./types";

import { RadioGroupBasicDemo } from "../../demos/radio-group-basic-demo";
import RadioGroupBasicDemoSource from "../../demos/radio-group-basic-demo.tsx?highlighted";
import RadioGroupBasicDemoRaw from "../../demos/radio-group-basic-demo.tsx?raw";

export const radioGroupMeta: ComponentMeta = {
  name: "radio-group",
  label: "Radio Group",
  description: "Radio group with circular indicators and accent fill.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "Vertical radio group with labels.",
      code: RadioGroupBasicDemoSource,
      rawCode: RadioGroupBasicDemoRaw,
      render: () => <RadioGroupBasicDemo />,
    },
  ],
  usageImport: `import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";`,
  usageCode: `<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" id="r1" />
  <Label htmlFor="r1">Option A</Label>
</RadioGroup>`,
  composition: ["RadioGroup", "└── RadioGroupItem"],
  props: [
    {
      name: "value",
      type: "string",
      description: "Controlled selected value.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Uncontrolled default value.",
    },
    {
      name: "onValueChange",
      type: "function",
      description: "Called when selection changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables all items.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"vertical"',
      description: "Layout direction.",
    },
  ],
  accessibility: [
    "Radix manages ARIA radio roles and keyboard navigation",
    "Arrow keys move between options",
  ],
  basedOn: "radix",
  isNew: false,
};
