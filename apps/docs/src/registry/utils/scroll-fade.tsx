import type { UtilMeta } from "./types";

import { Link } from "react-router-dom";

import { InlineCode } from "../../components/code/InlineCode";
import { ScrollFadeDemo } from "../../demos/scroll-fade-demo";
import ScrollFadeDemoSource from "../../demos/scroll-fade-demo.tsx?highlighted";
import ScrollFadeDemoRaw from "../../demos/scroll-fade-demo.tsx?raw";
import { ScrollFadeEdgeDemo } from "../../demos/scroll-fade-edge-demo";
import ScrollFadeEdgeDemoSource from "../../demos/scroll-fade-edge-demo.tsx?highlighted";
import ScrollFadeEdgeDemoRaw from "../../demos/scroll-fade-edge-demo.tsx?raw";
import { ScrollFadeHorizontalDemo } from "../../demos/scroll-fade-horizontal-demo";
import ScrollFadeHorizontalDemoSource from "../../demos/scroll-fade-horizontal-demo.tsx?highlighted";
import ScrollFadeHorizontalDemoRaw from "../../demos/scroll-fade-horizontal-demo.tsx?raw";
import { ScrollFadeNoneDemo } from "../../demos/scroll-fade-none-demo";
import ScrollFadeNoneDemoSource from "../../demos/scroll-fade-none-demo.tsx?highlighted";
import ScrollFadeNoneDemoRaw from "../../demos/scroll-fade-none-demo.tsx?raw";
import { ScrollFadeOverflowDemo } from "../../demos/scroll-fade-overflow-demo";
import ScrollFadeOverflowDemoSource from "../../demos/scroll-fade-overflow-demo.tsx?highlighted";
import ScrollFadeOverflowDemoRaw from "../../demos/scroll-fade-overflow-demo.tsx?raw";
import { ScrollFadeSizeDemo } from "../../demos/scroll-fade-size-demo";
import ScrollFadeSizeDemoSource from "../../demos/scroll-fade-size-demo.tsx?highlighted";
import ScrollFadeSizeDemoRaw from "../../demos/scroll-fade-size-demo.tsx?raw";

