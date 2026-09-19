import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/code/InlineCode";
import { ScrambleDemo } from "../../demos/scramble-demo";
import ScrambleDemoSource from "../../demos/scramble-demo.tsx?highlighted";
import ScrambleDemoRaw from "../../demos/scramble-demo.tsx?raw";
import { ScrambleStateDemo } from "../../demos/scramble-state-demo";
import ScrambleStateDemoSource from "../../demos/scramble-state-demo.tsx?highlighted";
import ScrambleStateDemoRaw from "../../demos/scramble-state-demo.tsx?raw";
import { ScrambleStructureDemo } from "../../demos/scramble-structure-demo";
import ScrambleStructureDemoSource from "../../demos/scramble-structure-demo.tsx?highlighted";
import ScrambleStructureDemoRaw from "../../demos/scramble-structure-demo.tsx?raw";

export const scrambleMeta: ComponentMeta = {
  name: "scramble",
  label: "Scramble",
  description:
    "Text decodes into place: characters cycle random glyphs, then settle left-to-right. Plays on first reveal, on hover, or whenever the text changes — suited to stat values, version strings, and status transitions. Respects reduced motion.",
  category: "Motion",
  examples: [
    {
      title: "Overview",
      description: "Text decodes into place when it enters the viewport.",
      code: ScrambleDemoSource,
      rawCode: ScrambleDemoRaw,
      render: () => <ScrambleDemo />,
    },
    {
      title: "State Change",
      description: (
        <>
          When <InlineCode>children</InlineCode> changes after the first play,
          the new text re-decodes — ideal for status transitions.
        </>
      ),
      code: ScrambleStateDemoSource,
      rawCode: ScrambleStateDemoRaw,
      render: () => <ScrambleStateDemo />,
    },
    {
      title: "Nested Content",
      description: (
        <>
          Scramble applies to every text node inside — wrap a{" "}
          <InlineCode>Button</InlineCode> or a whole{" "}
          <InlineCode>Card</InlineCode> and all of its text decodes while the
          markup stays intact. The button decodes on{" "}
          <InlineCode>trigger=&quot;focus&quot;</InlineCode>; pressing it runs a
          fake decrypt — masked fields resolve into real values.
        </>
      ),
      code: ScrambleStructureDemoSource,
      rawCode: ScrambleStructureDemoRaw,
      render: () => <ScrambleStructureDemo />,
    },
  ],
  usageImport: `import { Scramble } from "@/components/motion/scramble";`,
  usageCode: `<Scramble>ACCESS GRANTED</Scramble>`,
  props: [
    {
      name: "children",
      type: "ReactNode",
      default: "undefined",
      description:
        "Content whose text should decode — every descendant text node animates; markup is preserved.",
    },
    {
      name: "intensity",
      type: "number (0-1)",
      default: "0.6",
      description: "Scales the decode duration — 0 settles instantly.",
    },
    {
      name: "duration",
      type: "number",
      default: "800",
      description: "Decode duration in ms at full intensity.",
    },
    {
      name: "speed",
      type: "number",
      default: "40",
      description:
        "Milliseconds between glyph updates for unsettled characters.",
    },
    {
      name: "characters",
      type: "string",
      default: '"!<>-_\\\\/[]{}=+*^?#"',
      description: "Glyph pool used while decoding.",
    },
    {
      name: "trigger",
      type: '"view" | "hover" | "focus"',
      default: '"view"',
      description:
        "When the decode plays — on reveal in the viewport, on hover, or when the element or a descendant gains focus.",
    },
    {
      name: "once",
      type: "boolean",
      default: "true",
      description: "With the view trigger: decode only on first reveal.",
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
      default: "undefined",
      description: "Called after each decode completes.",
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
      description: "Disable the effect — renders the final text.",
    },
  ],
  accessibility: [
    "While decoding, the element is aria-hidden and a visually-hidden sibling exposes the final text to screen readers; at rest the content is fully accessible",
    "Renders the content as-is when reduced motion is active",
    "Nested Scramble instances decode only their own text",
  ],
};
