import type { ComponentMeta } from "./types";

import { TabsBasicDemo } from "../../demos/tabs-basic-demo";
import TabsBasicDemoSource from "../../demos/tabs-basic-demo.tsx?highlighted";
import TabsBasicDemoRaw from "../../demos/tabs-basic-demo.tsx?raw";

export const tabsMeta: ComponentMeta = {
  name: "tabs",
  label: "Tabs",
  description:
    "Tabs with sliding active indicator. Content slides in horizontally based on switch direction.",
  category: "Layout",
  examples: [
    {
      title: "Overview",
      description:
        "Three tabs with sliding indicator and directional content animation.",
      code: TabsBasicDemoSource,
      rawCode: TabsBasicDemoRaw,
      render: () => <TabsBasicDemo />,
    },
  ],
  usageImport: `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";`,
  usageCode: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
  composition: [
    "Tabs",
    "├── TabsList",
    "│   └── TabsTrigger",
    "└── TabsContent",
  ],
  props: [
    {
      name: "value",
      type: "string",
      description: "Controlled active tab value.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Uncontrolled default active tab.",
    },
    {
      name: "onValueChange",
      type: "function",
      description: "Called when the active tab changes.",
    },
  ],
  accessibility: [
    "Radix manages roving tabindex",
    "Arrow keys navigate between tabs",
    "aria-selected on active tab",
  ],
  basedOn: "radix",
  isNew: false,
};
