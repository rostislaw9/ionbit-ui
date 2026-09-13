import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { SwitchChoiceCardDemo } from "../../demos/switch-choice-card-demo";
import SwitchChoiceCardDemoSource from "../../demos/switch-choice-card-demo.tsx?highlighted";
import SwitchChoiceCardDemoRaw from "../../demos/switch-choice-card-demo.tsx?raw";
import { SwitchDemo } from "../../demos/switch-demo";
import SwitchDemoSource from "../../demos/switch-demo.tsx?highlighted";
import SwitchDemoRaw from "../../demos/switch-demo.tsx?raw";
import { SwitchDescriptionDemo } from "../../demos/switch-description-demo";
import SwitchDescriptionDemoSource from "../../demos/switch-description-demo.tsx?highlighted";
import SwitchDescriptionDemoRaw from "../../demos/switch-description-demo.tsx?raw";
import { SwitchDisabledDemo } from "../../demos/switch-disabled-demo";
import SwitchDisabledDemoSource from "../../demos/switch-disabled-demo.tsx?highlighted";
import SwitchDisabledDemoRaw from "../../demos/switch-disabled-demo.tsx?raw";
import { SwitchInvalidDemo } from "../../demos/switch-invalid-demo";
import SwitchInvalidDemoSource from "../../demos/switch-invalid-demo.tsx?highlighted";
import SwitchInvalidDemoRaw from "../../demos/switch-invalid-demo.tsx?raw";
import { SwitchSizesDemo } from "../../demos/switch-sizes-demo";
import SwitchSizesDemoSource from "../../demos/switch-sizes-demo.tsx?highlighted";
import SwitchSizesDemoRaw from "../../demos/switch-sizes-demo.tsx?raw";

export const switchMeta: ComponentMeta = {
  name: "switch",
  label: "Switch",
  description:
    "A control that allows the user to toggle between checked and not checked.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: (
        <>
          A simple switch with a <InlineCode>Label</InlineCode>.
        </>
      ),
      code: SwitchDemoSource,
      rawCode: SwitchDemoRaw,
      render: () => <SwitchDemo />,
    },
    {
      title: "Description",
      description: (
        <>
          Use <InlineCode>FieldContent</InlineCode> and{" "}
          <InlineCode>FieldDescription</InlineCode> for helper text.
        </>
      ),
      code: SwitchDescriptionDemoSource,
      rawCode: SwitchDescriptionDemoRaw,
      render: () => <SwitchDescriptionDemo />,
    },
    {
      title: "Choice Card",
      description: (
        <>
          Card-style selection where <InlineCode>FieldLabel</InlineCode> wraps
          the entire <InlineCode>Field</InlineCode> for a clickable card
          pattern.
        </>
      ),
      code: SwitchChoiceCardDemoSource,
      rawCode: SwitchChoiceCardDemoRaw,
      render: () => <SwitchChoiceCardDemo />,
    },
    {
      title: "Disabled",
      description: (
        <>
          Add the <InlineCode>disabled</InlineCode> prop to the{" "}
          <InlineCode>Switch</InlineCode> component to disable the switch. Add
          the <InlineCode>data-disabled</InlineCode> prop to the{" "}
          <InlineCode>Field</InlineCode> component for styling.
        </>
      ),
      code: SwitchDisabledDemoSource,
      rawCode: SwitchDisabledDemoRaw,
      render: () => <SwitchDisabledDemo />,
    },
    {
      title: "Invalid",
      description: (
        <>
          Add the <InlineCode>aria-invalid</InlineCode> prop to the{" "}
          <InlineCode>Switch</InlineCode> component to indicate an invalid
          state. Add the <InlineCode>data-invalid</InlineCode> prop to the{" "}
          <InlineCode>Field</InlineCode> component for styling.
        </>
      ),
      code: SwitchInvalidDemoSource,
      rawCode: SwitchInvalidDemoRaw,
      render: () => <SwitchInvalidDemo />,
    },
    {
      title: "Size",
      description: (
        <>
          Use the <InlineCode>size</InlineCode> prop to change the size of the
          switch.
        </>
      ),
      code: SwitchSizesDemoSource,
      rawCode: SwitchSizesDemoRaw,
      render: () => <SwitchSizesDemo />,
    },
  ],
  infoBlocks: [
    {
      title: "Checked State",
      description: (
        <p>
          Use <InlineCode>defaultChecked</InlineCode> for uncontrolled switches,
          or <InlineCode>checked</InlineCode> and
          <InlineCode>onCheckedChange</InlineCode> to control the state.
        </p>
      ),
      code: `import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Switch checked={checked} onCheckedChange={setChecked} />
}`,
    },
  ],
  usageImport: `import { Switch } from "@/components/ui/switch";`,
  usageCode: `<Switch />`,
  apiReference: {
    label: "Base UI Switch",
    url: "https://base-ui.com/react/components/switch#api-reference",
  },
  accessibility: [
    'role="switch" with aria-checked',
    "Keyboard toggle via Space",
    "Focus visible ring",
    "aria-invalid marks the control as invalid",
    "data-disabled on Field dims the label when disabled",
  ],
  basedOn: "base",
  isNew: false,
};
