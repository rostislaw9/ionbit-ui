import type { ComponentMeta } from "./types";

import { InputGroupBlockEndDemo } from "../../demos/input-group-block-end-demo";
import InputGroupBlockEndDemoSource from "../../demos/input-group-block-end-demo.tsx?highlighted";
import InputGroupBlockEndDemoRaw from "../../demos/input-group-block-end-demo.tsx?raw";
import { InputGroupBlockStartDemo } from "../../demos/input-group-block-start-demo";
import InputGroupBlockStartDemoSource from "../../demos/input-group-block-start-demo.tsx?highlighted";
import InputGroupBlockStartDemoRaw from "../../demos/input-group-block-start-demo.tsx?raw";
import { InputGroupButtonDemo } from "../../demos/input-group-button-demo";
import InputGroupButtonDemoSource from "../../demos/input-group-button-demo.tsx?highlighted";
import InputGroupButtonDemoRaw from "../../demos/input-group-button-demo.tsx?raw";
import { InputGroupDemo } from "../../demos/input-group-demo";
import InputGroupDemoSource from "../../demos/input-group-demo.tsx?highlighted";
import InputGroupDemoRaw from "../../demos/input-group-demo.tsx?raw";
import { InputGroupDropdownDemo } from "../../demos/input-group-dropdown-demo";
import InputGroupDropdownDemoSource from "../../demos/input-group-dropdown-demo.tsx?highlighted";
import InputGroupDropdownDemoRaw from "../../demos/input-group-dropdown-demo.tsx?raw";
import { InputGroupIconDemo } from "../../demos/input-group-icon-demo";
import InputGroupIconDemoSource from "../../demos/input-group-icon-demo.tsx?highlighted";
import InputGroupIconDemoRaw from "../../demos/input-group-icon-demo.tsx?raw";
import { InputGroupInlineEndDemo } from "../../demos/input-group-inline-end-demo";
import InputGroupInlineEndDemoSource from "../../demos/input-group-inline-end-demo.tsx?highlighted";
import InputGroupInlineEndDemoRaw from "../../demos/input-group-inline-end-demo.tsx?raw";
import { InputGroupInlineStartDemo } from "../../demos/input-group-inline-start-demo";
import InputGroupInlineStartDemoSource from "../../demos/input-group-inline-start-demo.tsx?highlighted";
import InputGroupInlineStartDemoRaw from "../../demos/input-group-inline-start-demo.tsx?raw";
import { InputGroupSpinnerDemo } from "../../demos/input-group-spinner-demo";
import InputGroupSpinnerDemoSource from "../../demos/input-group-spinner-demo.tsx?highlighted";
import InputGroupSpinnerDemoRaw from "../../demos/input-group-spinner-demo.tsx?raw";
import { InputGroupTextDemo } from "../../demos/input-group-text-demo";
import InputGroupTextDemoSource from "../../demos/input-group-text-demo.tsx?highlighted";
import InputGroupTextDemoRaw from "../../demos/input-group-text-demo.tsx?raw";
import { InputGroupTextareaDemo } from "../../demos/input-group-textarea-demo";
import InputGroupTextareaDemoSource from "../../demos/input-group-textarea-demo.tsx?highlighted";
import InputGroupTextareaDemoRaw from "../../demos/input-group-textarea-demo.tsx?raw";