export const scrollFadeMeta: UtilMeta = {
  name: "scroll-fade",
  label: "Scroll Fade",
  description:
    "CSS utilities that fade the edges of a scroll container based on scroll position.",
  category: "Layout",
  heroDemo: {
    render: () => <ScrollFadeDemo />,
    code: ScrollFadeDemoSource,
    rawCode: ScrollFadeDemoRaw,
  },
  installCommand: "npm install ionbit-ui",
  cssImport: `@import "tailwindcss";
@import "ionbit-ui/tailwind.css";`,
  classTable: [
    {
      className: "scroll-fade",
      styles: (
        <>
          <InlineCode>
            mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
          </InlineCode>
          <br />
          <InlineCode>animation-timeline: scroll(self y);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-y",
      styles: (
        <>
          <InlineCode>
            mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));
          </InlineCode>
          <br />
          <InlineCode>animation-timeline: scroll(self y);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-x",
      styles: (
        <>
          <InlineCode>
            mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));
          </InlineCode>
          <br />
          <InlineCode>animation-timeline: scroll(self inline);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-t",
      styles: (
        <>
          Fade mask on the top edge.
          <br />
          <InlineCode>animation-timeline: scroll(self y);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-b",
      styles: (
        <>
          Fade mask on the bottom edge.
          <br />
          <InlineCode>animation-timeline: scroll(self y);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-l",
      styles: (
        <>
          Fade mask on the left edge.
          <br />
          <InlineCode>animation-timeline: scroll(self x);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-r",
      styles: (
        <>
          Fade mask on the right edge.
          <br />
          <InlineCode>animation-timeline: scroll(self x);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-s",
      styles: (
        <>
          Fade mask on the start edge, mirrors in RTL.
          <br />
          <InlineCode>animation-timeline: scroll(self inline);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-e",
      styles: (
        <>
          Fade mask on the end edge, mirrors in RTL.
          <br />
          <InlineCode>animation-timeline: scroll(self inline);</InlineCode>
        </>
      ),
    },
    {
      className: "scroll-fade-<number>",
      styles: (
        <InlineCode>
          --scroll-fade-size: calc(var(--spacing) * &lt;number&gt;);
        </InlineCode>
      ),
    },
    {
      className: "scroll-fade-[<value>]",
      styles: <InlineCode>--scroll-fade-size: &lt;value&gt;;</InlineCode>,
    },
    {
      className: "scroll-fade-{t,b,s,e}-<number>",
      styles: (
        <InlineCode>
          --scroll-fade-{"{t,b,s,e}"}-size: calc(var(--spacing) *
          &lt;number&gt;);
        </InlineCode>
      ),
    },
    {
      className: "scroll-fade-{t,b,s,e}-[<value>]",
      styles: (
        <InlineCode>
          --scroll-fade-{"{t,b,s,e}"}-size: &lt;value&gt;;
        </InlineCode>
      ),
    },
    {
      className: "scroll-fade-none",
      styles: <InlineCode>--scroll-fade-mask: none;</InlineCode>,
    },
  ],
  usageCode: `<div className="scroll-fade overflow-y-auto">{/* ... */}</div>`,
  usageProse: (
    <p>
      Add <InlineCode>scroll-fade</InlineCode> or{" "}
      <InlineCode>scroll-fade-y</InlineCode> to the scroll container, i.e. the
      element that has <InlineCode>overflow-y-auto</InlineCode>.
    </p>
  ),
  usageProseAfter: (
    <>
      <p>The fade is scroll-aware and tracks the scroll position:</p>
      <ul className="mt-2 list-disc pl-5">
        <li>
          At rest, the top edge is crisp and the bottom edge fades to hint at
          more content.
        </li>
        <li>
          As you scroll, a fade appears at the top and both edges stay faded
          mid-scroll.
        </li>
        <li>
          At the end, the bottom edge sharpens to show you have reached the last
          item.
        </li>
      </ul>
      <p className="mt-2">
        The fade is applied with <InlineCode>mask-image</InlineCode>, so it
        dissolves the content itself rather than overlaying a color. The mask
        uses a linear fade from transparent to black, so it adapts to any
        background without configuration. If your scroll area sits inside a
        card, put the background and border on a wrapper and{" "}
        <InlineCode>scroll-fade</InlineCode> on the inner scroller, so the fade
        dissolves the content and not the card.
      </p>
      <p className="mt-2">
        The{" "}
        <Link
          to="/docs/components/scroll-area"
          className="text-accent underline-offset-2 hover:underline"
        >
          ScrollArea
        </Link>{" "}
        component can use <InlineCode>scroll-fade</InlineCode> on its scrollable
        viewport.
      </p>
    </>
  ),
  sections: [
    {
      title: "No Overflow, No Fade",
      prose: (
        <p>
          If the content does not overflow, no fade is shown. You can apply{" "}
          <InlineCode>scroll-fade</InlineCode> to any list without checking
          whether it scrolls.
        </p>
      ),
      demo: {
        render: () => <ScrollFadeOverflowDemo />,
        code: ScrollFadeOverflowDemoSource,
        rawCode: ScrollFadeOverflowDemoRaw,
      },
    },
    {
      title: "Horizontal Scrolling",
      prose: (
        <p>
          Use <InlineCode>scroll-fade-x</InlineCode> on containers that scroll
          horizontally, i.e. the element that has{" "}
          <InlineCode>overflow-x-auto</InlineCode>.
        </p>
      ),
      demo: {
        render: () => <ScrollFadeHorizontalDemo />,
        code: ScrollFadeHorizontalDemoSource,
        rawCode: ScrollFadeHorizontalDemoRaw,
      },
      after: [
        {
          code: `<div className="flex scroll-fade-x overflow-x-auto">{/* ... */}</div>`,
        },
        {
          prose: (
            <p>
              The horizontal fade is direction-aware. In RTL layouts, the crisp
              edge and the fade follow the reading direction with no extra
              classes needed.{" "}
              <InlineCode>scroll-fade-&lt;number&gt;</InlineCode> and{" "}
              <InlineCode>scroll-fade-none</InlineCode> work the same for both
              axes.
            </p>
          ),
        },
      ],
    },
    {
      title: "Edge Fades",
      prose: (
        <p>
          Use edge utilities when only one edge should track the scroll
          position.
        </p>
      ),
      demo: {
        render: () => <ScrollFadeEdgeDemo />,
        code: ScrollFadeEdgeDemoSource,
        rawCode: ScrollFadeEdgeDemoRaw,
      },
      after: [
        {
          code: `<div className="scroll-fade-b overflow-y-auto">{/* ... */}</div>`,
        },
        {
          prose: (
            <p>
              The edge utilities are scroll-aware. Start edges fade in after you
              scroll away from the start, and end edges fade out when you reach
              the end. Use <InlineCode>scroll-fade-t</InlineCode>,{" "}
              <InlineCode>scroll-fade-b</InlineCode>,{" "}
              <InlineCode>scroll-fade-l</InlineCode>, and{" "}
              <InlineCode>scroll-fade-r</InlineCode> for physical edges. Use{" "}
              <InlineCode>scroll-fade-s</InlineCode> and{" "}
              <InlineCode>scroll-fade-e</InlineCode> for logical inline edges
              that mirror in RTL.
            </p>
          ),
        },
      ],
    },
    {
      title: "Fade Size",
      prose: (
        <p>
          The fade depth defaults to <InlineCode>12%</InlineCode> of the
          container, capped at <InlineCode>40px</InlineCode> so tall scrollers
          stay subtle. Use <InlineCode>scroll-fade-&lt;number&gt;</InlineCode>{" "}
          to set a fixed size on the spacing scale instead, the same way{" "}
          <InlineCode>scroll-mt-&lt;number&gt;</InlineCode> works.
        </p>
      ),
      demo: {
        render: () => <ScrollFadeSizeDemo />,
        code: ScrollFadeSizeDemoSource,
        rawCode: ScrollFadeSizeDemoRaw,
      },
      after: [
        {
          code: `<div className="scroll-fade overflow-y-auto scroll-fade-24">{/* ... */}</div>`,
        },
        {
          prose: (
            <p>For one-off values, use an arbitrary length or percentage:</p>
          ),
        },
        {
          code: `<div className="scroll-fade overflow-y-auto scroll-fade-[15%]">{/* ... */}</div>`,
        },
        {
          prose: (
            <p>
              To fade opposite edges by different amounts, use the per-edge
              modifiers <InlineCode>scroll-fade-t-&lt;number&gt;</InlineCode>,{" "}
              <InlineCode>scroll-fade-b-&lt;number&gt;</InlineCode>,{" "}
              <InlineCode>scroll-fade-s-&lt;number&gt;</InlineCode>, and{" "}
              <InlineCode>scroll-fade-e-&lt;number&gt;</InlineCode>. They
              override <InlineCode>scroll-fade-&lt;number&gt;</InlineCode> on
              the edge they target and accept arbitrary values too.
            </p>
          ),
        },
        {
          code: `<div className="scroll-fade overflow-y-auto scroll-fade-b-8 scroll-fade-t-2">{/* ... */}</div>`,
        },
        {
          prose: (
            <>
              <p>
                Use the logical <InlineCode>s</InlineCode>/
                <InlineCode>e</InlineCode> modifiers for horizontal scrollers so
                the sizes mirror in RTL.
              </p>
              <p className="mt-2">
                The fade eases in and out over a fixed scroll distance rather
                than appearing instantly. That distance is the{" "}
                <InlineCode>--scroll-fade-reveal</InlineCode> variable,{" "}
                <InlineCode>96px</InlineCode> by default and independent of the
                fade depth. Lower it for a snappier reveal or raise it for a
                more gradual one:
              </p>
            </>
          ),
        },
        {
          code: `<div className="scroll-fade overflow-y-auto [--scroll-fade-reveal:64px]">{/* ... */}</div>`,
        },
      ],
    },
    {
      title: "Disabling the Fade",
      prose: (
        <p>
          Use <InlineCode>scroll-fade-none</InlineCode> to remove the fade. It
          works in any class order, so the typical use is responsive or
          stateful:
        </p>
      ),
      before: [
        {
          code: `<div className="scroll-fade overflow-y-auto md:scroll-fade-none">{/* ... */}</div>`,
        },
      ],
      demo: {
        render: () => <ScrollFadeNoneDemo />,
        code: ScrollFadeNoneDemoSource,
        rawCode: ScrollFadeNoneDemoRaw,
      },
    },
    {
      title: "Fallback",
      prose: (
        <>
          <p>
            The scroll-aware behavior is implemented with CSS scroll-driven
            animations, with no JavaScript and no scroll listeners. In browsers
            that do not support scroll-driven animations,{" "}
            <InlineCode>scroll-fade</InlineCode> falls back to a static fade on
            both edges, and edge utilities fall back to a static fade on the
            selected edge.
          </p>
          <p className="mt-2">
            Since the mask is applied to the scroll container itself, a visible
            scrollbar fades with the content at the edges. Pair{" "}
            <InlineCode>scroll-fade</InlineCode> with{" "}
            <InlineCode>no-scrollbar</InlineCode>, which ships in the same
            package, if you want to hide the scrollbar entirely.
          </p>
        </>
      ),
    },
  ],
};
