import type { ComponentMeta } from "./types";

import { ModeSwitcherDemo } from "../../demos/mode-switcher-demo";
import ModeSwitcherDemoSource from "../../demos/mode-switcher-demo.tsx?highlighted";
import ModeSwitcherDemoRaw from "../../demos/mode-switcher-demo.tsx?raw";

export const modeSwitcherMeta: ComponentMeta = {
  name: "mode-switcher",
  label: "Mode Switcher",
  description:
    "Dark/light theme toggle with a radial fullscreen reveal animation powered by the View Transitions API.",
  category: "Feedback",
  examples: [
    {
      title: "Basic",
      description:
        "Wire onModeChange to a useTheme hook that toggles the .dark/.light class on <html>.",
      code: ModeSwitcherDemoSource,
      rawCode: ModeSwitcherDemoRaw,
      render: () => <ModeSwitcherDemo />,
    },
  ],
  usageImport: `import { ModeSwitcher } from "@/components/ui/mode-switcher";`,
  usageCode: `<ModeSwitcher mode={mode} onModeChange={setMode} />`,
  props: [
    {
      name: "mode",
      type: '"dark" | "light"',
      default: "—",
      description: "Current color mode. Determines the icon shown.",
    },
    {
      name: "onModeChange",
      type: "(mode: Mode) => void",
      default: "—",
      description:
        "Called with the new mode when the user clicks the toggle. Apply the .dark or .light class to <html> here.",
    },
    {
      name: "variant",
      type: "ButtonVariant",
      default: '"ghost"',
      description:
        "Button variant. Inherits all Button variants (primary, secondary, outline, ghost, etc.).",
    },
    {
      name: "size",
      type: "ButtonSize",
      default: '"icon"',
      description:
        "Button size. Defaults to the icon size. Use icon-sm or icon-lg for smaller/larger toggles.",
    },
    {
      name: "className",
      type: "string",
      default: "—",
      description: "Additional classes for the toggle button.",
    },
  ],
  accessibility: [
    "Built on the Button component — keyboard accessible via Enter and Space.",
    'An aria-label reflects the next action (e.g. "Switch to light mode").',
    "The radial animation is skipped when prefers-reduced-motion is set.",
  ],
  radixBased: false,
  isNew: true,
  setup: {
    heading: "Add the View Transitions CSS to your global CSS file.",
    filename: "src/index.css",
    code: `/*
 * View Transitions — radial theme reveal.
 * Disables the default cross-fade so the clip-path circle is the
 * only visible animation. The new view sits on top of the old one.
 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 1;
}

::view-transition-old(root) {
  z-index: 0;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
  }
}`,
  },
};
