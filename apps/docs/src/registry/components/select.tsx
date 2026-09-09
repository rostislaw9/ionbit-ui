import type { ComponentMeta } from "./types";

import { SelectBasicDemo } from "../../demos/select-basic-demo";
import SelectBasicDemoSource from "../../demos/select-basic-demo.tsx?highlighted";
import SelectBasicDemoRaw from "../../demos/select-basic-demo.tsx?raw";

export const selectMeta: ComponentMeta = {
  name: "select",
  label: "Select",
  description:
    "Select dropdown with keyboard navigation and animated open/close.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "Single-value select with placeholder.",
      code: SelectBasicDemoSource,
      rawCode: SelectBasicDemoRaw,
      render: () => <SelectBasicDemo />,
    },
  ],
  usageImport: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";`,
  usageCode: `<Select defaultValue="a">
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectLabel>Options</SelectLabel>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
    <SelectSeparator />
    <SelectItem value="c">Option C</SelectItem>
  </SelectContent>
</Select>`,
  composition: [
    "Select",
    "├── SelectTrigger",
    "│   └── SelectValue",
    "└── SelectContent",
    "    ├── SelectItem",
    "    ├── SelectLabel",
    "    └── SelectSeparator",
  ],
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
      description: "Called when the selected value changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Prevents interaction.",
    },
  ],
  accessibility: [
    'role="combobox" on trigger',
    "Arrow keys navigate items",
    "Type-ahead support",
    "Escape closes",
  ],
  basedOn: "radix",
  isNew: false,
};
