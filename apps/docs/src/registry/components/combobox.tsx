import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { ComboboxAutoHighlightDemo } from "../../demos/combobox-auto-highlight-demo";
import ComboboxAutoHighlightDemoSource from "../../demos/combobox-auto-highlight-demo.tsx?highlighted";
import ComboboxAutoHighlightDemoRaw from "../../demos/combobox-auto-highlight-demo.tsx?raw";
import { ComboboxBasicDemo } from "../../demos/combobox-basic-demo";
import ComboboxBasicDemoSource from "../../demos/combobox-basic-demo.tsx?highlighted";
import ComboboxBasicDemoRaw from "../../demos/combobox-basic-demo.tsx?raw";
import { ComboboxClearDemo } from "../../demos/combobox-clear-demo";
import ComboboxClearDemoSource from "../../demos/combobox-clear-demo.tsx?highlighted";
import ComboboxClearDemoRaw from "../../demos/combobox-clear-demo.tsx?raw";
import { ComboboxCustomItemsDemo } from "../../demos/combobox-custom-items-demo";
import ComboboxCustomItemsDemoSource from "../../demos/combobox-custom-items-demo.tsx?highlighted";
import ComboboxCustomItemsDemoRaw from "../../demos/combobox-custom-items-demo.tsx?raw";
import { ComboboxDisabledDemo } from "../../demos/combobox-disabled-demo";
import ComboboxDisabledDemoSource from "../../demos/combobox-disabled-demo.tsx?highlighted";
import ComboboxDisabledDemoRaw from "../../demos/combobox-disabled-demo.tsx?raw";
import { ComboboxGroupsDemo } from "../../demos/combobox-groups-demo";
import ComboboxGroupsDemoSource from "../../demos/combobox-groups-demo.tsx?highlighted";
import ComboboxGroupsDemoRaw from "../../demos/combobox-groups-demo.tsx?raw";
import { ComboboxInputGroupDemo } from "../../demos/combobox-input-group-demo";
import ComboboxInputGroupDemoSource from "../../demos/combobox-input-group-demo.tsx?highlighted";
import ComboboxInputGroupDemoRaw from "../../demos/combobox-input-group-demo.tsx?raw";
import { ComboboxInvalidDemo } from "../../demos/combobox-invalid-demo";
import ComboboxInvalidDemoSource from "../../demos/combobox-invalid-demo.tsx?highlighted";
import ComboboxInvalidDemoRaw from "../../demos/combobox-invalid-demo.tsx?raw";
import { ComboboxMultipleDemo } from "../../demos/combobox-multiple-demo";
import ComboboxMultipleDemoSource from "../../demos/combobox-multiple-demo.tsx?highlighted";
import ComboboxMultipleDemoRaw from "../../demos/combobox-multiple-demo.tsx?raw";
import { ComboboxPopupDemo } from "../../demos/combobox-popup-demo";
import ComboboxPopupDemoSource from "../../demos/combobox-popup-demo.tsx?highlighted";
import ComboboxPopupDemoRaw from "../../demos/combobox-popup-demo.tsx?raw";

