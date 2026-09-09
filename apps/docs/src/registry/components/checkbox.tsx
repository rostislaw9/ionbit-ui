import type { ComponentMeta } from "./types";

import { CheckboxBasicDemo } from "../../demos/checkbox-basic-demo";
import CheckboxBasicDemoSource from "../../demos/checkbox-basic-demo.tsx?highlighted";
import CheckboxBasicDemoRaw from "../../demos/checkbox-basic-demo.tsx?raw";

export const checkboxMeta: ComponentMeta = {
  name: "checkbox",
  label: "Checkbox",
  description:
    "Checkbox with accent fill when checked and custom check indicator.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "Default, checked, and disabled states.",
      code: CheckboxBasicDemoSource,
      rawCode: CheckboxBasicDemoRaw,
      render: () => <CheckboxBasicDemo />,
    },
  ],
  usageImport: `import { Checkbox } from "@/components/ui/checkbox";`,
  usageCode: `<Checkbox defaultChecked />`,
  props: [
    {
      name: "checked",
      type: 'boolean | "indeterminate"',
      description: "Controlled checked state.",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      description: "Uncontrolled default checked state.",
    },
    {
      name: "onCheckedChange",
      type: "function",
      description: "Called when the checked state changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Prevents interaction.",
    },
  ],
  accessibility: [
    'role="checkbox" with aria-checked',
    "Keyboard toggle via Space",
    "Focus visible ring",
  ],
  basedOn: "radix",
  isNew: false,
};