export const inputGroupMeta: ComponentMeta = {
  name: "input-group",
  label: "Input Group",
  description:
    "Groups an input with leading or trailing addons, buttons, and text.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "An input with a leading icon and trailing text addon.",
      code: InputGroupDemoSource,
      rawCode: InputGroupDemoRaw,
      render: () => <InputGroupDemo />,
    },
    {
      title: "Inline Start",
      description:
        "Use align='inline-start' to position the addon at the start.",
      code: InputGroupInlineStartDemoSource,
      rawCode: InputGroupInlineStartDemoRaw,
      render: () => <InputGroupInlineStartDemo />,
    },
    {
      title: "Inline End",
      description: "Use align='inline-end' to position the addon at the end.",
      code: InputGroupInlineEndDemoSource,
      rawCode: InputGroupInlineEndDemoRaw,
      render: () => <InputGroupInlineEndDemo />,
    },
    {
      title: "Block Start",
      description:
        "Use align='block-start' to position the addon above the input.",
      code: InputGroupBlockStartDemoSource,
      rawCode: InputGroupBlockStartDemoRaw,
      render: () => <InputGroupBlockStartDemo />,
    },
    {
      title: "Block End",
      description:
        "Use align='block-end' to position the addon below the input.",
      code: InputGroupBlockEndDemoSource,
      rawCode: InputGroupBlockEndDemoRaw,
      render: () => <InputGroupBlockEndDemo />,
    },
    {
      title: "Icon",
      description:
        "Leading and trailing icon addons for common input patterns.",
      code: InputGroupIconDemoSource,
      rawCode: InputGroupIconDemoRaw,
      render: () => <InputGroupIconDemo />,
    },
    {
      title: "Text",
      description:
        "Prefix and suffix text addons for units, currency, and URLs.",
      code: InputGroupTextDemoSource,
      rawCode: InputGroupTextDemoRaw,
      render: () => <InputGroupTextDemo />,
    },
    {
      title: "Button",
      description:
        "Trailing button addons for copy, favorite, and search actions.",
      code: InputGroupButtonDemoSource,
      rawCode: InputGroupButtonDemoRaw,
      render: () => <InputGroupButtonDemo />,
    },
    {
      title: "Dropdown",
      description: "A dropdown menu addon for secondary actions.",
      code: InputGroupDropdownDemoSource,
      rawCode: InputGroupDropdownDemoRaw,
      render: () => <InputGroupDropdownDemo />,
    },
    {
      title: "Spinner",
      description: "Loading state with a spinner addon.",
      code: InputGroupSpinnerDemoSource,
      rawCode: InputGroupSpinnerDemoRaw,
      render: () => <InputGroupSpinnerDemo />,
    },
    {
      title: "Textarea",
      description:
        "Block-start and block-end addons with a code editor textarea.",
      code: InputGroupTextareaDemoSource,
      rawCode: InputGroupTextareaDemoRaw,
      render: () => <InputGroupTextareaDemo />,
    },
  ],
  usageImport: `import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";`,
  usageCode: `<InputGroup>\n  <InputGroupInput placeholder="Search..." />\n  <InputGroupAddon>\n    <Search />\n  </InputGroupAddon>\n</InputGroup>`,
  props: [
    {
      name: "className",
      type: "string",
      default: "—",
      description: "Additional classes for the group container.",
    },
    {
      name: "InputGroupAddon.align",
      type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
      default: '"inline-start"',
      description:
        "Position of the addon. Block alignments switch the group to a vertical layout automatically.",
    },
    {
      name: "InputGroupButton.variant",
      type: "ButtonVariant",
      default: '"ghost"',
      description: "Visual style of the button inside an addon.",
    },
    {
      name: "InputGroupButton.size",
      type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
      default: '"xs"',
      description: "Size of the button inside an addon.",
    },
    {
      name: "InputGroupInput.placeholder",
      type: "string",
      default: "—",
      description: "Placeholder text for the input field.",
    },
    {
      name: "InputGroupTextarea.placeholder",
      type: "string",
      default: "—",
      description: "Placeholder text for the textarea field.",
    },
  ],
  accessibility: [
    'Sets role="group" on the container and on each addon.',
    "Use aria-label or aria-labelledby to label the group.",
    "Focus and invalid states are detected via data-slot on the inner input.",
    "Clicking an addon focuses the inner input, unless a button was clicked.",
    "InputGroupSeparator is marked aria-hidden as it is decorative.",
  ],
  isNew: false,
};
