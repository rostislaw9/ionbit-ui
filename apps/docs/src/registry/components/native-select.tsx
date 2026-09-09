import type { ComponentMeta } from "./types";

import { NativeSelectDemo } from "../../demos/native-select-demo";
import NativeSelectDemoSource from "../../demos/native-select-demo.tsx?highlighted";
import NativeSelectDemoRaw from "../../demos/native-select-demo.tsx?raw";
import { NativeSelectStatesDemo } from "../../demos/native-select-states-demo";
import NativeSelectStatesDemoSource from "../../demos/native-select-states-demo.tsx?highlighted";
import NativeSelectStatesDemoRaw from "../../demos/native-select-states-demo.tsx?raw";

export const nativeSelectMeta: ComponentMeta = {
  name: "native-select",
  label: "Native Select",
  description: "Styled native HTML select with custom chevron.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "A native select with a disabled placeholder option.",
      code: NativeSelectDemoSource,
      rawCode: NativeSelectDemoRaw,
      render: () => <NativeSelectDemo />,
    },
    {
      title: "States",
      description: "Default, invalid, and disabled states with labels.",
      code: NativeSelectStatesDemoSource,
      rawCode: NativeSelectStatesDemoRaw,
      render: () => <NativeSelectStatesDemo />,
    },
  ],
  usageImport: `import { NativeSelect } from "@/components/ui/native-select";`,
  usageCode: `<NativeSelect defaultValue="apple">\n  <option value="apple">Apple</option>\n  <option value="banana">Banana</option>\n</NativeSelect>`,
  props: [
    {
      name: "invalid",
      type: "boolean",
      default: "false",
      description: "Sets aria-invalid and switches border to error color.",
    },
    {
      name: "defaultValue",
      type: "string",
      default: "—",
      description: "Uncontrolled default selected value.",
    },
    {
      name: "value",
      type: "string",
      default: "—",
      description: "Controlled selected value.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      default: "—",
      description: "Called when the selection changes.",
    },
  ],
  accessibility: [
    "Renders a native <select> — fully accessible by default.",
    "Associate a <Label htmlFor> or use aria-label for screen reader support.",
    "The invalid prop sets aria-invalid on the underlying select element.",
  ],
  isNew: false,
};
