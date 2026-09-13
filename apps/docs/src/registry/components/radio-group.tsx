import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { RadioGroupChoiceCardDemo } from "../../demos/radio-group-choice-card-demo";
import RadioGroupChoiceCardDemoSource from "../../demos/radio-group-choice-card-demo.tsx?highlighted";
import RadioGroupChoiceCardDemoRaw from "../../demos/radio-group-choice-card-demo.tsx?raw";
import { RadioGroupDemo } from "../../demos/radio-group-demo";
import RadioGroupBasicDemoSource from "../../demos/radio-group-demo.tsx?highlighted";
import RadioGroupBasicDemoRaw from "../../demos/radio-group-demo.tsx?raw";
import { RadioGroupDescriptionDemo } from "../../demos/radio-group-description-demo";
import RadioGroupDescriptionDemoSource from "../../demos/radio-group-description-demo.tsx?highlighted";
import RadioGroupDescriptionDemoRaw from "../../demos/radio-group-description-demo.tsx?raw";
import { RadioGroupDisabledDemo } from "../../demos/radio-group-disabled-demo";
import RadioGroupDisabledDemoSource from "../../demos/radio-group-disabled-demo.tsx?highlighted";
import RadioGroupDisabledDemoRaw from "../../demos/radio-group-disabled-demo.tsx?raw";
import { RadioGroupFieldsetDemo } from "../../demos/radio-group-fieldset-demo";
import RadioGroupFieldsetDemoSource from "../../demos/radio-group-fieldset-demo.tsx?highlighted";
import RadioGroupFieldsetDemoRaw from "../../demos/radio-group-fieldset-demo.tsx?raw";
import { RadioGroupInvalidDemo } from "../../demos/radio-group-invalid-demo";
import RadioGroupInvalidDemoSource from "../../demos/radio-group-invalid-demo.tsx?highlighted";
import RadioGroupInvalidDemoRaw from "../../demos/radio-group-invalid-demo.tsx?raw";

export const radioGroupMeta: ComponentMeta = {
  name: "radio-group",
  label: "Radio Group",
  description:
    "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "A radio group with payment method options.",
      code: RadioGroupBasicDemoSource,
      rawCode: RadioGroupBasicDemoRaw,
      render: () => <RadioGroupDemo />,
    },
    {
      title: "Description",
      description: (
        <>
          Radio group items with a description using the{" "}
          <InlineCode>Field</InlineCode> component.
        </>
      ),
      code: RadioGroupDescriptionDemoSource,
      rawCode: RadioGroupDescriptionDemoRaw,
      render: () => <RadioGroupDescriptionDemo />,
    },
    {
      title: "Choice Card",
      description: (
        <>
          Use <InlineCode>FieldLabel</InlineCode> to wrap the entire{" "}
          <InlineCode>Field</InlineCode> for a clickable card-style selection.
        </>
      ),
      code: RadioGroupChoiceCardDemoSource,
      rawCode: RadioGroupChoiceCardDemoRaw,
      render: () => <RadioGroupChoiceCardDemo />,
    },
    {
      title: "Fieldset",
      description: (
        <>
          Use <InlineCode>FieldSet</InlineCode> and{" "}
          <InlineCode>FieldLegend</InlineCode> to group radio items with a label
          and description.
        </>
      ),
      code: RadioGroupFieldsetDemoSource,
      rawCode: RadioGroupFieldsetDemoRaw,
      render: () => <RadioGroupFieldsetDemo />,
    },
    {
      title: "Disabled",
      description: (
        <>
          Use the <InlineCode>disabled</InlineCode> prop on{" "}
          <InlineCode>RadioGroup</InlineCode> to disable all items.
        </>
      ),
      code: RadioGroupDisabledDemoSource,
      rawCode: RadioGroupDisabledDemoRaw,
      render: () => <RadioGroupDisabledDemo />,
    },
    {
      title: "Invalid",
      description: (
        <>
          Use <InlineCode>aria-invalid</InlineCode> on{" "}
          <InlineCode>RadioGroupItem</InlineCode> and{" "}
          <InlineCode>data-invalid</InlineCode> on{" "}
          <InlineCode>Field</InlineCode> to show validation errors.
        </>
      ),
      code: RadioGroupInvalidDemoSource,
      rawCode: RadioGroupInvalidDemoRaw,
      render: () => <RadioGroupInvalidDemo />,
    },
  ],
  usageImport: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
  usageCode: `<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`,
  composition: ["RadioGroup", "├── RadioGroupItem", "└── RadioGroupItem"],
  apiReference: {
    label: "Base UI Radio",
    url: "https://base-ui.com/react/components/radio#api-reference",
  },
  accessibility: [
    "Base UI manages ARIA radio roles and keyboard navigation",
    "Arrow keys move between options",
    "RadioGroup sets role=radiogroup, items set role=radio",
  ],
  basedOn: "base",
  isNew: false,
};
