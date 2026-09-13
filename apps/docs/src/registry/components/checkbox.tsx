import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { CheckboxBasicDemo } from "../../demos/checkbox-basic-demo";
import CheckboxBasicDemoSource from "../../demos/checkbox-basic-demo.tsx?highlighted";
import CheckboxBasicDemoRaw from "../../demos/checkbox-basic-demo.tsx?raw";
import { CheckboxDemo } from "../../demos/checkbox-demo";
import CheckboxDemoSource from "../../demos/checkbox-demo.tsx?highlighted";
import CheckboxDemoRaw from "../../demos/checkbox-demo.tsx?raw";
import { CheckboxDescriptionDemo } from "../../demos/checkbox-description-demo";
import CheckboxDescriptionDemoSource from "../../demos/checkbox-description-demo.tsx?highlighted";
import CheckboxDescriptionDemoRaw from "../../demos/checkbox-description-demo.tsx?raw";
import { CheckboxDisabledDemo } from "../../demos/checkbox-disabled-demo";
import CheckboxDisabledDemoSource from "../../demos/checkbox-disabled-demo.tsx?highlighted";
import CheckboxDisabledDemoRaw from "../../demos/checkbox-disabled-demo.tsx?raw";
import { CheckboxGroupDemo } from "../../demos/checkbox-group-demo";
import CheckboxGroupDemoSource from "../../demos/checkbox-group-demo.tsx?highlighted";
import CheckboxGroupDemoRaw from "../../demos/checkbox-group-demo.tsx?raw";
import { CheckboxInvalidDemo } from "../../demos/checkbox-invalid-demo";
import CheckboxInvalidDemoSource from "../../demos/checkbox-invalid-demo.tsx?highlighted";
import CheckboxInvalidDemoRaw from "../../demos/checkbox-invalid-demo.tsx?raw";
import { CheckboxTableDemo } from "../../demos/checkbox-table-demo";
import CheckboxTableDemoSource from "../../demos/checkbox-table-demo.tsx?highlighted";
import CheckboxTableDemoRaw from "../../demos/checkbox-table-demo.tsx?raw";

export const checkboxMeta: ComponentMeta = {
  name: "checkbox",
  label: "Checkbox",
  description:
    "A control that allows the user to toggle between checked and not checked.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: (
        <>
          Checkbox with <InlineCode>Field</InlineCode> and{" "}
          <InlineCode>Label</InlineCode> components for accessible form
          composition.
        </>
      ),
      code: CheckboxDemoSource,
      rawCode: CheckboxDemoRaw,
      render: () => <CheckboxDemo />,
    },
    {
      title: "Invalid",
      description: (
        <>
          Set <InlineCode>aria-invalid</InlineCode> on the checkbox and{" "}
          <InlineCode>data-invalid</InlineCode> on the field wrapper to show the
          invalid styles.
        </>
      ),
      code: CheckboxInvalidDemoSource,
      rawCode: CheckboxInvalidDemoRaw,
      render: () => <CheckboxInvalidDemo />,
    },
    {
      title: "Basic",
      description: (
        <>
          Pair the checkbox with <InlineCode>Field</InlineCode> and{" "}
          <InlineCode>FieldLabel</InlineCode> for proper layout and labeling.
        </>
      ),
      code: CheckboxBasicDemoSource,
      rawCode: CheckboxBasicDemoRaw,
      render: () => <CheckboxBasicDemo />,
    },
    {
      title: "Description",
      description: (
        <>
          Use <InlineCode>FieldContent</InlineCode> and{" "}
          <InlineCode>FieldDescription</InlineCode> for helper text.
        </>
      ),
      code: CheckboxDescriptionDemoSource,
      rawCode: CheckboxDescriptionDemoRaw,
      render: () => <CheckboxDescriptionDemo />,
    },
    {
      title: "Disabled",
      description: (
        <>
          Use the <InlineCode>disabled</InlineCode> prop to prevent interaction
          and add <InlineCode>data-disabled</InlineCode> to{" "}
          <InlineCode>Field</InlineCode> for disabled styles.
        </>
      ),
      code: CheckboxDisabledDemoSource,
      rawCode: CheckboxDisabledDemoRaw,
      render: () => <CheckboxDisabledDemo />,
    },
    {
      title: "Group",
      description: "Use multiple fields to create a checkbox list.",
      code: CheckboxGroupDemoSource,
      rawCode: CheckboxGroupDemoRaw,
      render: () => <CheckboxGroupDemo />,
    },
    {
      title: "Table",
      description: (
        <>
          Checkbox with select-all in a data <InlineCode>Table</InlineCode>
        </>
      ),
      code: CheckboxTableDemoSource,
      rawCode: CheckboxTableDemoRaw,
      render: () => <CheckboxTableDemo />,
    },
  ],
  infoBlocks: [
    {
      title: "Checked State",
      description: (
        <p>
          Use <InlineCode>defaultChecked</InlineCode> for uncontrolled
          checkboxes, or <InlineCode>checked</InlineCode> and
          <InlineCode>onCheckedChange</InlineCode> to control the state.
        </p>
      ),
      code: `import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}`,
    },
  ],
  usageImport: `import { Checkbox } from "@/components/ui/checkbox";`,
  usageCode: `<Checkbox />`,
  apiReference: {
    label: "Base UI Checkbox",
    url: "https://base-ui.com/react/components/checkbox#api-reference",
  },
  accessibility: [
    'role="checkbox" with aria-checked',
    "Keyboard toggle via Space",
    "Focus visible ring",
    "aria-invalid marks the control as invalid",
    "data-disabled on Field dims the label when disabled",
  ],
  basedOn: "base",
  isNew: false,
};
