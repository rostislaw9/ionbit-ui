import type { ComponentMeta } from "./types";

import { ToggleDemo } from "../../demos/toggle-demo";
import ToggleDemoSource from "../../demos/toggle-demo.tsx?highlighted";
import ToggleDemoRaw from "../../demos/toggle-demo.tsx?raw";
import { ToggleDisabledDemo } from "../../demos/toggle-disabled-demo";
import ToggleDisabledDemoSource from "../../demos/toggle-disabled-demo.tsx?highlighted";
import ToggleDisabledDemoRaw from "../../demos/toggle-disabled-demo.tsx?raw";
import { ToggleOutlineDemo } from "../../demos/toggle-outline-demo";
import ToggleOutlineDemoSource from "../../demos/toggle-outline-demo.tsx?highlighted";
import ToggleOutlineDemoRaw from "../../demos/toggle-outline-demo.tsx?raw";
import { ToggleSizesDemo } from "../../demos/toggle-sizes-demo";
import ToggleSizesDemoSource from "../../demos/toggle-sizes-demo.tsx?highlighted";
import ToggleSizesDemoRaw from "../../demos/toggle-sizes-demo.tsx?raw";
import { ToggleTextDemo } from "../../demos/toggle-text-demo";
import ToggleTextDemoSource from "../../demos/toggle-text-demo.tsx?highlighted";
import ToggleTextDemoRaw from "../../demos/toggle-text-demo.tsx?raw";

export const toggleMeta: ComponentMeta = {
  name: "toggle",
  label: "Toggle",
  description: "A two-state button that can be either on or off.",
  category: "Form",
  examples: [
    {
      title: "Overview",
      description: "A bookmark toggle with icon and text label.",
      code: ToggleDemoSource,
      rawCode: ToggleDemoRaw,
      render: () => <ToggleDemo />,
    },
    {
      title: "Outline",
      description: 'Use variant="outline" for a bordered style.',
      code: ToggleOutlineDemoSource,
      rawCode: ToggleOutlineDemoRaw,
      render: () => <ToggleOutlineDemo />,
    },
    {
      title: "With Text",
      description: "A toggle with an icon and text, no border.",
      code: ToggleTextDemoSource,
      rawCode: ToggleTextDemoRaw,
      render: () => <ToggleTextDemo />,
    },
    {
      title: "Sizes",
      description: "All five sizes from xs to xl.",
      code: ToggleSizesDemoSource,
      rawCode: ToggleSizesDemoRaw,
      render: () => <ToggleSizesDemo />,
    },
    {
      title: "Disabled",
      description: "Both default and outline variants in disabled state.",
      code: ToggleDisabledDemoSource,
      rawCode: ToggleDisabledDemoRaw,
      render: () => <ToggleDisabledDemo />,
    },
  ],
  usageImport: `import { Toggle } from "@/components/ui/toggle";`,
  usageCode: `<Toggle pressed>Toggle</Toggle>`,
  props: [
    {
      name: "pressed",
      type: "boolean",
      description: "Controlled pressed state.",
    },
    {
      name: "defaultPressed",
      type: "boolean",
      description: "Uncontrolled default pressed state.",
    },
    {
      name: "onPressedChange",
      type: "(pressed: boolean) => void",
      description: "Called when the pressed state changes.",
    },
    {
      name: "variant",
      type: '"default" | "outline"',
      default: '"default"',
      description: "Visual style of the toggle.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"',
      default: '"md"',
      description: "Toggle size. Use icon variants for icon-only toggles.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Prevents interaction.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Render as child element via Radix Slot.",
    },
  ],
  accessibility: [
    "aria-pressed reflects the on/off state",
    "Keyboard toggle via Space and Enter",
    "Focus visible ring",
    "Icon-only toggles require an aria-label",
  ],
  basedOn: "radix",
  isNew: false,
};
