import type { ComponentMeta } from "./types";

import { DropdownMenuAvatarDemo } from "../../demos/dropdown-menu-avatar-demo";
import DropdownMenuAvatarDemoSource from "../../demos/dropdown-menu-avatar-demo.tsx?highlighted";
import DropdownMenuAvatarDemoRaw from "../../demos/dropdown-menu-avatar-demo.tsx?raw";
import { DropdownMenuBasicDemo } from "../../demos/dropdown-menu-basic-demo";
import DropdownMenuBasicDemoSource from "../../demos/dropdown-menu-basic-demo.tsx?highlighted";
import DropdownMenuBasicDemoRaw from "../../demos/dropdown-menu-basic-demo.tsx?raw";
import { DropdownMenuCheckboxesDemo } from "../../demos/dropdown-menu-checkboxes-demo";
import DropdownMenuCheckboxesDemoSource from "../../demos/dropdown-menu-checkboxes-demo.tsx?highlighted";
import DropdownMenuCheckboxesDemoRaw from "../../demos/dropdown-menu-checkboxes-demo.tsx?raw";
import { DropdownMenuCheckboxesIconsDemo } from "../../demos/dropdown-menu-checkboxes-icons-demo";
import DropdownMenuCheckboxesIconsDemoSource from "../../demos/dropdown-menu-checkboxes-icons-demo.tsx?highlighted";
import DropdownMenuCheckboxesIconsDemoRaw from "../../demos/dropdown-menu-checkboxes-icons-demo.tsx?raw";
import { DropdownMenuComplexDemo } from "../../demos/dropdown-menu-complex-demo";
import DropdownMenuComplexDemoSource from "../../demos/dropdown-menu-complex-demo.tsx?highlighted";
import DropdownMenuComplexDemoRaw from "../../demos/dropdown-menu-complex-demo.tsx?raw";
import { DropdownMenuDemo } from "../../demos/dropdown-menu-demo";
import DropdownMenuDemoSource from "../../demos/dropdown-menu-demo.tsx?highlighted";
import DropdownMenuDemoRaw from "../../demos/dropdown-menu-demo.tsx?raw";
import { DropdownMenuDestructiveDemo } from "../../demos/dropdown-menu-destructive-demo";
import DropdownMenuDestructiveDemoSource from "../../demos/dropdown-menu-destructive-demo.tsx?highlighted";
import DropdownMenuDestructiveDemoRaw from "../../demos/dropdown-menu-destructive-demo.tsx?raw";
import { DropdownMenuIconsDemo } from "../../demos/dropdown-menu-icons-demo";
import DropdownMenuIconsDemoSource from "../../demos/dropdown-menu-icons-demo.tsx?highlighted";
import DropdownMenuIconsDemoRaw from "../../demos/dropdown-menu-icons-demo.tsx?raw";
import { DropdownMenuRadioGroupDemo } from "../../demos/dropdown-menu-radio-group-demo";
import DropdownMenuRadioGroupDemoSource from "../../demos/dropdown-menu-radio-group-demo.tsx?highlighted";
import DropdownMenuRadioGroupDemoRaw from "../../demos/dropdown-menu-radio-group-demo.tsx?raw";
import { DropdownMenuRadioIconsDemo } from "../../demos/dropdown-menu-radio-icons-demo";
import DropdownMenuRadioIconsDemoSource from "../../demos/dropdown-menu-radio-icons-demo.tsx?highlighted";
import DropdownMenuRadioIconsDemoRaw from "../../demos/dropdown-menu-radio-icons-demo.tsx?raw";
import { DropdownMenuShortcutsDemo } from "../../demos/dropdown-menu-shortcuts-demo";
import DropdownMenuShortcutsDemoSource from "../../demos/dropdown-menu-shortcuts-demo.tsx?highlighted";
import DropdownMenuShortcutsDemoRaw from "../../demos/dropdown-menu-shortcuts-demo.tsx?raw";
import { DropdownMenuSubmenuDemo } from "../../demos/dropdown-menu-submenu-demo";
import DropdownMenuSubmenuDemoSource from "../../demos/dropdown-menu-submenu-demo.tsx?highlighted";
import DropdownMenuSubmenuDemoRaw from "../../demos/dropdown-menu-submenu-demo.tsx?raw";

