import type { ComponentMeta } from "./types";

import { SeparatorHorizontalDemo } from "../../demos/separator-horizontal-demo";
import SeparatorHorizontalDemoSource from "../../demos/separator-horizontal-demo.tsx?highlighted";
import SeparatorHorizontalDemoRaw from "../../demos/separator-horizontal-demo.tsx?raw";
import { SeparatorVerticalDemo } from "../../demos/separator-vertical-demo";
import SeparatorVerticalDemoSource from "../../demos/separator-vertical-demo.tsx?highlighted";
import SeparatorVerticalDemoRaw from "../../demos/separator-vertical-demo.tsx?raw";

export const separatorMeta: ComponentMeta = {
  name: "separator",
  label: "Separator",
  description: "Visual divider with horizontal and vertical orientation.",
  category: "Layout",
  examples: [
    {
      title: "Horizontal",
      description: "A horizontal separator between text blocks.",
      code: SeparatorHorizontalDemoSource,
      rawCode: SeparatorHorizontalDemoRaw,
      render: () => <SeparatorHorizontalDemo />,
    },
    {
      title: "Vertical",
      description: "A vertical separator between items in a flex row.",
      code: SeparatorVerticalDemoSource,
      rawCode: SeparatorVerticalDemoRaw,
      render: () => <SeparatorVerticalDemo />,
    },
  ],
  usageImport: `import { Separator } from "@/components/ui/separator";`,
  usageCode: `<Separator orientation="horizontal" />`,
  props: [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Orientation of the separator.",
    },
    {
      name: "decorative",
      type: "boolean",
      default: "true",
      description: "When true, the separator is presentational only.",
    },
  ],
  accessibility: [
    'Sets role="separator" with aria-orientation based on orientation prop.',
    "When decorative is true, the separator is not focusable.",
    "Use decorative=false for separators that divide content sections.",
  ],
  basedOn: "radix",
  isNew: false,
};