export const comboboxMeta: ComponentMeta = {
  name: "combobox",
  label: "Combobox",
  description:
    "Composable autocomplete built on Base UI, with InputGroup fields.",
  category: "Form",
  examples: [
    {
      title: "Basic",
      description: "A simple combobox with a list of frameworks.",
      code: ComboboxBasicDemoSource,
      rawCode: ComboboxBasicDemoRaw,
      render: () => <ComboboxBasicDemo />,
    },
    {
      title: "Multiple",
      description: (
        <>
          A combobox with multiple selection using{" "}
          <InlineCode>multiple</InlineCode> and{" "}
          <InlineCode>ComboboxChips</InlineCode>.
        </>
      ),
      code: ComboboxMultipleDemoSource,
      rawCode: ComboboxMultipleDemoRaw,
      render: () => <ComboboxMultipleDemo />,
    },
    {
      title: "Clear Button",
      description: (
        <>
          Use the <InlineCode>showClear</InlineCode> prop to show a clear
          button.
        </>
      ),
      code: ComboboxClearDemoSource,
      rawCode: ComboboxClearDemoRaw,
      render: () => <ComboboxClearDemo />,
    },
    {
      title: "Groups",
      description: (
        <>
          Use <InlineCode>ComboboxGroup</InlineCode> and{" "}
          <InlineCode>ComboboxSeparator</InlineCode> to group items.
        </>
      ),
      code: ComboboxGroupsDemoSource,
      rawCode: ComboboxGroupsDemoRaw,
      render: () => <ComboboxGroupsDemo />,
    },
    {
      title: "Custom Items",
      description: (
        <>
          You can render a custom component inside{" "}
          <InlineCode>ComboboxItem</InlineCode>.
        </>
      ),
      code: ComboboxCustomItemsDemoSource,
      rawCode: ComboboxCustomItemsDemoRaw,
      render: () => <ComboboxCustomItemsDemo />,
    },
    {
      title: "Invalid",
      description: (
        <>
          Use the <InlineCode>aria-invalid</InlineCode> prop to make the
          combobox invalid.
        </>
      ),
      code: ComboboxInvalidDemoSource,
      rawCode: ComboboxInvalidDemoRaw,
      render: () => <ComboboxInvalidDemo />,
    },
    {
      title: "Disabled",
      description: (
        <>
          Use the <InlineCode>disabled</InlineCode> prop to disable the
          combobox.
        </>
      ),
      code: ComboboxDisabledDemoSource,
      rawCode: ComboboxDisabledDemoRaw,
      render: () => <ComboboxDisabledDemo />,
    },
    {
      title: "Auto Highlight",
      description: (
        <>
          Use the <InlineCode>autoHighlight</InlineCode> prop to automatically
          highlight the first item on filter.
        </>
      ),
      code: ComboboxAutoHighlightDemoSource,
      rawCode: ComboboxAutoHighlightDemoRaw,
      render: () => <ComboboxAutoHighlightDemo />,
    },
    {
      title: "Popup",
      description: (
        <>
          You can trigger the combobox from a button or any other component by
          using the <InlineCode>render</InlineCode> prop. Move the{" "}
          <InlineCode>ComboboxInput</InlineCode> inside the{" "}
          <InlineCode>ComboboxContent</InlineCode>.
        </>
      ),
      code: ComboboxPopupDemoSource,
      rawCode: ComboboxPopupDemoRaw,
      render: () => <ComboboxPopupDemo />,
    },
    {
      title: "Input Group",
      description: (
        <>
          You can add an addon to the combobox by using the{" "}
          <InlineCode>InputGroupAddon</InlineCode> component inside the{" "}
          <InlineCode>ComboboxInput</InlineCode>.
        </>
      ),
      code: ComboboxInputGroupDemoSource,
      rawCode: ComboboxInputGroupDemoRaw,
      render: () => <ComboboxInputGroupDemo />,
    },
  ],
  usageImport: `import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";`,
  usageCode: `const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export function ExampleCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
  infoBlocks: [
    {
      title: "Custom Items",
      description: (
        <p>
          Use <InlineCode>itemToStringValue</InlineCode> when your items are
          objects.
        </p>
      ),
      code: `import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Framework = {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

export function ExampleComboboxCustomItems() {
  return (
    <Combobox
      items={frameworks}
      itemToStringValue={(framework) => framework.label}
    >
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
    },
    {
      title: "Multiple Selection",
      description: (
        <p>
          Use <InlineCode>multiple</InlineCode> with chips for multi-select
          behavior.
        </p>
      ),
      code: `import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleComboboxMultiple() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Combobox
      items={frameworks}
      multiple
      value={value}
      onValueChange={setValue}
    >
      <ComboboxChips>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
    },
  ],
  composition: [
    {
      heading: "Simple",
      description: (
        <>
          A single-line input and a flat list (see{" "}
          <a href="#demo-basic" className="text-accent hover:underline">
            Basic
          </a>
          ).
        </>
      ),
      tree: [
        "Combobox",
        "├── ComboboxInput",
        "└── ComboboxContent",
        "    ├── ComboboxEmpty",
        "    └── ComboboxList",
        "        ├── ComboboxItem",
        "        └── ComboboxItem",
      ],
    },
    {
      heading: "With chips",
      description: (
        <>
          Multi-select with <InlineCode>multiple</InlineCode>, chips, and a
          chips input (see{" "}
          <a href="#demo-multiple" className="text-accent hover:underline">
            Multiple
          </a>
          ).
        </>
      ),
      tree: [
        "Combobox",
        "├── ComboboxChips",
        "│   ├── ComboboxValue",
        "│   │   └── ComboboxChip",
        "│   └── ComboboxChipsInput",
        "└── ComboboxContent",
        "    ├── ComboboxEmpty",
        "    └── ComboboxList",
        "        ├── ComboboxItem",
        "        └── ComboboxItem",
      ],
    },
    {
      heading: "With groups",
      description: (
        <>
          Use <InlineCode>ComboboxGroup</InlineCode> with a{" "}
          <InlineCode>ComboboxLabel</InlineCode> child and a{" "}
          <InlineCode>ComboboxCollection</InlineCode> for items, plus a{" "}
          <InlineCode>ComboboxSeparator</InlineCode> between groups (see{" "}
          <a href="#demo-groups" className="text-accent hover:underline">
            Groups
          </a>
          ).
        </>
      ),
      tree: [
        "Combobox",
        "├── ComboboxInput",
        "└── ComboboxContent",
        "    ├── ComboboxEmpty",
        "    └── ComboboxList",
        "        ├── ComboboxGroup",
        "        │   ├── ComboboxLabel",
        "        │   └── ComboboxCollection",
        "        │       ├── ComboboxItem",
        "        │       ├── ComboboxItem",
        "        ├── ComboboxSeparator",
        "        └── ComboboxGroup",
        "            ├── ComboboxLabel",
        "            └── ComboboxCollection",
        "                ├── ComboboxItem",
        "                └── ComboboxItem",
      ],
    },
  ],
  props: [
    {
      name: "items",
      type: "readonly string[] | readonly ComboboxItemData[] | readonly ComboboxGroup[]",
      description:
        "Flat list of items or grouped items with label and items array.",
    },
    {
      name: "value",
      type: "string | string[]",
      description: "Controlled selected value (single) or values (multiple).",
    },
    {
      name: "defaultValue",
      type: "string | string[]",
      description: "Uncontrolled default value (single) or values (multiple).",
    },
    {
      name: "onValueChange",
      type: "(value: string | string[]) => void",
      description: "Called when the user selects or deselects an item.",
    },
    {
      name: "itemToStringValue",
      type: "(item: ComboboxItemData) => string",
      description:
        "Convert an item object to its string value for selection. Defaults to (item) => item.value.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state of the popover.",
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
      description: "Called when the popover open state changes.",
    },
    {
      name: "multiple",
      type: "boolean",
      default: "false",
      description: "Enable multi-select with removable chips.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the combobox.",
    },
    {
      name: "autoHighlight",
      type: "boolean",
      default: "false",
      description: "Automatically highlight the first matching item on filter.",
    },
    {
      name: "ComboboxInput.placeholder",
      type: "string",
      description: "Placeholder for the editable inline search field.",
    },
    {
      name: "ComboboxInput.showTrigger",
      type: "boolean",
      default: "true",
      description: "Show the popup toggle next to the editable input.",
    },
    {
      name: "ComboboxInput.showClear",
      type: "boolean",
      default: "false",
      description:
        "Replace the chevron with a clear action when a value is selected.",
    },
    {
      name: "ComboboxTrigger.render",
      type: "Element",
      description:
        "Render as a custom element (e.g. a Button) for custom popup triggers.",
    },
    {
      name: "ComboboxContent.side",
      type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
      default: '"bottom"',
      description: "Side of the anchor the popup is placed on.",
    },
    {
      name: "ComboboxContent.align",
      type: '"start" | "center" | "end"',
      default: '"start"',
      description: "Alignment of the popup relative to the anchor.",
    },
    {
      name: "ComboboxContent.sideOffset",
      type: "number",
      default: "6",
      description: "Distance between the anchor and the popup in pixels.",
    },
    {
      name: "ComboboxContent.alignOffset",
      type: "number",
      default: "0",
      description: "Offset along the align axis in pixels.",
    },
    {
      name: "ComboboxContent.anchor",
      type: "RefObject<HTMLDivElement | null>",
      description:
        "Anchor the popup to the chips container in multiple mode. Pass the same ref from useComboboxAnchor.",
    },
    {
      name: "ComboboxList.children",
      type: "ReactNode | ((item: ComboboxItemData, index: number) => ReactNode)",
      description:
        "Render items from the collection, or supply composed groups and items.",
    },
    {
      name: "ComboboxItem.value",
      type: "string | ComboboxItemData",
      description:
        "The item value. When an object is passed, itemToStringValue converts it to a string for selection.",
    },
    {
      name: "ComboboxValue",
      type: "ReactNode | ((values: string[]) => ReactNode)",
      description:
        "Render the selected value(s). Without children, displays the selected label(s).",
    },
    {
      name: "ComboboxChip.showRemove",
      type: "boolean",
      default: "true",
      description: "Show the remove button inside the chip.",
    },
    {
      name: "useComboboxAnchor",
      type: "() => RefObject<HTMLDivElement | null>",
      description:
        "Hook returning a ref to anchor the popup to the chips container in multiple mode.",
    },
  ],
  accessibility: [
    "The editable input has aria-expanded reflecting popup state and aria-activedescendant tracking the active item.",
    "Base UI handles focus management, keyboard navigation (Arrow, Enter, Escape, Home, End), ARIA attributes, and listbox semantics.",
    "Arrow keys navigate, Enter selects, and Escape closes the popup while retaining input focus.",
    "Use aria-label or aria-labelledby to label the input, and aria-invalid for validation states.",
    "Supply disabled on Combobox to disable the input and selection controls together.",
  ],
  basedOn: "base",
  isNew: true,
};
