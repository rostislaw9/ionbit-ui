import type { ComponentMeta } from "./types";

import { CounterDemo } from "../../demos/counter-demo";
import CounterDemoSource from "../../demos/counter-demo.tsx?highlighted";
import CounterDemoRaw from "../../demos/counter-demo.tsx?raw";

export const counterMeta: ComponentMeta = {
  name: "counter",
  label: "Counter",
  description:
    "A number rolls up to its value with an ease-out curve. Counts on first reveal or hover, and re-counts whenever the value changes. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description:
        "Stats count up when they enter the viewport — decimals, grouping, and a custom from value.",
      code: CounterDemoSource,
      rawCode: CounterDemoRaw,
      render: () => <CounterDemo />,
    },
  ],
  usageImport: `import { Counter } from "@/components/motion/counter";`,
  usageCode: `<Counter value={1248} />`,
  props: [
    {
      name: "value",
      type: "number",
      description: "Target value — animates to it whenever it changes.",
    },
    {
      name: "from",
      type: "number",
      default: "0",
      description: "Value the first animation starts from.",
    },
    {
      name: "duration",
      type: "number",
      default: "1200",
      description: "Count duration in ms.",
    },
    {
      name: "decimals",
      type: "number",
      default: "0",
      description: "Fraction digits shown.",
    },
    {
      name: "format",
      type: "(value: number) => string",
      description: "Formats the displayed value — overrides decimals.",
    },
    {
      name: "trigger",
      type: '"view" | "hover"',
      default: '"view"',
      description: "When the count plays.",
    },
    {
      name: "once",
      type: "boolean",
      default: "true",
      description: 'With trigger="view": count only on first reveal.',
    },
    {
      name: "threshold",
      type: "number",
      default: "0.4",
      description: "IntersectionObserver threshold for the view trigger.",
    },
    {
      name: "onComplete",
      type: "() => void",
      description: "Called after each count completes.",
    },
    {
      name: "as",
      type: '"span" | "div"',
      default: '"span"',
      description: "Render as a different element.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the effect — renders the final value.",
    },
  ],
  accessibility: [
    "While counting, the element is aria-hidden and a visually-hidden sibling exposes the final value to screen readers",
    "Renders the final value instantly when reduced motion is active",
  ],
};
