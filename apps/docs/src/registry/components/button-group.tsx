import type { ComponentMeta } from "./types";

import { ButtonGroupDemo } from "../../demos/button-group-demo";
import ButtonGroupDemoSource from "../../demos/button-group-demo.tsx?highlighted";
import ButtonGroupDemoRaw from "../../demos/button-group-demo.tsx?raw";
import { ButtonGroupDropdownDemo } from "../../demos/button-group-dropdown-demo";
import ButtonGroupDropdownDemoSource from "../../demos/button-group-dropdown-demo.tsx?highlighted";
import ButtonGroupDropdownDemoRaw from "../../demos/button-group-dropdown-demo.tsx?raw";
import { ButtonGroupInputDemo } from "../../demos/button-group-input-demo";
import ButtonGroupInputDemoSource from "../../demos/button-group-input-demo.tsx?highlighted";
import ButtonGroupInputDemoRaw from "../../demos/button-group-input-demo.tsx?raw";
import { ButtonGroupInputGroupDemo } from "../../demos/button-group-input-group-demo";
import ButtonGroupInputGroupDemoSource from "../../demos/button-group-input-group-demo.tsx?highlighted";
import ButtonGroupInputGroupDemoRaw from "../../demos/button-group-input-group-demo.tsx?raw";
import { ButtonGroupNestedDemo } from "../../demos/button-group-nested-demo";
import ButtonGroupNestedDemoSource from "../../demos/button-group-nested-demo.tsx?highlighted";
import ButtonGroupNestedDemoRaw from "../../demos/button-group-nested-demo.tsx?raw";
import { ButtonGroupOrientationDemo } from "../../demos/button-group-orientation-demo";
import ButtonGroupOrientationDemoSource from "../../demos/button-group-orientation-demo.tsx?highlighted";
import ButtonGroupOrientationDemoRaw from "../../demos/button-group-orientation-demo.tsx?raw";
import { ButtonGroupPopoverDemo } from "../../demos/button-group-popover-demo";
import ButtonGroupPopoverDemoSource from "../../demos/button-group-popover-demo.tsx?highlighted";
import ButtonGroupPopoverDemoRaw from "../../demos/button-group-popover-demo.tsx?raw";
import { ButtonGroupSelectDemo } from "../../demos/button-group-select-demo";
import ButtonGroupSelectDemoSource from "../../demos/button-group-select-demo.tsx?highlighted";
import ButtonGroupSelectDemoRaw from "../../demos/button-group-select-demo.tsx?raw";
import { ButtonGroupSeparatorDemo } from "../../demos/button-group-separator-demo";
import ButtonGroupSeparatorDemoSource from "../../demos/button-group-separator-demo.tsx?highlighted";
import ButtonGroupSeparatorDemoRaw from "../../demos/button-group-separator-demo.tsx?raw";
import { ButtonGroupSizesDemo } from "../../demos/button-group-sizes-demo";
import ButtonGroupSizesDemoSource from "../../demos/button-group-sizes-demo.tsx?highlighted";
import ButtonGroupSizesDemoRaw from "../../demos/button-group-sizes-demo.tsx?raw";
import { ButtonGroupSplitDemo } from "../../demos/button-group-split-demo";
import ButtonGroupSplitDemoSource from "../../demos/button-group-split-demo.tsx?highlighted";
import ButtonGroupSplitDemoRaw from "../../demos/button-group-split-demo.tsx?raw";
import { ButtonGroupTextDemo } from "../../demos/button-group-text-demo";
import ButtonGroupTextDemoSource from "../../demos/button-group-text-demo.tsx?highlighted";
import ButtonGroupTextDemoRaw from "../../demos/button-group-text-demo.tsx?raw";

