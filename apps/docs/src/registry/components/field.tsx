import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { FieldCheckboxDemo } from "../../demos/field-checkbox-demo";
import FieldCheckboxDemoSource from "../../demos/field-checkbox-demo.tsx?highlighted";
import FieldCheckboxDemoRaw from "../../demos/field-checkbox-demo.tsx?raw";
import { FieldChoiceCardDemo } from "../../demos/field-choice-card-demo";
import FieldChoiceCardDemoSource from "../../demos/field-choice-card-demo.tsx?highlighted";
import FieldChoiceCardDemoRaw from "../../demos/field-choice-card-demo.tsx?raw";
import { FieldDemo } from "../../demos/field-demo";
import FieldDemoSource from "../../demos/field-demo.tsx?highlighted";
import FieldDemoRaw from "../../demos/field-demo.tsx?raw";
import { FieldFieldsetDemo } from "../../demos/field-fieldset-demo";
import FieldFieldsetDemoSource from "../../demos/field-fieldset-demo.tsx?highlighted";
import FieldFieldsetDemoRaw from "../../demos/field-fieldset-demo.tsx?raw";
import { FieldGroupDemo } from "../../demos/field-group-demo";
import FieldGroupDemoSource from "../../demos/field-group-demo.tsx?highlighted";
import FieldGroupDemoRaw from "../../demos/field-group-demo.tsx?raw";
import { FieldInputDemo } from "../../demos/field-input-demo";
import FieldInputDemoSource from "../../demos/field-input-demo.tsx?highlighted";
import FieldInputDemoRaw from "../../demos/field-input-demo.tsx?raw";
import { FieldRadioDemo } from "../../demos/field-radio-demo";
import FieldRadioDemoSource from "../../demos/field-radio-demo.tsx?highlighted";
import FieldRadioDemoRaw from "../../demos/field-radio-demo.tsx?raw";
import { FieldSelectDemo } from "../../demos/field-select-demo";
import FieldSelectDemoSource from "../../demos/field-select-demo.tsx?highlighted";
import FieldSelectDemoRaw from "../../demos/field-select-demo.tsx?raw";
import { FieldSliderDemo } from "../../demos/field-slider-demo";
import FieldSliderDemoSource from "../../demos/field-slider-demo.tsx?highlighted";
import FieldSliderDemoRaw from "../../demos/field-slider-demo.tsx?raw";
import { FieldSwitchDemo } from "../../demos/field-switch-demo";
import FieldSwitchDemoSource from "../../demos/field-switch-demo.tsx?highlighted";
import FieldSwitchDemoRaw from "../../demos/field-switch-demo.tsx?raw";
import { FieldTextareaDemo } from "../../demos/field-textarea-demo";
import FieldTextareaDemoSource from "../../demos/field-textarea-demo.tsx?highlighted";
import FieldTextareaDemoRaw from "../../demos/field-textarea-demo.tsx?raw";

