import type { ComponentMeta } from "./types";

import { CommandDemo } from "../../demos/command-demo";
import CommandDemoSource from "../../demos/command-demo.tsx?highlighted";
import CommandDemoRaw from "../../demos/command-demo.tsx?raw";

export const commandMeta: ComponentMeta = {
  name: "command",
  label: "Command Palette",
  description: "Cmd+k command palette with search input, groups, and items.",
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
      description: "Command palette with search, grouped items, and actions.",
      code: CommandDemoSource,
      rawCode: CommandDemoRaw,
      render: () => <CommandDemo />,
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
  isNew: false,
};
