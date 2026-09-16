import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { ContextMenuBasicDemo } from "../../demos/context-menu-basic-demo";
import ContextMenuBasicDemoSource from "../../demos/context-menu-basic-demo.tsx?highlighted";
import ContextMenuBasicDemoRaw from "../../demos/context-menu-basic-demo.tsx?raw";
import { ContextMenuCheckboxesDemo } from "../../demos/context-menu-checkboxes-demo";
import ContextMenuCheckboxesDemoSource from "../../demos/context-menu-checkboxes-demo.tsx?highlighted";
import ContextMenuCheckboxesDemoRaw from "../../demos/context-menu-checkboxes-demo.tsx?raw";
import { ContextMenuDemo } from "../../demos/context-menu-demo";
import ContextMenuDemoSource from "../../demos/context-menu-demo.tsx?highlighted";
import ContextMenuDemoRaw from "../../demos/context-menu-demo.tsx?raw";
import { ContextMenuDestructiveDemo } from "../../demos/context-menu-destructive-demo";
import ContextMenuDestructiveDemoSource from "../../demos/context-menu-destructive-demo.tsx?highlighted";
import ContextMenuDestructiveDemoRaw from "../../demos/context-menu-destructive-demo.tsx?raw";
import { ContextMenuGroupsDemo } from "../../demos/context-menu-groups-demo";
import ContextMenuGroupsDemoSource from "../../demos/context-menu-groups-demo.tsx?highlighted";
import ContextMenuGroupsDemoRaw from "../../demos/context-menu-groups-demo.tsx?raw";
import { ContextMenuIconsDemo } from "../../demos/context-menu-icons-demo";
import ContextMenuIconsDemoSource from "../../demos/context-menu-icons-demo.tsx?highlighted";
import ContextMenuIconsDemoRaw from "../../demos/context-menu-icons-demo.tsx?raw";
import { ContextMenuRadioDemo } from "../../demos/context-menu-radio-demo";
import ContextMenuRadioDemoSource from "../../demos/context-menu-radio-demo.tsx?highlighted";
import ContextMenuRadioDemoRaw from "../../demos/context-menu-radio-demo.tsx?raw";
import { ContextMenuShortcutsDemo } from "../../demos/context-menu-shortcuts-demo";
import ContextMenuShortcutsDemoSource from "../../demos/context-menu-shortcuts-demo.tsx?highlighted";
import ContextMenuShortcutsDemoRaw from "../../demos/context-menu-shortcuts-demo.tsx?raw";
import { ContextMenuSidesDemo } from "../../demos/context-menu-sides-demo";
import ContextMenuSidesDemoSource from "../../demos/context-menu-sides-demo.tsx?highlighted";
import ContextMenuSidesDemoRaw from "../../demos/context-menu-sides-demo.tsx?raw";
import { ContextMenuSubmenuDemo } from "../../demos/context-menu-submenu-demo";
import ContextMenuSubmenuDemoSource from "../../demos/context-menu-submenu-demo.tsx?highlighted";
import ContextMenuSubmenuDemoRaw from "../../demos/context-menu-submenu-demo.tsx?raw";

