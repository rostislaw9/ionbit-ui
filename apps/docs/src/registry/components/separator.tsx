import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { SeparatorDemo } from "../../demos/separator-demo";
import SeparatorDemoSource from "../../demos/separator-demo.tsx?highlighted";
import SeparatorDemoRaw from "../../demos/separator-demo.tsx?raw";
import { SeparatorListDemo } from "../../demos/separator-list-demo";
import SeparatorListDemoSource from "../../demos/separator-list-demo.tsx?highlighted";
import SeparatorListDemoRaw from "../../demos/separator-list-demo.tsx?raw";
import { SeparatorMenuDemo } from "../../demos/separator-menu-demo";
import SeparatorMenuDemoSource from "../../demos/separator-menu-demo.tsx?highlighted";
import SeparatorMenuDemoRaw from "../../demos/separator-menu-demo.tsx?raw";
import { SeparatorVerticalDemo } from "../../demos/separator-vertical-demo";
import SeparatorVerticalDemoSource from "../../demos/separator-vertical-demo.tsx?highlighted";
import SeparatorVerticalDemoRaw from "../../demos/separator-vertical-demo.tsx?raw";

export const separatorMeta: ComponentMeta = {
  name: "separator",
  label: "Separator",
  description: "Visually or semantically separates content.",
  category: "Layout",
  examples: [
    {
      title: "Overview",
      description: "A horizontal separator between a heading and body text.",
      code: SeparatorDemoSource,
      rawCode: SeparatorDemoRaw,
      render: () => <SeparatorDemo />,
    },
    {
      title: "Vertical",
      description: (
        <>
          Use <InlineCode>orientation=&quot;vertical&quot;</InlineCode> for a
          vertical separator between items.
        </>
      ),
      code: SeparatorVerticalDemoSource,
      rawCode: SeparatorVerticalDemoRaw,
      render: () => <SeparatorVerticalDemo />,
    },
    {
      title: "Menu",
      description: "Vertical separators between menu items with descriptions.",
      code: SeparatorMenuDemoSource,
      rawCode: SeparatorMenuDemoRaw,
      render: () => <SeparatorMenuDemo />,
    },
    {
      title: "List",
      description: "Horizontal separators between list items.",
      code: SeparatorListDemoSource,
      rawCode: SeparatorListDemoRaw,
      render: () => <SeparatorListDemo />,
    },
  ],
  usageImport: `import { Separator } from "@/components/ui/separator";`,
  usageCode: `<Separator orientation="horizontal" />`,
  apiReference: {
    label: "Base UI Separator",
    url: "https://base-ui.com/react/components/separator#api-reference",
  },
  accessibility: [
    'Base UI always sets role="separator" with aria-orientation based on the orientation prop.',
    "The separator renders a div and is never focusable.",
    "The decorative prop is kept for API compatibility but has no effect — Base UI always exposes the separator to assistive technologies.",
  ],
  basedOn: "base",
  isNew: false,
};