export const dropdownMenuMeta: ComponentMeta = {
  name: "dropdown-menu",
  label: "Dropdown Menu",
  description:
    "A menu of actions triggered by a button, with items, labels, separators, shortcuts, and full keyboard navigation.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description:
        "Menu with groups, shortcuts, a nested submenu, and a disabled item.",
      code: DropdownMenuDemoSource,
      rawCode: DropdownMenuDemoRaw,
      render: () => <DropdownMenuDemo />,
    },
    {
      title: "Basic",
      description:
        "Basic menu with groups, a label, a separator, and a disabled item.",
      code: DropdownMenuBasicDemoSource,
      rawCode: DropdownMenuBasicDemoRaw,
      render: () => <DropdownMenuBasicDemo />,
    },
    {
      title: "Submenu",
      description:
        "Nested menus with DropdownMenuSub, SubTrigger, and SubContent.",
      code: DropdownMenuSubmenuDemoSource,
      rawCode: DropdownMenuSubmenuDemoRaw,
      render: () => <DropdownMenuSubmenuDemo />,
    },
    {
      title: "Shortcuts",
      description: "Keyboard hints rendered with DropdownMenuShortcut.",
      code: DropdownMenuShortcutsDemoSource,
      rawCode: DropdownMenuShortcutsDemoRaw,
      render: () => <DropdownMenuShortcutsDemo />,
    },
    {
      title: "Icons",
      description:
        "Items with leading icons and a destructive sign-out action.",
      code: DropdownMenuIconsDemoSource,
      rawCode: DropdownMenuIconsDemoRaw,
      render: () => <DropdownMenuIconsDemo />,
    },
    {
      title: "Checkboxes",
      description: "Toggleable options with DropdownMenuCheckboxItem.",
      code: DropdownMenuCheckboxesDemoSource,
      rawCode: DropdownMenuCheckboxesDemoRaw,
      render: () => <DropdownMenuCheckboxesDemo />,
    },
    {
      title: "Checkboxes with Icons",
      description: "Checkbox items combined with leading icons.",
      code: DropdownMenuCheckboxesIconsDemoSource,
      rawCode: DropdownMenuCheckboxesIconsDemoRaw,
      render: () => <DropdownMenuCheckboxesIconsDemo />,
    },
    {
      title: "Radio Group",
      description:
        "Exclusive choice with DropdownMenuRadioGroup and RadioItem.",
      code: DropdownMenuRadioGroupDemoSource,
      rawCode: DropdownMenuRadioGroupDemoRaw,
      render: () => <DropdownMenuRadioGroupDemo />,
    },
    {
      title: "Radio with Icons",
      description: "Radio items combined with leading icons.",
      code: DropdownMenuRadioIconsDemoSource,
      rawCode: DropdownMenuRadioIconsDemoRaw,
      render: () => <DropdownMenuRadioIconsDemo />,
    },
    {
      title: "Destructive",
      description:
        "An irreversible action styled with the destructive variant.",
      code: DropdownMenuDestructiveDemoSource,
      rawCode: DropdownMenuDestructiveDemoRaw,
      render: () => <DropdownMenuDestructiveDemo />,
    },
    {
      title: "Avatar",
      description: "An account switcher menu triggered by an avatar.",
      code: DropdownMenuAvatarDemoSource,
      rawCode: DropdownMenuAvatarDemoRaw,
      render: () => <DropdownMenuAvatarDemo />,
    },
    {
      title: "Complex",
      description:
        "A richer menu combining groups, icons, checkboxes, radios, and submenus.",
      code: DropdownMenuComplexDemoSource,
      rawCode: DropdownMenuComplexDemoRaw,
      render: () => <DropdownMenuComplexDemo />,
    },
  ],
  usageImport: `import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`,
  usageCode: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="secondary" />}>
    Open Menu
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  composition: [
    "DropdownMenu",
    "├── DropdownMenuTrigger",
    "└── DropdownMenuContent",
    "    ├── DropdownMenuGroup",
    "    │   ├── DropdownMenuLabel",
    "    │   ├── DropdownMenuItem",
    "    │   └── DropdownMenuItem",
    "    ├── DropdownMenuSeparator",
    "    ├── DropdownMenuGroup",
    "    │   ├── DropdownMenuLabel",
    "    │   ├── DropdownMenuCheckboxItem",
    "    │   └── DropdownMenuCheckboxItem",
    "    ├── DropdownMenuSeparator",
    "    ├── DropdownMenuGroup",
    "    │   ├── DropdownMenuLabel",
    "    │   └── DropdownMenuRadioGroup",
    "    │       ├── DropdownMenuRadioItem",
    "    │       └── DropdownMenuRadioItem",
    "    └── DropdownMenuSub",
    "        ├── DropdownMenuSubTrigger",
    "        └── DropdownMenuSubContent",
    "            └── DropdownMenuGroup",
    "                ├── DropdownMenuLabel",
    "                ├── DropdownMenuItem",
    "                └── DropdownMenuItem",
  ],
  primitives: [
    {
      name: "DropdownMenuContent",
      description:
        "The floating panel containing menu items. Positioner props from Base UI are flattened onto this component.",
      props: [
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right" | "inline-end" | "inline-start"',
          default: '"bottom"',
          description: "Preferred side of the trigger.",
        },
        {
          name: "sideOffset",
          type: "number",
          default: "4",
          description: "Distance in pixels from the trigger.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          default: '"start"',
          description: "Alignment against the trigger.",
        },
        {
          name: "alignOffset",
          type: "number",
          default: "0",
          description: "Offset along the alignment axis.",
        },
      ],
    },
    {
      name: "DropdownMenuLabel",
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
    {
      name: "DropdownMenuItem",
      description: "A single selectable action in the menu.",
      props: [
        {
          name: "variant",
          type: '"default" | "destructive"',
          default: '"default"',
          description: "Visual variant of the item.",
        },
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "Indent the item to align with icon items.",
        },
      ],
    },
    {
      name: "DropdownMenuCheckboxItem",
      description:
        "Toggleable item with a check indicator. Stays open on toggle.",
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
      name: "DropdownMenuRadioItem",
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
      name: "DropdownMenuSubTrigger",
      description: "Item that opens a nested sub-menu and shows a chevron.",
      props: [
        {
          name: "inset",
          type: "boolean",
          default: "false",
          description: "Indent the trigger to align with icon items.",
        },
      ],
    },
  ],
  accessibility: [
    "Base UI manages ARIA menu roles, focus management, and keyboard navigation",
    "Arrow keys navigate items; Enter activates; Escape closes the menu",
    "Submenus open on hover or arrow-key navigation and flip on collision",
    "The trigger exposes aria-haspopup and aria-expanded",
    "Checkbox and radio items expose their checked state to assistive technology",
  ],
  apiReference: {
    label: "Base UI Menu",
    url: "https://base-ui.com/react/components/menu#api-reference",
  },
  basedOn: "base",
};
