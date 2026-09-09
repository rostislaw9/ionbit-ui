import type { ComponentMeta } from "./types";

import { BreadcrumbCustomSeparatorDemo } from "../../demos/breadcrumb-custom-separator-demo";
import BreadcrumbCustomSeparatorDemoSource from "../../demos/breadcrumb-custom-separator-demo.tsx?highlighted";
import BreadcrumbCustomSeparatorDemoRaw from "../../demos/breadcrumb-custom-separator-demo.tsx?raw";
import { BreadcrumbDefaultDemo } from "../../demos/breadcrumb-default-demo";
import BreadcrumbDefaultDemoSource from "../../demos/breadcrumb-default-demo.tsx?highlighted";
import BreadcrumbDefaultDemoRaw from "../../demos/breadcrumb-default-demo.tsx?raw";

export const breadcrumbMeta: ComponentMeta = {
  name: "breadcrumb",
  label: "Breadcrumb",
  description: "Navigation trail showing the user's location in a hierarchy.",
  category: "Layout",
  examples: [
    {
      title: "Overview",
      description: "Home > Components > Button (current page).",
      code: BreadcrumbDefaultDemoSource,
      rawCode: BreadcrumbDefaultDemoRaw,
      render: () => <BreadcrumbDefaultDemo />,
    },
    {
      title: "With Custom Separator",
      description: "Breadcrumb with a custom separator character.",
      code: BreadcrumbCustomSeparatorDemoSource,
      rawCode: BreadcrumbCustomSeparatorDemoRaw,
      render: () => <BreadcrumbCustomSeparatorDemo />,
    },
  ],
  usageImport: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";`,
  usageCode: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis label="More" />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Button</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  composition: [
    "Breadcrumb",
    "└── BreadcrumbList",
    "    ├── BreadcrumbItem",
    "    │   ├── BreadcrumbLink",
    "    │   └── BreadcrumbPage",
    "    ├── BreadcrumbSeparator",
    "    └── BreadcrumbEllipsis",
  ],
  props: [
    {
      name: "aria-label",
      type: "string",
      default: '"breadcrumb"',
      description: "Accessible label for the breadcrumb navigation.",
    },
    {
      name: "BreadcrumbLink.asChild",
      type: "boolean",
      default: "false",
      description: "Render as child element (e.g. a router Link).",
    },
    {
      name: "BreadcrumbLink.href",
      type: "string",
      description: "URL for the link.",
    },
    {
      name: "BreadcrumbPage.aria-current",
      type: "string",
      default: '"page"',
      description: "Marks the current page.",
    },
    {
      name: "BreadcrumbSeparator.children",
      type: "ReactNode",
      description: "Custom separator content.",
    },
    {
      name: "BreadcrumbEllipsis.label",
      type: "string",
      default: '"More"',
      description: "Accessible label for the ellipsis.",
    },
  ],
  accessibility: [
    'Nav element has aria-label="breadcrumb".',
    "BreadcrumbList uses an ordered list (ol) as recommended by WAI-ARIA.",
    'BreadcrumbPage sets aria-current="page" on the current page.',
    'BreadcrumbSeparator has role="presentation".',
  ],
  basedOn: "radix",
  isNew: false,
};
