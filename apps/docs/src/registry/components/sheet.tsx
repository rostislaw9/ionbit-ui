import type { ComponentMeta } from "./types";

import { SheetBasicDemo } from "../../demos/sheet-basic-demo";
import SheetBasicDemoSource from "../../demos/sheet-basic-demo.tsx?highlighted";
import SheetBasicDemoRaw from "../../demos/sheet-basic-demo.tsx?raw";
import { SheetNoCloseDemo } from "../../demos/sheet-no-close-demo";
import SheetNoCloseDemoSource from "../../demos/sheet-no-close-demo.tsx?highlighted";
import SheetNoCloseDemoRaw from "../../demos/sheet-no-close-demo.tsx?raw";
import { SheetSideDemo } from "../../demos/sheet-side-demo";
import SheetSideDemoSource from "../../demos/sheet-side-demo.tsx?highlighted";
import SheetSideDemoRaw from "../../demos/sheet-side-demo.tsx?raw";

export const sheetMeta: ComponentMeta = {
  name: "sheet",
  label: "Sheet",
  description: "Slide-in panel with top/right/bottom/left sides.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description: "A right-side panel with form fields and footer actions.",
      code: SheetBasicDemoSource,
      rawCode: SheetBasicDemoRaw,
      render: () => <SheetBasicDemo />,
    },
    {
      title: "Sides",
      description: "Panels sliding from all four edges.",
      code: SheetSideDemoSource,
      rawCode: SheetSideDemoRaw,
      render: () => <SheetSideDemo />,
    },
    {
      title: "No close button",
      description:
        "Panel without a close button — dismiss via overlay or Escape.",
      code: SheetNoCloseDemoSource,
      rawCode: SheetNoCloseDemoRaw,
      render: () => <SheetNoCloseDemo />,
    },
  ],
  usageImport: `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";`,
  usageCode: `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose>Close</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
  composition: [
    "Sheet",
    "├── SheetTrigger",
    "└── SheetContent",
    "    ├── SheetHeader",
    "    │   ├── SheetTitle",
    "    │   └── SheetDescription",
    "    └── SheetFooter",
    "        └── SheetClose",
  ],
  props: [
    { name: "open", type: "boolean", description: "Controlled open state." },
    {
      name: "defaultOpen",
      type: "boolean",
      description: "Uncontrolled default open state.",
    },
    {
      name: "onOpenChange",
      type: "function",
      description: "Called when open state changes.",
    },
    {
      name: "SheetContent.side",
      type: '"top" | "right" | "bottom" | "left"',
      default: '"right"',
      description: "Which edge the sheet slides from.",
    },
    {
      name: "SheetContent.showCloseButton",
      type: "boolean",
      default: "true",
      description: "Whether to show the close button in the top-right corner.",
    },
  ],
  accessibility: [
    "Focus is trapped within the sheet",
    "Escape closes the sheet",
    "Screen reader announcements via Dialog primitives",
  ],
  basedOn: "radix",
  isNew: false,
};