export const buttonGroupMeta: ComponentMeta = {
  name: "button-group",
  label: "Button Group",
  description:
    "A container that groups related buttons with consistent styling.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description:
        "Email toolbar with back navigation, icon actions, and a reply dropdown.",
      code: ButtonGroupDemoSource,
      rawCode: ButtonGroupDemoRaw,
      render: () => <ButtonGroupDemo />,
    },
    {
      title: "Orientation",
      description:
        "Vertical layout for stacked icon controls like zoom buttons.",
      code: ButtonGroupOrientationDemoSource,
      rawCode: ButtonGroupOrientationDemoRaw,
      render: () => <ButtonGroupOrientationDemo />,
    },
    {
      title: "Sizes",
      description:
        "All five button sizes (xs through xl) with matching icon buttons.",
      code: ButtonGroupSizesDemoSource,
      rawCode: ButtonGroupSizesDemoRaw,
      render: () => <ButtonGroupSizesDemo />,
    },
    {
      title: "Nested",
      description:
        "Compose groups inside groups for input-plus-action patterns.",
      code: ButtonGroupNestedDemoSource,
      rawCode: ButtonGroupNestedDemoRaw,
      render: () => <ButtonGroupNestedDemo />,
    },
    {
      title: "Separator",
      description:
        "Divides buttons within a group. Unnecessary for outline or secondary variants — recommended for others.",
      code: ButtonGroupSeparatorDemoSource,
      rawCode: ButtonGroupSeparatorDemoRaw,
      render: () => <ButtonGroupSeparatorDemo />,
    },
    {
      title: "Split",
      description:
        "A primary action paired with a destructive icon button, separated.",
      code: ButtonGroupSplitDemoSource,
      rawCode: ButtonGroupSplitDemoRaw,
      render: () => <ButtonGroupSplitDemo />,
    },
    {
      title: "Input",
      description: "Attach a button to an input for inline search.",
      code: ButtonGroupInputDemoSource,
      rawCode: ButtonGroupInputDemoRaw,
      render: () => <ButtonGroupInputDemo />,
    },
    {
      title: "Input Group",
      description:
        "Wrap an InputGroup inside ButtonGroup for complex input layouts with addons.",
      code: ButtonGroupInputGroupDemoSource,
      rawCode: ButtonGroupInputGroupDemoRaw,
      render: () => <ButtonGroupInputGroupDemo />,
    },
    {
      title: "Text",
      description:
        "ButtonGroupText labels a field inside the group without borders.",
      code: ButtonGroupTextDemoSource,
      rawCode: ButtonGroupTextDemoRaw,
      render: () => <ButtonGroupTextDemo />,
    },
    {
      title: "Dropdown",
      description:
        "Publish action with a dropdown for scheduling, drafts, and discarding.",
      code: ButtonGroupDropdownDemoSource,
      rawCode: ButtonGroupDropdownDemoRaw,
      render: () => <ButtonGroupDropdownDemo />,
    },
    {
      title: "Select",
      description:
        "Currency selector and amount input composed with a transfer button.",
      code: ButtonGroupSelectDemoSource,
      rawCode: ButtonGroupSelectDemoRaw,
      render: () => <ButtonGroupSelectDemo />,
    },
    {
      title: "Popover",
      description:
        "Generate button with a popover for entering a custom prompt.",
      code: ButtonGroupPopoverDemoSource,
      rawCode: ButtonGroupPopoverDemoRaw,
      render: () => <ButtonGroupPopoverDemo />,
    },
  ],
  usageImport: `import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";`,
  usageCode: `<ButtonGroup>
  <Button variant="outline">Save</Button>
  <Button variant="outline">Cancel</Button>
</ButtonGroup>`,

  composition: [
    "ButtonGroup",
    "├── Button or Input",
    "├── ButtonGroupSeparator",
    "└── ButtonGroupText",
  ],
  props: [
    {
      name: "variant",
      type: '"overlapped" | "separated"',
      default: '"overlapped"',
      description:
        'Border style. "overlapped" overlaps touching borders with 50% opacity for a seamless look. "separated" removes touching borders (shadcn-like).',
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Layout direction of the group.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the group.",
    },
  ],
  accessibility: [
    'role="group" on the container',
    "Tab to navigate between buttons in the group",
    "Use aria-label or aria-labelledby to label the group",
  ],
  isNew: false,
};
