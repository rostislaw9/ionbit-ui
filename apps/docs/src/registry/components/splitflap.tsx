import type { ComponentMeta } from "./types";

import { SplitFlapBoardDemo } from "../../demos/splitflap-board-demo";
import SplitFlapBoardDemoSource from "../../demos/splitflap-board-demo.tsx?highlighted";
import SplitFlapBoardDemoRaw from "../../demos/splitflap-board-demo.tsx?raw";
import { SplitFlapClockDemo } from "../../demos/splitflap-clock-demo";
import SplitFlapClockDemoSource from "../../demos/splitflap-clock-demo.tsx?highlighted";
import SplitFlapClockDemoRaw from "../../demos/splitflap-clock-demo.tsx?raw";

export const splitflapMeta: ComponentMeta = {
  name: "splitflap",
  label: "SplitFlap",
  description:
    "Text flips into place like an airport departure board — each character is a hinged card: the top half falls, the bottom half unfolds, and it lands on the next glyph. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Clock",
      description:
        "A live clock flips every second — only the changed digits cycle; colons snap instantly.",
      code: SplitFlapClockDemoSource,
      rawCode: SplitFlapClockDemoRaw,
      render: () => <SplitFlapClockDemo />,
    },
    {
      title: "Departure board",
      description:
        "Status words keep flipping as they change — each character advances forward through the drum from its previous glyph.",
      code: SplitFlapBoardDemoSource,
      rawCode: SplitFlapBoardDemoRaw,
      render: () => <SplitFlapBoardDemo />,
    },
  ],
  usageImport: `import { SplitFlap } from "@/components/motion/splitflap";`,
  usageCode: `<SplitFlap charset="0123456789">14:22</SplitFlap>`,
  props: [
    {
      name: "children",
      type: "ReactNode",
      description:
        "Content whose text flips in — all descendant text animates in place. Changed children re-flip only the characters that differ.",
    },
    {
      name: "charset",
      type: "string",
      default: '"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "',
      description:
        "Glyph wheel the flaps cycle through, in order — the trailing space is the drum's blank card. Chars outside the set render instantly.",
    },
    {
      name: "flaps",
      type: "number",
      default: "full wheel",
      description:
        "Max forward flips per character. Defaults to the full drum — every hop runs its true distance; pass a number to cap it (the path then starts mid-wheel and lands on target).",
    },
    {
      name: "interval",
      type: "number",
      default: "160",
      description:
        "Base milliseconds per card flip — long runs whip fast and decelerate into the landing card like a real drum.",
    },
    {
      name: "stagger",
      type: "number",
      default: "30",
      description:
        "Milliseconds between each character's first flip — the left-to-right cascade.",
    },
    {
      name: "delay",
      type: "number",
      default: "0",
      description: "Delay in ms before flipping starts once triggered.",
    },
    {
      name: "trigger",
      type: '"mount" | "view" | "hover" | "focus"',
      default: '"view"',
      description:
        'When flipping plays. "mount" flips once before first paint; "view" on scroll into view; "hover"/"focus" replay on interaction.',
    },
    {
      name: "once",
      type: "boolean",
      default: "true",
      description: 'With trigger="view": flip only on first reveal.',
    },
    {
      name: "threshold",
      type: "number",
      default: "0.4",
      description: "IntersectionObserver threshold for the view trigger.",
    },
    {
      name: "cards",
      type: "boolean",
      default: "false",
      description:
        "Wrap the module row in a merged card fill — the departure-board strip look. Theme via --splitflap-card-bg.",
    },
    {
      name: "onComplete",
      type: "() => void",
      description: "Called after each flip pass completes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the effect — renders content as-is.",
    },
    {
      name: "as",
      type: '"span" | "div" | "p"',
      default: '"span"',
      description: "Render as a different element.",
    },
    {
      name: "data-motion-skip",
      type: "attribute",
      description:
        "Put on any descendant element to keep its text out of the flips — its subtree is left untouched.",
    },
  ],
  accessibility: [
    "While flipping, the element is aria-hidden and a visually-hidden sibling exposes the real text to screen readers",
    "Renders the final text instantly when reduced motion is active",
    "Animated characters flip in per-module cells anchored at each glyph's position — prefer font-mono so every glyph shares one advance width",
  ],
};
