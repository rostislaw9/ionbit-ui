import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/code/InlineCode";
import { AccordionBasicDemo } from "../../demos/accordion-basic-demo";
import AccordionBasicDemoSource from "../../demos/accordion-basic-demo.tsx?highlighted";
import AccordionBasicDemoRaw from "../../demos/accordion-basic-demo.tsx?raw";
import { AccordionBordersDemo } from "../../demos/accordion-borders-demo";
import AccordionBordersDemoSource from "../../demos/accordion-borders-demo.tsx?highlighted";
import AccordionBordersDemoRaw from "../../demos/accordion-borders-demo.tsx?raw";
import { AccordionCardDemo } from "../../demos/accordion-card-demo";
import AccordionCardDemoSource from "../../demos/accordion-card-demo.tsx?highlighted";
import AccordionCardDemoRaw from "../../demos/accordion-card-demo.tsx?raw";
import { AccordionDemo } from "../../demos/accordion-demo";
import AccordionDemoSource from "../../demos/accordion-demo.tsx?highlighted";
import AccordionDemoRaw from "../../demos/accordion-demo.tsx?raw";
import { AccordionDisabledDemo } from "../../demos/accordion-disabled-demo";
import AccordionDisabledDemoSource from "../../demos/accordion-disabled-demo.tsx?highlighted";
import AccordionDisabledDemoRaw from "../../demos/accordion-disabled-demo.tsx?raw";
import { AccordionMultipleDemo } from "../../demos/accordion-multiple-demo";
import AccordionMultipleDemoSource from "../../demos/accordion-multiple-demo.tsx?highlighted";
import AccordionMultipleDemoRaw from "../../demos/accordion-multiple-demo.tsx?raw";

export const accordionMeta: ComponentMeta = {
  name: "accordion",
  label: "Accordion",
  description:
    "A vertical stack of collapsible sections with smooth height animation and rotating chevron indicators.",
  category: "Layout",
  examples: [
    {
      title: "Overview",
      description: "Collapsible sections with chevron indicator.",
      code: AccordionDemoSource,
      rawCode: AccordionDemoRaw,
      render: () => <AccordionDemo />,
    },
    {
      title: "Basic",
      description:
        "One item open at a time, rendered from a data array with the first item expanded.",
      code: AccordionBasicDemoSource,
      rawCode: AccordionBasicDemoRaw,
      render: () => <AccordionBasicDemo />,
    },
    {
      title: "Multiple",
      description: (
        <>
          Pass <InlineCode>multiple</InlineCode> to let several items stay open
          at the same time.
        </>
      ),
      code: AccordionMultipleDemoSource,
      rawCode: AccordionMultipleDemoRaw,
      render: () => <AccordionMultipleDemo />,
    },
    {
      title: "Disabled",
      description: (
        <>
          Set <InlineCode>disabled</InlineCode> on an{" "}
          <InlineCode>AccordionItem</InlineCode> to make its trigger inert.
        </>
      ),
      code: AccordionDisabledDemoSource,
      rawCode: AccordionDisabledDemoRaw,
      render: () => <AccordionDisabledDemo />,
    },
    {
      title: "Borders",
      description:
        "Wrap the accordion in a bordered, padded container for a grouped look.",
      code: AccordionBordersDemoSource,
      rawCode: AccordionBordersDemoRaw,
      render: () => <AccordionBordersDemo />,
    },
    {
      title: "Card",
      description: (
        <>
          An accordion inside a <InlineCode>Card</InlineCode> for titled FAQ
          panels.
        </>
      ),
      code: AccordionCardDemoSource,
      rawCode: AccordionCardDemoRaw,
      render: () => <AccordionCardDemo />,
    },
  ],
  usageImport: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";`,
  usageCode: `<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  composition: [
    "Accordion",
    "├── AccordionItem",
    "│   ├── AccordionTrigger",
    "│   └── AccordionContent",
    "└── AccordionItem",
    "    ├── AccordionTrigger",
    "    └── AccordionContent",
  ],
  primitives: [
    {
      name: "Accordion",
      description:
        "The root that groups all items and controls which are expanded.",
      props: [
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          description:
            "Whether multiple items can be open at the same time. By default only one item stays open.",
        },
        {
          name: "value",
          type: "string[]",
          description: "Controlled array of the open item values.",
        },
        {
          name: "defaultValue",
          type: "string[]",
          description: "Uncontrolled array of initially open item values.",
        },
        {
          name: "onValueChange",
          type: "function",
          description:
            "Called with the array of open item values when it changes.",
        },
      ],
    },
    {
      name: "AccordionItem",
      description:
        "A single collapsible section pairing a trigger with its panel.",
      props: [
        {
          name: "value",
          type: "string",
          description: "Unique identifier used to open and close the item.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents the item's trigger from toggling the panel.",
        },
      ],
    },
    {
      name: "AccordionTrigger",
      description:
        "The button inside the item header that expands and collapses the panel.",
      props: [
        {
          name: "render",
          type: "ReactElement",
          description:
            "Renders the trigger as a different element or component.",
        },
      ],
    },
    {
      name: "AccordionContent",
      description:
        'The collapsible panel of an item, rendered with role="region".',
      props: [
        {
          name: "keepMounted",
          type: "boolean",
          default: "false",
          description: "Keeps the panel in the DOM while it is closed.",
        },
      ],
    },
  ],
  accessibility: [
    'Base UI manages ARIA attributes (aria-expanded, aria-controls) and renders the panel with role="region"',
    "Each trigger is a native button in the tab order; Enter and Space toggle the panel",
  ],
  apiReference: {
    label: "Base UI Accordion",
    url: "https://base-ui.com/react/components/accordion#api-reference",
  },
  basedOn: "base",
};
