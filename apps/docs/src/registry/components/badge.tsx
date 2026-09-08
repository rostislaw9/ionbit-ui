import type { ComponentMeta } from "./types";

import { BadgeCustomColorsDemo } from "../../demos/badge-custom-colors-demo";
import BadgeCustomColorsDemoSource from "../../demos/badge-custom-colors-demo.tsx?highlighted";
import BadgeCustomColorsDemoRaw from "../../demos/badge-custom-colors-demo.tsx?raw";
import { BadgeGlowDemo } from "../../demos/badge-glow-demo";
import BadgeGlowDemoSource from "../../demos/badge-glow-demo.tsx?highlighted";
import BadgeGlowDemoRaw from "../../demos/badge-glow-demo.tsx?raw";
import { BadgeIconDemo } from "../../demos/badge-icon-demo";
import BadgeIconDemoSource from "../../demos/badge-icon-demo.tsx?highlighted";
import BadgeIconDemoRaw from "../../demos/badge-icon-demo.tsx?raw";
import { BadgeLinkDemo } from "../../demos/badge-link-demo";
import BadgeLinkDemoSource from "../../demos/badge-link-demo.tsx?highlighted";
import BadgeLinkDemoRaw from "../../demos/badge-link-demo.tsx?raw";
import { BadgeSoftDemo } from "../../demos/badge-soft-demo";
import BadgeSoftDemoSource from "../../demos/badge-soft-demo.tsx?highlighted";
import BadgeSoftDemoRaw from "../../demos/badge-soft-demo.tsx?raw";
import { BadgeSpinnerDemo } from "../../demos/badge-spinner-demo";
import BadgeSpinnerDemoSource from "../../demos/badge-spinner-demo.tsx?highlighted";
import BadgeSpinnerDemoRaw from "../../demos/badge-spinner-demo.tsx?raw";
import { BadgeTextDemo } from "../../demos/badge-text-demo";
import BadgeTextDemoSource from "../../demos/badge-text-demo.tsx?highlighted";
import BadgeTextDemoRaw from "../../demos/badge-text-demo.tsx?raw";
import { BadgeVariantsDemo } from "../../demos/badge-variants-demo";
import BadgeVariantsDemoSource from "../../demos/badge-variants-demo.tsx?highlighted";
import BadgeVariantsDemoRaw from "../../demos/badge-variants-demo.tsx?raw";

export const badgeMeta: ComponentMeta = {
  name: "badge",
  label: "Badge",
  description: "Small status indicator with soft and text variants.",
  category: "Form",
  examples: [
    {
      title: "Variants",
      description:
        "Default, outline, ghost, and semantic badges with muted background and colored border.",
      code: BadgeVariantsDemoSource,
      rawCode: BadgeVariantsDemoRaw,
      render: () => <BadgeVariantsDemo />,
    },
    {
      title: "Soft",
      description:
        "Muted background with colored text and no border for a subtler look.",
      code: BadgeSoftDemoSource,
      rawCode: BadgeSoftDemoRaw,
      render: () => <BadgeSoftDemo />,
    },
    {
      title: "Text",
      description: "Colored text only — no background or border.",
      code: BadgeTextDemoSource,
      rawCode: BadgeTextDemoRaw,
      render: () => <BadgeTextDemo />,
    },
    {
      title: "With Icon",
      description: "Badges paired with lucide icons.",
      code: BadgeIconDemoSource,
      rawCode: BadgeIconDemoRaw,
      render: () => <BadgeIconDemo />,
    },
    {
      title: "With Spinner",
      description:
        'Render a Spinner inside the badge. Use data-icon="inline-start" or data-icon="inline-end" to position it.',
      code: BadgeSpinnerDemoSource,
      rawCode: BadgeSpinnerDemoRaw,
      render: () => <BadgeSpinnerDemo />,
    },
    {
      title: "Link",
      description: "Use the asChild prop to render a link as a badge.",
      code: BadgeLinkDemoSource,
      rawCode: BadgeLinkDemoRaw,
      render: () => <BadgeLinkDemo />,
    },
    {
      title: "Custom Colors",
      description:
        "Customize badge colors by adding utility classes like bg-blue-50 dark:bg-blue-950.",
      code: BadgeCustomColorsDemoSource,
      rawCode: BadgeCustomColorsDemoRaw,
      render: () => <BadgeCustomColorsDemo />,
    },
    {
      title: "With Glow",
      description:
        "Wrap badges in a Glow primitive for an accent halo. Use always for persistent status indicators.",
      code: BadgeGlowDemoSource,
      rawCode: BadgeGlowDemoRaw,
      render: () => <BadgeGlowDemo />,
    },
  ],
  usageImport: `import { Badge } from "@/components/ui/badge";`,
  usageCode: `<Badge variant="success">Active</Badge>`,
  props: [
    {
      name: "variant",
      type: '"default" | "outline" | "ghost" | "accent" | "accent-soft" | "accent-text" | "success" | "success-soft" | "success-text" | "warning" | "warning-soft" | "warning-text" | "error" | "error-soft" | "error-text" | "info" | "info-soft" | "info-text"',
      default: '"default"',
      description:
        "Visual variant. Default semantic variants use a muted background with colored border; -soft removes the border; -text colors only the text.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description:
        "When true, Badge renders as a Slot and merges its props into its single child. Use to render a link or other element as a badge.",
    },
  ],
  accessibility: [
    "Badge renders as a span with no implicit role.",
    "Use semantic variants to convey meaning, not color alone.",
    "Include an icon or text label that describes the status.",
    "When using asChild with a link, the child element provides its own semantics.",
  ],
  radixBased: true,
  isNew: false,
};
