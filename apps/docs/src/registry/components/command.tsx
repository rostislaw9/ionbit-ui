import type { ComponentMeta } from "./types";

import { CommandBasicDemo } from "../../demos/command-basic-demo";
import CommandBasicDemoSource from "../../demos/command-basic-demo.tsx?highlighted";
import CommandBasicDemoRaw from "../../demos/command-basic-demo.tsx?raw";
import { CommandDemo } from "../../demos/command-demo";
import CommandDemoSource from "../../demos/command-demo.tsx?highlighted";
import CommandDemoRaw from "../../demos/command-demo.tsx?raw";
import { CommandGroupsDemo } from "../../demos/command-groups-demo";
import CommandGroupsDemoSource from "../../demos/command-groups-demo.tsx?highlighted";
import CommandGroupsDemoRaw from "../../demos/command-groups-demo.tsx?raw";
import { CommandScrollableDemo } from "../../demos/command-scrollable-demo";
import CommandScrollableDemoSource from "../../demos/command-scrollable-demo.tsx?highlighted";
import CommandScrollableDemoRaw from "../../demos/command-scrollable-demo.tsx?raw";
import { CommandShortcutsDemo } from "../../demos/command-shortcuts-demo";
import CommandShortcutsDemoSource from "../../demos/command-shortcuts-demo.tsx?highlighted";
import CommandShortcutsDemoRaw from "../../demos/command-shortcuts-demo.tsx?raw";

export const commandMeta: ComponentMeta = {
  name: "command",
  label: "Command Palette",
  description:
    "A fast keyboard-driven command palette with fuzzy search, grouped items, and full keyboard navigation. Built on cmdk.",
  about: (
    <>
      Built on{" "}
      <a
        href="https://github.com/pacocoursey/cmdk"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        cmdk
      </a>{" "}
      by{" "}
      <a
        href="https://paco.sh"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        Paco Coursey
      </a>
      .
    </>
  ),
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description:
        "A command palette rendered inline with groups and shortcuts.",
      code: CommandDemoSource,
      rawCode: CommandDemoRaw,
      render: () => <CommandDemo />,
    },
    {
      title: "Basic",
      description: "A command menu opened via a button, wrapped in a dialog.",
      code: CommandBasicDemoSource,
      rawCode: CommandBasicDemoRaw,
      render: () => <CommandBasicDemo />,
    },
    {
      title: "Shortcuts",
      description: "Command items with keyboard shortcut hints.",
      code: CommandShortcutsDemoSource,
      rawCode: CommandShortcutsDemoRaw,
      render: () => <CommandShortcutsDemo />,
    },
    {
      title: "Groups",
      description: "Command menu with groups, icons, and separators.",
      code: CommandGroupsDemoSource,
      rawCode: CommandGroupsDemoRaw,
      render: () => <CommandGroupsDemo />,
    },
    {
      title: "Scrollable",
      description:
        "Scrollable command menu with many items across multiple groups.",
      code: CommandScrollableDemoSource,
      rawCode: CommandScrollableDemoRaw,
      render: () => <CommandScrollableDemo />,
    },
  ],
  usageImport: `import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";`,
  usageCode: `<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Action 1</CommandItem>
      <CommandItem>Action 2</CommandItem>
      <CommandShortcut>⌘A</CommandShortcut>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
</Command>

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No results.</CommandEmpty>
      <CommandGroup heading="Actions">
        <CommandItem>Action 1</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`,
  composition: [
    {
      heading: "Command",
      tree: [
        "Command",
        "├── CommandInput",
        "└── CommandList",
        "    ├── CommandGroup",
        "    │   ├── CommandItem",
        "    │   └── CommandShortcut",
        "    ├── CommandEmpty",
        "    └── CommandSeparator",
      ],
    },
    {
      heading: "Command Dialog",
      tree: ["CommandDialog", "└── Command (wrapped in Dialog)"],
    },
  ],
  props: [
    {
      name: "CommandDialog.open",
      type: "boolean",
      description: "Controlled open state of the dialog wrapper.",
    },
    {
      name: "CommandDialog.onOpenChange",
      type: "function",
      description: "Called when the dialog open state changes.",
    },
    {
      name: "CommandDialog.className",
      type: "string",
      default: "—",
      description: "Additional classes for the dialog content.",
    },
  ],
  accessibility: [
    "Screen reader title and description",
    "Keyboard navigable items",
    "Escape closes the palette",
  ],
  basedOn: "radix",
};
