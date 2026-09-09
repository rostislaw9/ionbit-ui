import type { ComponentMeta } from "./types";

import { ContextMenuDemo } from "../../demos/context-menu-demo";
import ContextMenuDemoSource from "../../demos/context-menu-demo.tsx?highlighted";
import ContextMenuDemoRaw from "../../demos/context-menu-demo.tsx?raw";

export const contextMenuMeta: ComponentMeta = {
  name: "context-menu",
  label: "Context Menu",
  description: "Right-click context menu with items, labels, and separators.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description: "Right-click to open a context menu with actions.",
      code: ContextMenuDemoSource,
      rawCode: ContextMenuDemoRaw,
      render: () => <ContextMenuDemo />,
    },
  ],
  usageImport: `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";`,
  usageCode: `<ContextMenu>
  <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuItem inset>Copy</ContextMenuItem>
      <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuLabel inset>Options</ContextMenuLabel>
    <ContextMenuCheckboxItem checked>Show toolbar</ContextMenuCheckboxItem>
    <ContextMenuRadioGroup value="default">
      <ContextMenuRadioItem value="default">Default</ContextMenuRadioItem>
      <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Twitter</ContextMenuItem>
        <ContextMenuItem>Email</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem>
      Preferences
      <ContextMenuShortcut>⌘,</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  composition: [
    "ContextMenu",
    "├── ContextMenuTrigger",
    "└── ContextMenuContent",
    "    ├── ContextMenuGroup",
    "    │   └── ContextMenuItem",
    "    ├── ContextMenuCheckboxItem",
    "    ├── ContextMenuRadioGroup",
    "    │   └── ContextMenuRadioItem",
    "    ├── ContextMenuSub",
    "    │   ├── ContextMenuSubTrigger",
    "    │   └── ContextMenuSubContent",
    "    ├── ContextMenuLabel",
    "    ├── ContextMenuSeparator",
    "    ├── ContextMenuPortal",
    "    └── ContextMenuShortcut",
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
      description: "Uncontrolled default open state.",
    },
    {
      name: "onOpenChange",
      type: "function",
      description: "Called when menu opens/closes.",
    },
    {
      name: "modal",
      type: "boolean",
      default: "true",
      description: "Whether menu is modal.",
    },
    {
      name: "ContextMenuItem.inset",
      type: "boolean",
      default: "false",
      description: "Indent the item to align with icon items.",
    },
    {
      name: "ContextMenuItem.variant",
      type: '"default" | "destructive"',
      default: '"default"',
      description: "Visual variant of the item.",
    },
    {
      name: "ContextMenuCheckboxItem.inset",
      type: "boolean",
      default: "false",
      description: "Indent the item to align with icon items.",
    },
    {
      name: "ContextMenuRadioItem.inset",
      type: "boolean",
      default: "false",
      description: "Indent the item to align with icon items.",
    },
    {
      name: "ContextMenuLabel.inset",
      type: "boolean",
      default: "false",
      description: "Indent the label to align with icon items.",
    },
  ],
  accessibility: [
    "Radix manages ARIA menu roles",
    "Arrow keys navigate items",
    "Escape closes the menu",
  ],
  basedOn: "radix",
  isNew: false,
};