export const fieldMeta: ComponentMeta = {
  name: "field",
  label: "Field",
  description:
    "Combine labels, controls, and help text to compose accessible form fields and grouped inputs.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description:
        "A payment form combining FieldSet, FieldGroup, Field, Input, Select, Checkbox, and Textarea.",
      code: FieldDemoSource,
      rawCode: FieldDemoRaw,
      render: () => <FieldDemo />,
    },
    {
      title: "Input",
      description: (
        <>
          Use <InlineCode>Field</InlineCode> with <InlineCode>Input</InlineCode>{" "}
          and <InlineCode>FieldDescription</InlineCode> for helper text.
        </>
      ),
      code: FieldInputDemoSource,
      rawCode: FieldInputDemoRaw,
      render: () => <FieldInputDemo />,
    },
    {
      title: "Textarea",
      description: (
        <>
          Use <InlineCode>Field</InlineCode> with{" "}
          <InlineCode>Textarea</InlineCode> for multi-line input.
        </>
      ),
      code: FieldTextareaDemoSource,
      rawCode: FieldTextareaDemoRaw,
      render: () => <FieldTextareaDemo />,
    },
    {
      title: "Select",
      description: (
        <>
          Use <InlineCode>Field</InlineCode> with{" "}
          <InlineCode>Select</InlineCode> for dropdown selection.
        </>
      ),
      code: FieldSelectDemoSource,
      rawCode: FieldSelectDemoRaw,
      render: () => <FieldSelectDemo />,
    },
    {
      title: "Slider",
      description: (
        <>
          Use <InlineCode>Field</InlineCode> with{" "}
          <InlineCode>Slider</InlineCode> and{" "}
          <InlineCode>FieldTitle</InlineCode> for range input.
        </>
      ),
      code: FieldSliderDemoSource,
      rawCode: FieldSliderDemoRaw,
      render: () => <FieldSliderDemo />,
    },
    {
      title: "Fieldset",
      description: (
        <>
          Use <InlineCode>FieldSet</InlineCode> and{" "}
          <InlineCode>FieldLegend</InlineCode> to semantically group related
          fields.
        </>
      ),
      code: FieldFieldsetDemoSource,
      rawCode: FieldFieldsetDemoRaw,
      render: () => <FieldFieldsetDemo />,
    },
    {
      title: "Checkbox",
      description: (
        <>
          Use <InlineCode>Field</InlineCode> with{" "}
          <InlineCode>Checkbox</InlineCode> in horizontal orientation for
          checkbox lists.
        </>
      ),
      code: FieldCheckboxDemoSource,
      rawCode: FieldCheckboxDemoRaw,
      render: () => <FieldCheckboxDemo />,
    },
    {
      title: "Radio",
      description: (
        <>
          Use <InlineCode>FieldSet</InlineCode> with{" "}
          <InlineCode>RadioGroup</InlineCode> for single-choice lists.
        </>
      ),
      code: FieldRadioDemoSource,
      rawCode: FieldRadioDemoRaw,
      render: () => <FieldRadioDemo />,
    },
    {
      title: "Switch",
      description: (
        <>
          Use <InlineCode>Field</InlineCode> with{" "}
          <InlineCode>Switch</InlineCode> in horizontal orientation for toggle
          controls.
        </>
      ),
      code: FieldSwitchDemoSource,
      rawCode: FieldSwitchDemoRaw,
      render: () => <FieldSwitchDemo />,
    },
    {
      title: "Choice Card",
      description: (
        <>
          Card-style selection where <InlineCode>FieldLabel</InlineCode> wraps
          the entire <InlineCode>Field</InlineCode> for a clickable card pattern
          with <InlineCode>RadioGroup</InlineCode>.
        </>
      ),
      code: FieldChoiceCardDemoSource,
      rawCode: FieldChoiceCardDemoRaw,
      render: () => <FieldChoiceCardDemo />,
    },
    {
      title: "Field Group",
      description: (
        <>
          Stack <InlineCode>Field</InlineCode> components with{" "}
          <InlineCode>FieldGroup</InlineCode>. Add{" "}
          <InlineCode>FieldSeparator</InlineCode> to divide them.
        </>
      ),
      code: FieldGroupDemoSource,
      rawCode: FieldGroupDemoRaw,
      render: () => <FieldGroupDemo />,
    },
  ],
  usageImport: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";`,
  usageCode: `<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>`,
  infoBlocks: [
    {
      title: "Anatomy",
      description: (
        <p>
          The <InlineCode>Field</InlineCode> family is designed for composing
          accessible forms. A typical field is structured as follows:
        </p>
      ),
      code: `<Field>
  <FieldLabel htmlFor="input-id">Label</FieldLabel>
  {/* Input, Select, Switch, etc. */}
  <FieldDescription>Optional helper text.</FieldDescription>
  <FieldError>Validation message.</FieldError>
</Field>`,
      after: (
        <ul className="list-disc gap-1 ps-5">
          <li>
            <InlineCode>Field</InlineCode> is the core wrapper for a single
            field.
          </li>
          <li>
            <InlineCode>FieldContent</InlineCode> is a flex column that groups
            label and description. Not required if you have no description.
          </li>
          <li>
            Wrap related fields with <InlineCode>FieldGroup</InlineCode>, and
            use <InlineCode>FieldSet</InlineCode> with{" "}
            <InlineCode>FieldLegend</InlineCode> for semantic grouping.
          </li>
        </ul>
      ),
    },
    {
      title: "Validation and Errors",
      description: (
        <ul className="list-disc gap-1 ps-5">
          <li>
            Add <InlineCode>data-invalid</InlineCode> to{" "}
            <InlineCode>Field</InlineCode> to switch the entire block into an
            error state.
          </li>
          <li>
            Add <InlineCode>aria-invalid</InlineCode> on the input itself for
            assistive technologies.
          </li>
          <li>
            Render <InlineCode>FieldError</InlineCode> immediately after the
            control or inside <InlineCode>FieldContent</InlineCode> to keep
            error messages aligned with the field.
          </li>
        </ul>
      ),
      code: `<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>`,
    },
  ],
  composition: [
    {
      heading: "Field",
      description: "A single control with label, helper text, and validation.",
      tree: [
        "Field",
        "├── FieldLabel",
        "├── Input / Textarea / Switch / Select",
        "├── FieldDescription",
        "└── FieldError",
      ],
    },
    {
      heading: "FieldGroup",
      description: (
        <>
          Related fields in one group. Use{" "}
          <InlineCode>FieldSeparator</InlineCode> between sections when needed.
        </>
      ),
      tree: [
        "FieldGroup",
        "├── Field",
        "│   ├── FieldLabel",
        "│   ├── Input / Textarea / Switch / Select",
        "│   ├── FieldDescription",
        "│   └── FieldError",
        "├── FieldSeparator",
        "└── Field",
        "    ├── FieldLabel",
        "    └── Input / Textarea / Switch / Select",
      ],
    },
    {
      heading: "FieldSet",
      description: (
        <>
          Semantic grouping with a legend and description, usually containing a{" "}
          <InlineCode>FieldGroup</InlineCode>.
        </>
      ),
      tree: [
        "FieldSet",
        "├── FieldLegend",
        "├── FieldDescription",
        "└── FieldGroup",
        "    ├── Field",
        "    │   ├── FieldLabel",
        "    │   ├── Input / Textarea / Switch / Select",
        "    │   ├── FieldDescription",
        "    │   └── FieldError",
        "    └── Field",
        "        ├── FieldLabel",
        "        └── Input / Textarea / Switch / Select",
      ],
    },
  ],
  primitives: [
    {
      name: "FieldSet",
      description:
        "Container that renders a semantic fieldset with spacing presets.",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldSet>
  <FieldLegend>Delivery</FieldLegend>
  <FieldGroup>{/* Fields */}</FieldGroup>
</FieldSet>`,
    },
    {
      name: "FieldLegend",
      description:
        "Legend element for a FieldSet. Switch to the label variant to align with label sizing.",
      props: [
        {
          name: "variant",
          type: '"legend" | "label"',
          default: '"legend"',
          description: "Size variant for nested fieldsets.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldLegend variant="label">Notification Preferences</FieldLegend>`,
      after: (
        <p>
          The <InlineCode>FieldLegend</InlineCode> has two variants:{" "}
          <InlineCode>legend</InlineCode> and <InlineCode>label</InlineCode>.
          The <InlineCode>label</InlineCode> variant applies label sizing and
          alignment. Handy if you have nested <InlineCode>FieldSet</InlineCode>.
        </p>
      ),
    },
    {
      name: "FieldGroup",
      description:
        "Layout wrapper that stacks Field components and enables container queries for responsive orientations.",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldGroup className="@container/field-group flex flex-col gap-6">
  <Field>{/* ... */}</Field>
  <Field>{/* ... */}</Field>
</FieldGroup>`,
    },
    {
      name: "Field",
      description:
        "The core wrapper for a single field. Provides orientation control, invalid state styling, and spacing.",
      props: [
        {
          name: "orientation",
          type: '"vertical" | "horizontal" | "responsive"',
          default: '"vertical"',
          description:
            "Layout direction. 'responsive' switches at the @md/field-group container breakpoint.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
        {
          name: "data-invalid",
          type: "boolean",
          default: "—",
          description: "Marks the field as invalid (styles all children).",
        },
      ],
      code: `<Field orientation="horizontal">
  <FieldLabel htmlFor="remember">Remember me</FieldLabel>
  <Switch id="remember" />
</Field>`,
    },
    {
      name: "FieldContent",
      description:
        "Flex column that groups control and descriptions when the label sits beside the control. Not required if you have no description.",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<Field>
  <Checkbox id="notifications" />
  <FieldContent>
    <FieldLabel htmlFor="notifications">Notifications</FieldLabel>
    <FieldDescription>Email, SMS, and push options.</FieldDescription>
  </FieldContent>
</Field>`,
    },
    {
      name: "FieldLabel",
      description:
        "Label styled for both direct inputs and nested Field children.",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldLabel htmlFor="email">Email</FieldLabel>`,
    },
    {
      name: "FieldTitle",
      description: "Renders a title with label styling inside FieldContent.",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldContent>
  <FieldTitle>Enable Touch ID</FieldTitle>
  <FieldDescription>Unlock your device faster.</FieldDescription>
</FieldContent>`,
    },
    {
      name: "FieldDescription",
      description:
        "Helper text slot that automatically balances long lines in horizontal layouts.",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldDescription>We never share your email with anyone.</FieldDescription>`,
    },
    {
      name: "FieldSeparator",
      description:
        "Visual divider to separate sections inside a FieldGroup. Accepts optional inline content.",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldSeparator>Or continue with</FieldSeparator>`,
    },
    {
      name: "FieldError",
      description:
        "Accessible error container that accepts children or an errors array (e.g. from react-hook-form).",
      props: [
        {
          name: "errors",
          type: "Array<{ message?: string } | undefined>",
          default: "—",
          description:
            "Array of error objects. Renders a single message or a list.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Additional class names.",
        },
      ],
      code: `<FieldError errors={errors.username} />`,
      after: (
        <>
          <p>
            When the <InlineCode>errors</InlineCode> array contains multiple
            messages, the component renders a list automatically.
          </p>
          <p>
            <InlineCode>FieldError</InlineCode> also accepts issues produced by
            any validator that implements{" "}
            <a
              href="https://standardschema.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Standard Schema
            </a>
            , including Zod, Valibot, and ArkType. Pass the{" "}
            <InlineCode>issues</InlineCode> array from the schema result
            directly to render a unified error list across libraries.
          </p>
        </>
      ),
    },
  ],
  accessibility: [
    "FieldSet and FieldLegend keep related controls grouped for keyboard and assistive tech users.",
    'Field sets role="group" so nested controls inherit labeling from FieldLabel and FieldLegend when combined.',
    "Apply FieldSeparator sparingly to ensure screen readers encounter clear section boundaries.",
    "Add data-invalid to Field to mark the entire block as invalid.",
    'FieldError uses role="alert" for screen reader announcements.',
  ],
  isNew: true,
};
