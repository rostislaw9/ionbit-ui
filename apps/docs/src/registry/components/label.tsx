import type { ComponentMeta } from "./types";

import { LabelDefaultDemo } from "../../demos/label-default-demo";
import LabelDefaultDemoSource from "../../demos/label-default-demo.tsx?highlighted";
import LabelDefaultDemoRaw from "../../demos/label-default-demo.tsx?raw";
import { LabelDisabledDemo } from "../../demos/label-disabled-demo";
import LabelDisabledDemoSource from "../../demos/label-disabled-demo.tsx?highlighted";
import LabelDisabledDemoRaw from "../../demos/label-disabled-demo.tsx?raw";

export const labelMeta: ComponentMeta = {
  name: "label",
  label: "Label",
  description: "Form label with htmlFor association.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "A Label associated with an Input via htmlFor.",
      code: LabelDefaultDemoSource,
      rawCode: LabelDefaultDemoRaw,
      render: () => <LabelDefaultDemo />,
    },
    {
      title: "With Disabled",
      description: "Label dims when the peer control is disabled.",
      code: LabelDisabledDemoSource,
      rawCode: LabelDisabledDemoRaw,
      render: () => <LabelDisabledDemo />,
    },
  ],
  usageImport: `import { Label } from "@/components/ui/label";`,
  usageCode: `<Label htmlFor="email">Email</Label>`,
  props: [
    {
      name: "htmlFor",
      type: "string",
      description: "Associates the label with a form control.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Render as child element.",
    },
  ],
  accessibility: [
    "Clicking the label focuses the associated control via htmlFor.",
    "Applies disabled styling when the peer control is disabled.",
  ],
  basedOn: "radix",
  isNew: false,
};