export const contextMenuMeta: ComponentMeta = {
  name: "context-menu",
  label: "Context Menu",
  description: "Displays a menu of actions triggered by a right click.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description:
        "A complete context menu with submenus, checkboxes, radio groups, and shortcuts.",
      code: ContextMenuDemoSource,
      rawCode: ContextMenuDemoRaw,
      render: () => <ContextMenuDemo />,
    },
    {
      title: "Basic",
      description: "A simple context menu with a few actions.",
      code: ContextMenuBasicDemoSource,
      rawCode: ContextMenuBasicDemoRaw,
      render: () => <ContextMenuBasicDemo />,
    },
    {
      title: "Submenu",
      description: (
        <>
          Use <InlineCode>ContextMenuSub</InlineCode> to nest secondary actions.
        </>
      ),
      code: ContextMenuSubmenuDemoSource,
      rawCode: ContextMenuSubmenuDemoRaw,
      render: () => <ContextMenuSubmenuDemo />,
    },
    {
      title: "Shortcuts",
      description: (
        <>
          Add <InlineCode>ContextMenuShortcut</InlineCode> to show keyboard
          hints.
        </>
      ),
      code: ContextMenuShortcutsDemoSource,
      rawCode: ContextMenuShortcutsDemoRaw,
      render: () => <ContextMenuShortcutsDemo />,
    },
    {
      title: "Groups",
      description: "Group related actions and separate them with dividers.",
      code: ContextMenuGroupsDemoSource,
      rawCode: ContextMenuGroupsDemoRaw,
      render: () => <ContextMenuGroupsDemo />,
    },
    {
      title: "Icons",
      description: "Combine icons with labels for quick scanning.",
      code: ContextMenuIconsDemoSource,
      rawCode: ContextMenuIconsDemoRaw,
      render: () => <ContextMenuIconsDemo />,
    },
    {
      title: "Checkboxes",
      description: (
        <>
          Use <InlineCode>ContextMenuCheckboxItem</InlineCode> for toggles.
        </>
      ),
      code: ContextMenuCheckboxesDemoSource,
      rawCode: ContextMenuCheckboxesDemoRaw,
      render: () => <ContextMenuCheckboxesDemo />,
    },
    {
      title: "Radio",
      description: (
        <>
          Use <InlineCode>ContextMenuRadioItem</InlineCode> for exclusive
          choices.
        </>
      ),
      code: ContextMenuRadioDemoSource,
      rawCode: ContextMenuRadioDemoRaw,
      render: () => <ContextMenuRadioDemo />,
    },
    {
      title: "Destructive",
      description: (
        <>
          Use <InlineCode>variant=&quot;destructive&quot;</InlineCode> to style
          the menu item as destructive.
        </>
      ),
      code: ContextMenuDestructiveDemoSource,
      rawCode: ContextMenuDestructiveDemoRaw,
      render: () => <ContextMenuDestructiveDemo />,
    },
    {
      title: "Sides",
      description: "Control submenu placement with side and align props.",
      code: ContextMenuSidesDemoSource,
      rawCode: ContextMenuSidesDemoRaw,
      render: () => <ContextMenuSidesDemo />,
    },
  ],
  usageImport: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";`,
  usageCode: `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  composition: [
    "ContextMenu",
    "├── ContextMenuTrigger",
    "└── ContextMenuContent",
    "    ├── ContextMenuGroup",
    "    │   ├── ContextMenuLabel",
    "    │   ├── ContextMenuItem",
    "    │   └── ContextMenuItem",
    "    ├── ContextMenuSeparator",
    "    ├── ContextMenuGroup",
    "    │   ├── ContextMenuLabel",
    "    │   ├── ContextMenuCheckboxItem",
    "    │   └── ContextMenuCheckboxItem",
    "    ├── ContextMenuSeparator",
    "    ├── ContextMenuGroup",
    "    │   ├── ContextMenuLabel",
    "    │   └── ContextMenuRadioGroup",
    "    │       ├── ContextMenuRadioItem",
    "    │       └── ContextMenuRadioItem",
    "    └── ContextMenuSub",
    "        ├── ContextMenuSubTrigger",
    "        └── ContextMenuSubContent",
    "            └── ContextMenuGroup",
    "                ├── ContextMenuItem",
    "                └── ContextMenuItem",
  ],
  primitives: [
    {
      name: "ContextMenuItem",
      description: "A single selectable action in the menu.",
      props: [
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "Indent the item to align with icon items.",
        },
        {
          name: "variant",
          type: '"default" | "destructive"',
          default: '"default"',
          description: "Visual variant of the item.",
        },
      ],
    },
    {
      name: "ContextMenuSubTrigger",
      description: "Trigger that opens a nested sub-menu.",
      props: [
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "Indent the trigger to align with icon items.",
        },
      ],
    },
    {
      name: "ContextMenuCheckboxItem",
      description: "Toggleable item with a check indicator.",
      props: [
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "Indent the item to align with icon items.",
        },
      ],
    },
    {
      name: "ContextMenuRadioItem",
      description: "Single-choice item within a RadioGroup.",
      props: [
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "Indent the item to align with icon items.",
        },
      ],
    },
    {
      name: "ContextMenuLabel",
      description: "Non-interactive heading for a group.",
      props: [
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "Indent the label to align with icon items.",
        },
      ],
    },
  ],
  accessibility: [
    "Base UI manages ARIA menu roles, focus management, and keyboard navigation",
    "Arrow keys navigate items; Enter activates; Escape closes the menu",
    "Right-click or long-press opens the menu; touch devices show no context menu on tap",
    "Submenus open on hover or arrow-key navigation and flip on collision",
    "Use aria-label or ContextMenuLabel to provide accessible group names",
  ],
  apiReference: {
    label: "Base UI Context Menu",
    url: "https://base-ui.com/react/components/context-menu#api-reference",
  },
  basedOn: "base",
};
