import type { ComponentMeta } from "./types";

import { TypewriterDemo } from "../../demos/typewriter-demo";
import TypewriterDemoSource from "../../demos/typewriter-demo.tsx?highlighted";
import TypewriterDemoRaw from "../../demos/typewriter-demo.tsx?raw";

export const typewriterMeta: ComponentMeta = {
  name: "typewriter",
  label: "Typewriter",
  description:
    "Text appears character by character with a trailing block caret, like a terminal printing output. Applies to every text node inside — plain text or whole cards. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description:
        "Staggered lines type out when the block enters the viewport.",
      code: TypewriterDemoSource,
      rawCode: TypewriterDemoRaw,
      render: () => <TypewriterDemo />,
    },
  ],
  usageImport: `import { Typewriter } from "@/components/motion/typewriter";`,
  usageCode: `<Typewriter as="p">stream online</Typewriter>`,
  props: [
    {
      name: "speed",
      type: "number",
      default: "30",
      description: "Milliseconds per character.",
    },
    {
      name: "caret",
      type: "boolean",
      default: "true",
      description:
        "Trailing block caret while typing; keeps blinking once settled.",
    },
    {
      name: "delay",
      type: "number",
      default: "0",
      description: "Delay before typing starts once triggered, in ms.",
    },
    {
      name: "trigger",
      type: '"mount" | "view" | "hover" | "focus"',
      default: '"view"',
      description:
        'When typing plays. "mount" types once, immediately — before first paint, so no finished text flashes first.',
    },
    {
      name: "once",
      type: "boolean",
      default: "true",
      description: 'With trigger="view": type only on first reveal.',
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
      description: "Called after each typing pass completes.",
    },
    {
      name: "as",
      type: '"span" | "div" | "p"',
      default: '"span"',
      description: "Render as a different element.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the effect — renders the content as-is.",
    },
    {
      name: "data-motion-skip",
      type: "attribute",
      description:
        "Mark any descendant to keep its text untouched — badges, icons, live values.",
    },
  ],
  accessibility: [
    "While typing, the element is aria-hidden and a visually-hidden sibling exposes the full text to screen readers; at rest the content is fully accessible",
    "Renders the content as-is when reduced motion is active",
    "The caret is decorative and aria-hidden",
    "Nested Typewriter instances type only their own text",
  ],
};
