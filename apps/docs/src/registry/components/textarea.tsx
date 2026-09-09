import type { ComponentMeta } from "./types";

import { TextareaBasicDemo } from "../../demos/textarea-basic-demo";
import TextareaBasicDemoSource from "../../demos/textarea-basic-demo.tsx?highlighted";
import TextareaBasicDemoRaw from "../../demos/textarea-basic-demo.tsx?raw";
import { TextareaInvalidDemo } from "../../demos/textarea-invalid-demo";
import TextareaInvalidDemoSource from "../../demos/textarea-invalid-demo.tsx?highlighted";
import TextareaInvalidDemoRaw from "../../demos/textarea-invalid-demo.tsx?raw";

export const textareaMeta: ComponentMeta = {
  name: "textarea",
  label: "Textarea",
  description: "Multi-line text input. Same focus and invalid states as Input.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "Default and disabled states.",
      code: TextareaBasicDemoSource,
      rawCode: TextareaBasicDemoRaw,
      render: () => <TextareaBasicDemo />,
    },
    {
      title: "Invalid",
      description: "Error state with red border and error glow on focus.",
      code: TextareaInvalidDemoSource,
      rawCode: TextareaInvalidDemoRaw,
      render: () => <TextareaInvalidDemo />,
    },
  ],
  usageImport: `import { Textarea } from "@/components/ui/textarea";`,
  usageCode: `<Textarea placeholder="Enter message..." />`,
  props: [
    {
      name: "invalid",
      type: "boolean",
      default: "false",
      description: "Shows error styling and sets aria-invalid.",
    },
    {
      name: "...props",
      type: "TextareaHTMLAttributes",
      description: "All standard TextareaHTMLAttributes.",
    },
  ],
  accessibility: [
    "aria-invalid set when invalid prop is true",
    "Focus visible ring",
  ],
  isNew: false,
};
