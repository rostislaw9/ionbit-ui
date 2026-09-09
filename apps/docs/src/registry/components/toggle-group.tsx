import type { ComponentMeta } from "./types";

import { ToggleGroupCustomDemo } from "../../demos/toggle-group-custom-demo";
import ToggleGroupCustomDemoSource from "../../demos/toggle-group-custom-demo.tsx?highlighted";
import ToggleGroupCustomDemoRaw from "../../demos/toggle-group-custom-demo.tsx?raw";
import { ToggleGroupDemo } from "../../demos/toggle-group-demo";
import ToggleGroupDemoSource from "../../demos/toggle-group-demo.tsx?highlighted";
import ToggleGroupDemoRaw from "../../demos/toggle-group-demo.tsx?raw";
import { ToggleGroupDisabledDemo } from "../../demos/toggle-group-disabled-demo";
import ToggleGroupDisabledDemoSource from "../../demos/toggle-group-disabled-demo.tsx?highlighted";
import ToggleGroupDisabledDemoRaw from "../../demos/toggle-group-disabled-demo.tsx?raw";
import { ToggleGroupOutlineDemo } from "../../demos/toggle-group-outline-demo";
import ToggleGroupOutlineDemoSource from "../../demos/toggle-group-outline-demo.tsx?highlighted";
import ToggleGroupOutlineDemoRaw from "../../demos/toggle-group-outline-demo.tsx?raw";
import { ToggleGroupSizesDemo } from "../../demos/toggle-group-sizes-demo";
import ToggleGroupSizesDemoSource from "../../demos/toggle-group-sizes-demo.tsx?highlighted";
import ToggleGroupSizesDemoRaw from "../../demos/toggle-group-sizes-demo.tsx?raw";
import { ToggleGroupSpacingDemo } from "../../demos/toggle-group-spacing-demo";
import ToggleGroupSpacingDemoSource from "../../demos/toggle-group-spacing-demo.tsx?highlighted";
import ToggleGroupSpacingDemoRaw from "../../demos/toggle-group-spacing-demo.tsx?raw";
import { ToggleGroupVerticalDemo } from "../../demos/toggle-group-vertical-demo";
import ToggleGroupVerticalDemoSource from "../../demos/toggle-group-vertical-demo.tsx?highlighted";
import ToggleGroupVerticalDemoRaw from "../../demos/toggle-group-vertical-demo.tsx?raw";

export const toggleGroupMeta: ComponentMeta = {
  name: "toggle-group",
  label: "Toggle Group",
  description: "A set of two-state buttons that can be toggled on or off.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description:
        "Multiple-select toggle group with outline variant for text formatting.",
      code: ToggleGroupDemoSource,
      rawCode: ToggleGroupDemoRaw,
      render: () => <ToggleGroupDemo />,
    },
    {
      title: "Outline",
      description:
        'Set variant="outline" on the group to propagate to all items.',
      code: ToggleGroupOutlineDemoSource,
      rawCode: ToggleGroupOutlineDemoRaw,
      render: () => <ToggleGroupOutlineDemo />,
    },
    {
      title: "Sizes",
      description:
        "Set size on the group — small, medium, and large with outline variant.",
      code: ToggleGroupSizesDemoSource,
      rawCode: ToggleGroupSizesDemoRaw,
      render: () => <ToggleGroupSizesDemo />,
    },
    {
      title: "Spacing",
      description:
        "Use the spacing prop to control the gap between items. Default is 2; set to 0 for joined items.",
      code: ToggleGroupSpacingDemoSource,
      rawCode: ToggleGroupSpacingDemoRaw,
      render: () => <ToggleGroupSpacingDemo />,
    },
    {
      title: "Vertical",
      description: 'Use orientation="vertical" for stacked icon toggles.',
      code: ToggleGroupVerticalDemoSource,
      rawCode: ToggleGroupVerticalDemoRaw,
      render: () => <ToggleGroupVerticalDemo />,
    },
    {
      title: "Disabled",
      description: "All items disabled via the group's disabled prop.",
      code: ToggleGroupDisabledDemoSource,
      rawCode: ToggleGroupDisabledDemoRaw,
      render: () => <ToggleGroupDisabledDemo />,
    },
    {
      title: "Custom",
      description:
        "A font-weight selector with custom card-style items and live display.",
      code: ToggleGroupCustomDemoSource,
      rawCode: ToggleGroupCustomDemoRaw,
      render: () => <ToggleGroupCustomDemo />,
    },
  ],
  usageImport: `import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";`,
  usageCode: `<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>`,
  composition: ["ToggleGroup", "└── ToggleGroupItem"],
  props: [
    {
      name: "type",
      type: '"single" | "multiple"',
      description:
        "Single allows one active item; multiple allows independent toggles.",
    },
    {
      name: "variant",
      type: '"default" | "outline"',
      default: '"default"',
      description: "Visual style propagated to all items in the group.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"',
      default: '"md"',
      description: "Size propagated to all items in the group.",
    },
    {
      name: "spacing",
      type: "number",
      default: "2",
      description:
        "Gap between items in Tailwind spacing units. Set to 0 for joined items with shared borders.",
    },
    {
      name: "value",
      type: "string | string[]",
      description: "Controlled selected value(s).",
    },
    {
      name: "defaultValue",
      type: "string | string[]",
      description: "Uncontrolled default value(s).",
    },
    {
      name: "onValueChange",
      type: "(value: string | string[]) => void",
      description: "Called when the selection changes.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Layout direction of the group.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables all items in the group.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the group.",
    },
  ],
  accessibility: [
    'role="radiogroup" (single) or role="toolbar" (multiple) on the root',
    "aria-pressed on each item reflects its state",
    "Keyboard navigation via Tab, Space, and Enter",
    "Use aria-label to label the group",
  ],
  basedOn: "radix",
  isNew: false,
};
