import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { CollapsibleBasicDemo } from "../../demos/collapsible-basic-demo";
import CollapsibleBasicDemoSource from "../../demos/collapsible-basic-demo.tsx?highlighted";
import CollapsibleBasicDemoRaw from "../../demos/collapsible-basic-demo.tsx?raw";
import { CollapsibleDemo } from "../../demos/collapsible-demo";
import CollapsibleDemoSource from "../../demos/collapsible-demo.tsx?highlighted";
import CollapsibleDemoRaw from "../../demos/collapsible-demo.tsx?raw";
import { CollapsibleFileTreeDemo } from "../../demos/collapsible-file-tree-demo";
import CollapsibleFileTreeDemoSource from "../../demos/collapsible-file-tree-demo.tsx?highlighted";
import CollapsibleFileTreeDemoRaw from "../../demos/collapsible-file-tree-demo.tsx?raw";
import { CollapsibleSettingsDemo } from "../../demos/collapsible-settings-demo";
import CollapsibleSettingsDemoSource from "../../demos/collapsible-settings-demo.tsx?highlighted";
import CollapsibleSettingsDemoRaw from "../../demos/collapsible-settings-demo.tsx?raw";

export const collapsibleMeta: ComponentMeta = {
  name: "collapsible",
  label: "Collapsible",
  description:
    "Single expand/collapse section. Simpler than Accordion for one toggle.",
  category: "Layout",
  examples: [
    {
      title: "Overview",
      description:
        "A controlled collapsible with a trigger button and animated content.",
      code: CollapsibleDemoSource,
      rawCode: CollapsibleDemoRaw,
      render: () => <CollapsibleDemo />,
    },
    {
      title: "Basic",
      description:
        "A bordered collapsible card with a chevron that rotates on open.",
      code: CollapsibleBasicDemoSource,
      rawCode: CollapsibleBasicDemoRaw,
      render: () => <CollapsibleBasicDemo />,
    },
    {
      title: "Settings Panel",
      description:
        "An expandable settings section with form inputs revealed on open.",
      code: CollapsibleSettingsDemoSource,
      rawCode: CollapsibleSettingsDemoRaw,
      render: () => <CollapsibleSettingsDemo />,
    },
    {
      title: "File Tree",
      description:
        "Nested collapsibles to build a file explorer tree with folder/file icons.",
      code: CollapsibleFileTreeDemoSource,
      rawCode: CollapsibleFileTreeDemoRaw,
      render: () => <CollapsibleFileTreeDemo />,
    },
  ],
  usageImport: `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";`,
  usageCode: `<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>`,
  infoBlocks: [
    {
      title: "Controlled State",
      description: (
        <p>
          Use the <InlineCode>open</InlineCode> and{" "}
          <InlineCode>onOpenChange</InlineCode> props to control the state.
        </p>
      ),
      code: `import * as React from "react"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}`,
    },
  ],
  composition: [
    "Collapsible",
    "├── CollapsibleTrigger",
    "└── CollapsibleContent",
  ],
  props: [
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Uncontrolled default open state.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Called when the open state changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the collapsible trigger.",
    },
    {
      name: "CollapsibleTrigger.asChild",
      type: "boolean",
      default: "false",
      description:
        "Render as a child element (e.g. a Button) for custom triggers.",
    },
    {
      name: "CollapsibleContent.asChild",
      type: "boolean",
      default: "false",
      description: "Render the content as a child element.",
    },
  ],
  accessibility: [
    "Radix manages aria-expanded and aria-controls on the trigger.",
    "Enter and Space activate the trigger.",
    "Content is mounted when open and unmounted when closed.",
    "When disabled, the trigger is not focusable or activatable.",
  ],
  basedOn: "radix",
  isNew: true,
};
