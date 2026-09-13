import type { UtilMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { ShimmerAngleDemo } from "../../demos/shimmer-angle-demo";
import ShimmerAngleDemoSource from "../../demos/shimmer-angle-demo.tsx?highlighted";
import ShimmerAngleDemoRaw from "../../demos/shimmer-angle-demo.tsx?raw";
import { ShimmerColorDemo } from "../../demos/shimmer-color-demo";
import ShimmerColorDemoSource from "../../demos/shimmer-color-demo.tsx?highlighted";
import ShimmerColorDemoRaw from "../../demos/shimmer-color-demo.tsx?raw";
import { ShimmerDemo } from "../../demos/shimmer-demo";
import ShimmerDemoSource from "../../demos/shimmer-demo.tsx?highlighted";
import ShimmerDemoRaw from "../../demos/shimmer-demo.tsx?raw";
import { ShimmerDurationDemo } from "../../demos/shimmer-duration-demo";
import ShimmerDurationDemoSource from "../../demos/shimmer-duration-demo.tsx?highlighted";
import ShimmerDurationDemoRaw from "../../demos/shimmer-duration-demo.tsx?raw";
import { ShimmerNoneDemo } from "../../demos/shimmer-none-demo";
import ShimmerNoneDemoSource from "../../demos/shimmer-none-demo.tsx?highlighted";
import ShimmerNoneDemoRaw from "../../demos/shimmer-none-demo.tsx?raw";
import { ShimmerOnceDemo } from "../../demos/shimmer-once-demo";
import ShimmerOnceDemoSource from "../../demos/shimmer-once-demo.tsx?highlighted";
import ShimmerOnceDemoRaw from "../../demos/shimmer-once-demo.tsx?raw";
import { ShimmerSpreadDemo } from "../../demos/shimmer-spread-demo";
import ShimmerSpreadDemoSource from "../../demos/shimmer-spread-demo.tsx?highlighted";
import ShimmerSpreadDemoRaw from "../../demos/shimmer-spread-demo.tsx?raw";

export const shimmerMeta: UtilMeta = {
  name: "shimmer",
  label: "Shimmer",
  description: "Utilities for adding a shimmer effect to text elements.",
  category: "Feedback",
  heroDemo: {
    render: () => <ShimmerDemo />,
    code: ShimmerDemoSource,
    rawCode: ShimmerDemoRaw,
  },
  installCommand: "npm install ionbit-ui",
  cssImport: `@import "tailwindcss";
@import "ionbit-ui/tailwind.css";`,
  classTable: [
    {
      className: "shimmer",
      styles: (
        <>
          <InlineCode>background-clip: text;</InlineCode>
          <br />
          <InlineCode>
            animation: tw-shimmer var(--shimmer-duration, 2s) linear infinite;
          </InlineCode>
        </>
      ),
    },
    {
      className: "shimmer-once",
      styles: <InlineCode>animation-iteration-count: 1;</InlineCode>,
    },
    {
      className: "shimmer-reverse",
      styles: <InlineCode>animation-direction: reverse;</InlineCode>,
    },
    {
      className: "shimmer-none",
      styles: (
        <>
          <InlineCode>--shimmer-image: none;</InlineCode>
          <br />
          <InlineCode>--shimmer-text-fill: currentColor;</InlineCode>
        </>
      ),
    },
    {
      className: "shimmer-color-<color>",
      styles: <InlineCode>--shimmer-color: &lt;color&gt;;</InlineCode>,
    },
    {
      className: "shimmer-color-[<value>]",
      styles: <InlineCode>--shimmer-color: &lt;value&gt;;</InlineCode>,
    },
    {
      className: "shimmer-color-<color>/<pct>",
      styles: (
        <InlineCode>
          --shimmer-color: color-mix(in oklch, &lt;color&gt; &lt;pct&gt;,
          transparent);
        </InlineCode>
      ),
    },
    {
      className: "shimmer-duration-<number>",
      styles: (
        <InlineCode>--shimmer-duration: calc(&lt;number&gt; * 1ms);</InlineCode>
      ),
    },
    {
      className: "shimmer-spread-<number>",
      styles: (
        <InlineCode>
          --shimmer-spread: calc(var(--spacing) * &lt;number&gt;);
        </InlineCode>
      ),
    },
    {
      className: "shimmer-spread-[<value>]",
      styles: <InlineCode>--shimmer-spread: &lt;value&gt;;</InlineCode>,
    },
    {
      className: "shimmer-angle-<number>",
      styles: (
        <InlineCode>--shimmer-angle: calc(&lt;number&gt; * 1deg);</InlineCode>
      ),
    },
  ],
  usageCode: `<p className="shimmer text-muted-foreground">Generating response&hellip;</p>`,
  usageProse: <p>Add shimmer to a text element.</p>,
  usageProseAfter: (
    <>
      <p>
        The shimmer is built on <InlineCode>currentColor</InlineCode>, so it
        adapts to the element:
      </p>
      <ul className="mt-2 list-disc pl-5">
        <li>
          The highlight is derived from the text color, with no configuration
          needed.
        </li>
        <li>
          It works on any color, from{" "}
          <InlineCode>text-muted-foreground</InlineCode> to brand colors.
        </li>
        <li>
          In dark mode, the highlight automatically brightens to stay visible.
        </li>
      </ul>
      <p className="mt-2">
        The effect is pure CSS. The text is painted with{" "}
        <InlineCode>background-clip: text</InlineCode>, and the highlight sweeps
        across it in a seamless loop.
      </p>
    </>
  ),
  sections: [
    {
      title: "Color",
      prose: (
        <p>
          Use <InlineCode>shimmer-color-&lt;color&gt;</InlineCode> to set the
          highlight color explicitly. It accepts theme colors with an optional
          opacity modifier, or any arbitrary color value.
        </p>
      ),
      demo: {
        render: () => <ShimmerColorDemo />,
        code: ShimmerColorDemoSource,
        rawCode: ShimmerColorDemoRaw,
      },
      after: [
        {
          code: `<p className="shimmer shimmer-color-blue-500/60">Generating response&hellip;</p>
<p className="shimmer shimmer-color-[#378ADD]">Generating response&hellip;</p>`,
        },
      ],
    },
    {
      title: "Duration",
      prose: (
        <p>
          Use <InlineCode>shimmer-duration-&lt;number&gt;</InlineCode> to set
          the duration of one sweep in milliseconds. The default is{" "}
          <InlineCode>2000</InlineCode>, i.e. <InlineCode>2s</InlineCode>.
        </p>
      ),
      demo: {
        render: () => <ShimmerDurationDemo />,
        code: ShimmerDurationDemoSource,
        rawCode: ShimmerDurationDemoRaw,
      },
      after: [
        {
          code: `<p className="shimmer shimmer-duration-1000">Generating response&hellip;</p>`,
        },
      ],
    },
    {
      title: "Spread",
      prose: (
        <p>
          Use <InlineCode>shimmer-spread-&lt;number&gt;</InlineCode> to set the
          width of the highlight band using the spacing scale. The default is{" "}
          <InlineCode>calc(3ch + 40px)</InlineCode>: a fixed base plus a{" "}
          <InlineCode>3ch</InlineCode> term that scales with the font size.
        </p>
      ),
      demo: {
        render: () => <ShimmerSpreadDemo />,
        code: ShimmerSpreadDemoSource,
        rawCode: ShimmerSpreadDemoRaw,
      },
      after: [
        {
          code: `<p className="shimmer shimmer-spread-24">Generating response&hellip;</p>`,
        },
        {
          prose: (
            <p>For one-off values, use an arbitrary length or percentage:</p>
          ),
        },
        {
          code: `<p className="shimmer shimmer-spread-[5rem]">Generating response&hellip;</p>`,
        },
      ],
    },
    {
      title: "Angle",
      prose: (
        <p>
          Use <InlineCode>shimmer-angle-&lt;number&gt;</InlineCode> to set the
          tilt of the highlight band in degrees. The default is{" "}
          <InlineCode>20</InlineCode>.
        </p>
      ),
      demo: {
        render: () => <ShimmerAngleDemo />,
        code: ShimmerAngleDemoSource,
        rawCode: ShimmerAngleDemoRaw,
      },
      after: [
        {
          code: `<p className="shimmer shimmer-angle-45">Generating response&hellip;</p>`,
        },
      ],
    },
    {
      title: "Play Once",
      prose: (
        <p>
          Use <InlineCode>shimmer-once</InlineCode> to play a single sweep
          instead of looping, useful as a reveal when streaming completes. Pair
          it with <InlineCode>shimmer-duration-&lt;number&gt;</InlineCode> to
          control how long the sweep takes.
        </p>
      ),
      demo: {
        render: () => <ShimmerOnceDemo />,
        code: ShimmerOnceDemoSource,
        rawCode: ShimmerOnceDemoRaw,
      },
    },
    {
      title: "Reverse",
      prose: (
        <p>
          Use <InlineCode>shimmer-reverse</InlineCode> to sweep the highlight in
          the opposite direction. In RTL layouts the sweep already follows the
          reading direction.
        </p>
      ),
      after: [
        {
          code: `<p className="shimmer shimmer-reverse">Generating response&hellip;</p>`,
        },
      ],
    },
    {
      title: "Disabling the Shimmer",
      prose: (
        <p>
          Use <InlineCode>shimmer-none</InlineCode> to turn the effect off and
          render the text normally. It works in any class order, so the typical
          use is responsive or stateful.
        </p>
      ),
      demo: {
        render: () => <ShimmerNoneDemo />,
        code: ShimmerNoneDemoSource,
        rawCode: ShimmerNoneDemoRaw,
      },
      after: [
        {
          code: `<p className="shimmer md:shimmer-none">Generating response&hellip;</p>`,
        },
      ],
    },
    {
      title: "Fallback",
      prose: (
        <p>
          The shimmer is built on modern color features,{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_relative_colors"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            relative color syntax
          </a>{" "}
          and <InlineCode>color-mix()</InlineCode>, which are available in all
          current browsers. In older browsers without support, the highlight
          gradient is dropped and the text can render transparent. If you target
          older browsers, apply shimmer conditionally with a{" "}
          <InlineCode>supports-*</InlineCode> variant:
        </p>
      ),
      after: [
        {
          code: `<p className="supports-[color:oklch(from_white_l_c_h)]:shimmer">
  Generating response&hellip;
</p>`,
        },
      ],
    },
    {
      title: "Reduced Motion",
      prose: (
        <p>
          When the user prefers reduced motion, the animation is disabled
          automatically and the text renders normally. There is nothing to
          configure.
        </p>
      ),
    },
  ],
};
