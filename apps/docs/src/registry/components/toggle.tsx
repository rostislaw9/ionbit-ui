import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/code/InlineCode";
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
  description:
    "A button that toggles between pressed and unpressed states, in default and outline variants.",
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
      description: (
        <>
          Use <InlineCode>variant=&quot;outline&quot;</InlineCode> for a
          bordered style.
        </>
      ),
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
  ],
  accessibility: [
    "aria-pressed reflects the on/off state",
    "Keyboard toggle via Space and Enter",
    "Focus visible ring",
    "Icon-only toggles require an aria-label",
  ],
  apiReference: {
    label: "Base UI Toggle",
    url: "https://base-ui.com/react/components/toggle#api-reference",
  },
  basedOn: "base",
};
