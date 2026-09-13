import type { ManifestEntry } from "../manifest";
import type { ComponentCategory } from "./types";

/**
 * Lightweight component manifest — contains only the metadata needed by
 * the sidebar and components list (name, label, category, description,
 * example count). This avoids pulling in all demo components, ?raw, and
 * ?highlighted strings that the full registry files import.
 */
export const componentManifest: ManifestEntry[] = [
  {
    name: "accordion",
    label: "Accordion",
    category: "Layout",
    description: "Collapsible sections with chevron indicator.",
    exampleCount: 1,
  },
  {
    name: "alert",
    label: "Alert",
    category: "Feedback",
    description:
      "Callout for surfacing status messages with semantic variants.",
    exampleCount: 3,
  },
  {
    name: "alert-dialog",
    label: "Alert Dialog",
    category: "Overlay",
    description: "Modal confirmation dialog.",
    exampleCount: 1,
  },
  {
    name: "avatar",
    label: "Avatar",
    category: "Layout",
    description: "Avatar with image and fallback support.",
    exampleCount: 4,
  },
  {
    name: "badge",
    label: "Badge",
    category: "Feedback",
    description: "Small status indicator with soft and text variants.",
    exampleCount: 8,
  },
  {
    name: "breadcrumb",
    label: "Breadcrumb",
    category: "Navigation",
    description: "Navigation trail showing the user's location in a hierarchy.",
    exampleCount: 2,
  },
  {
    name: "button",
    label: "Button",
    category: "Form",
    description:
      "Triggers an action. Eight variants, icon support, accent glow.",
    exampleCount: 5,
  },
  {
    name: "button-group",
    label: "Button Group",
    category: "Form",
    description:
      "Groups related buttons with separators, text, and nesting support.",
    exampleCount: 11,
  },
  {
    name: "card",
    label: "Card",
    category: "Layout",
    description: "Container with header, content, and footer sections.",
    exampleCount: 2,
  },
  {
    name: "empty",
    label: "Empty",
    category: "Feedback",
    description: "Placeholder for empty states with structured subcomponents.",
    exampleCount: 2,
  },
  {
    name: "checkbox",
    label: "Checkbox",
    category: "Form",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    exampleCount: 1,
  },
  {
    name: "collapsible",
    label: "Collapsible",
    category: "Layout",
    description:
      "Single expand/collapse section. Simpler than Accordion for one toggle.",
    exampleCount: 4,
    isNew: true,
  },
  {
    name: "field",
    label: "Field",
    category: "Form",
    description:
      "Combine labels, controls, and help text to compose accessible form fields and grouped inputs.",
    exampleCount: 11,
    isNew: true,
  },
  {
    name: "combobox",
    label: "Combobox",
    category: "Form",
    description: "Searchable dropdown composing Popover, Command, and Button.",
    exampleCount: 10,
    isNew: true,
  },
  {
    name: "command",
    label: "Command",
    category: "Overlay",
    description: "Command palette built on cmdk.",
    exampleCount: 1,
  },
  {
    name: "context-menu",
    label: "Context Menu",
    category: "Overlay",
    description: "Right-click menu.",
    exampleCount: 1,
  },
  {
    name: "dialog",
    label: "Dialog",
    category: "Overlay",
    description: "Modal window with overlay.",
    exampleCount: 1,
  },
  {
    name: "dropdown-menu",
    label: "Dropdown Menu",
    category: "Overlay",
    description: "Menu triggered by a button.",
    exampleCount: 1,
  },
  {
    name: "glow",
    label: "Glow",
    category: "Motion",
    description: "State-driven accent halo on hover/focus.",
    exampleCount: 4,
  },
  {
    name: "hover-card",
    label: "Hover Card",
    category: "Overlay",
    description: "Card that appears on hover.",
    exampleCount: 1,
  },
  {
    name: "input",
    label: "Input",
    category: "Form",
    description: "Text input field.",
    exampleCount: 2,
  },
  {
    name: "input-group",
    label: "Input Group",
    category: "Form",
    description:
      "Groups an input with leading or trailing addons, buttons, and text.",
    exampleCount: 4,
  },
  {
    name: "label",
    label: "Label",
    category: "Form",
    description: "Accessible form label.",
    exampleCount: 2,
  },
  {
    name: "mode-switcher",
    label: "Mode Switcher",
    category: "Feedback",
    description:
      "Dark/light theme toggle with a radial fullscreen reveal animation.",
    exampleCount: 1,
    isNew: true,
  },
  {
    name: "native-select",
    label: "Native Select",
    category: "Form",
    description: "Styled native HTML select with custom chevron.",
    exampleCount: 2,
  },
  {
    name: "magnetic",
    label: "Magnetic",
    category: "Motion",
    description: "Spring-based cursor attraction.",
    exampleCount: 1,
  },
  {
    name: "pagination",
    label: "Pagination",
    category: "Navigation",
    description: "Page navigation controls.",
    exampleCount: 1,
  },
  {
    name: "popover",
    label: "Popover",
    category: "Overlay",
    description: "Floating content triggered by click.",
    exampleCount: 1,
  },
  {
    name: "progress",
    label: "Progress",
    category: "Feedback",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    exampleCount: 3,
  },
  {
    name: "pulse",
    label: "Pulse",
    category: "Motion",
    description: "Periodic accent halo for active status.",
    exampleCount: 2,
  },
  {
    name: "radio-group",
    label: "Radio Group",
    category: "Form",
    description:
      "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
    exampleCount: 6,
  },
  {
    name: "reveal",
    label: "Reveal",
    category: "Motion",
    description: "In-view entrance animation.",
    exampleCount: 1,
  },
  {
    name: "scroll-area",
    label: "Scroll Area",
    category: "Layout",
    description: "Custom-styled scrollable region.",
    exampleCount: 1,
  },
  {
    name: "select",
    label: "Select",
    category: "Form",
    description: "Dropdown select input.",
    exampleCount: 1,
  },
  {
    name: "separator",
    label: "Separator",
    category: "Layout",
    description: "Visually or semantically separates content.",
    exampleCount: 4,
  },
  {
    name: "sheet",
    label: "Sheet",
    category: "Overlay",
    description: "Side panel that slides in.",
    exampleCount: 3,
  },
  {
    name: "skeleton",
    label: "Skeleton",
    category: "Feedback",
    description: "Loading placeholder.",
    exampleCount: 1,
  },
  {
    name: "spinner",
    label: "Spinner",
    category: "Feedback",
    description:
      "Animated loading indicator icon for buttons and async states.",
    exampleCount: 2,
  },
  {
    name: "slider",
    label: "Slider",
    category: "Form",
    description: "Range input slider.",
    exampleCount: 1,
  },
  {
    name: "spotlight",
    label: "Spotlight",
    category: "Motion",
    description: "Pointer-following radial highlight.",
    exampleCount: 2,
  },
  {
    name: "switch",
    label: "Switch",
    category: "Form",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    exampleCount: 6,
  },
  {
    name: "table",
    label: "Table",
    category: "Data",
    description:
      "Responsive table with header, body, footer, rows, cells, and caption.",
    exampleCount: 1,
  },
  {
    name: "tabs",
    label: "Tabs",
    category: "Navigation",
    description: "Tabbed content sections.",
    exampleCount: 1,
  },
  {
    name: "textarea",
    label: "Textarea",
    category: "Form",
    description: "Multi-line text input.",
    exampleCount: 2,
  },
  {
    name: "toast",
    label: "Toast",
    category: "Feedback",
    description: "Transient notification. Built on Sonner.",
    exampleCount: 5,
  },
  {
    name: "toggle",
    label: "Toggle",
    category: "Form",
    description: "A two-state button that can be either on or off.",
    exampleCount: 5,
  },
  {
    name: "toggle-group",
    label: "Toggle Group",
    category: "Form",
    description:
      "A set of two-state buttons with single or multiple selection.",
    exampleCount: 6,
  },
  {
    name: "tooltip",
    label: "Tooltip",
    category: "Overlay",
    description: "Hover-triggered label.",
    exampleCount: 1,
  },
];

export const componentCategories: ComponentCategory[] = [
  "Form",
  "Layout",
  "Overlay",
  "Feedback",
  "Navigation",
  "Data",
  "Motion",
];
