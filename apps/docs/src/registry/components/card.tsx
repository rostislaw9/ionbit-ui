import type { ComponentMeta } from "./types";

import { CardBasicDemo } from "../../demos/card-basic-demo";
import CardBasicDemoSource from "../../demos/card-basic-demo.tsx?highlighted";
import CardBasicDemoRaw from "../../demos/card-basic-demo.tsx?raw";
import { CardSpotlightDemo } from "../../demos/card-spotlight-demo";
import CardSpotlightDemoSource from "../../demos/card-spotlight-demo.tsx?highlighted";
import CardSpotlightDemoRaw from "../../demos/card-spotlight-demo.tsx?raw";

export const cardMeta: ComponentMeta = {
  name: "card",
  label: "Card",
  description:
    "Surface container with header, content, and footer. Elevated and interactive variants.",
  category: "Layout",
  examples: [
    {
      title: "Overview",
      description: "Standard card with header, content, and footer.",
      code: CardBasicDemoSource,
      rawCode: CardBasicDemoRaw,
      render: () => <CardBasicDemo />,
    },
    {
      title: "With Spotlight",
      description:
        "Wrap with the Spotlight motion primitive for a pointer-following highlight.",
      code: CardSpotlightDemoSource,
      rawCode: CardSpotlightDemoRaw,
      render: () => <CardSpotlightDemo />,
    },
  ],
  usageImport: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";`,
  usageCode: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`,
  composition: [
    "Card",
    "├── CardHeader",
    "│   ├── CardTitle",
    "│   └── CardDescription",
    "├── CardContent",
    "└── CardFooter",
  ],
  props: [
    {
      name: "elevated",
      type: "boolean",
      default: "false",
      description: "Uses surface-elevated + shadow for depth.",
    },
    {
      name: "interactive",
      type: "boolean",
      default: "false",
      description:
        "Adds hover surface and border highlight for interactive cards.",
    },
  ],
  accessibility: [
    "Semantic structure via CardHeader, CardTitle, CardDescription, CardContent, CardFooter",
  ],
  isNew: false,
};
