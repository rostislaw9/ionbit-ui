import type { ComponentMeta } from "./types";

import { InputBasicDemo } from "../../demos/input-basic-demo";
import InputBasicDemoSource from "../../demos/input-basic-demo.tsx?highlighted";
import InputBasicDemoRaw from "../../demos/input-basic-demo.tsx?raw";
import { InputInvalidDemo } from "../../demos/input-invalid-demo";
import InputInvalidDemoSource from "../../demos/input-invalid-demo.tsx?highlighted";
import InputInvalidDemoRaw from "../../demos/input-invalid-demo.tsx?raw";

export const inputMeta: ComponentMeta = {
  name: "input",
  label: "Input",
  description:
    "Text input with semantic tokens. Focus uses accent ring + glow. Invalid state switches to error.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "Default, with placeholder, and disabled.",
      code: InputBasicDemoSource,
      rawCode: InputBasicDemoRaw,
      render: () => <InputBasicDemo />,
    },
    {
      title: "Invalid",
      description: "Error state with red border and error glow on focus.",
      code: InputInvalidDemoSource,
      rawCode: InputInvalidDemoRaw,
      render: () => <InputInvalidDemo />,
    },
  ],
  usageImport: `import { Input } from "@/components/ui/input";`,
  usageCode: `<Input placeholder="Enter text..." />`,
  props: [
    {
      name: "invalid",
      type: "boolean",
      default: "false",
      description: "Shows error styling and sets aria-invalid.",
    },
    {
      name: "type",
      type: "string",
      default: '"text"',
      description: "Input type attribute.",
    },
    {
      name: "...props",
      type: "InputHTMLAttributes",
      description: "All standard InputHTMLAttributes.",
    },
  ],
  accessibility: [
    "aria-invalid set when invalid prop is true",
    "Focus visible ring via shadow-focus",
    "Placeholder uses foreground-subtle for sufficient contrast",
  ],
  isNew: false,
};
