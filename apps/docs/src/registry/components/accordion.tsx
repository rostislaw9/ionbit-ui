import type { ComponentMeta } from "./types";

import { AccordionBasicDemo } from "../../demos/accordion-basic-demo";
import AccordionBasicDemoSource from "../../demos/accordion-basic-demo.tsx?highlighted";
import AccordionBasicDemoRaw from "../../demos/accordion-basic-demo.tsx?raw";

export const accordionMeta: ComponentMeta = {
  name: "accordion",
  label: "Accordion",
  description:
    "Collapsible sections with animated expand/collapse and chevron rotation.",
  category: "Layout",
  examples: [
    {
      title: "Overview",
      description: "Collapsible sections with chevron indicator.",
      code: AccordionBasicDemoSource,
      rawCode: AccordionBasicDemoRaw,
      render: () => <AccordionBasicDemo />,
    },
  ],
  usageImport: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";`,
  usageCode: `<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>`,
  composition: [
    "Accordion",
    "└── AccordionItem",
    "    ├── AccordionTrigger",
    "    └── AccordionContent",
  ],
  props: [
    {
      name: "collapsible",
      type: "boolean",
      default: "true",
      description: "Whether multiple items can stay open.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled value of the open item(s).",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Uncontrolled default value.",
    },
    {
      name: "onValueChange",
      type: "function",
      description: "Called when the open item changes.",
    },
  ],
  accessibility: [
    "Radix manages ARIA attributes (aria-expanded, aria-controls)",
    "Keyboard navigation via Arrow keys",
    "Home/End to jump to first/last item",
  ],
  basedOn: "radix",
  isNew: false,
};
