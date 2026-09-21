import type { ReactNode } from "react";

import { ArrowRightToLine } from "lucide-react";

import { Glow, Pulse, Scramble } from "@ionbit-ui/motion";
import { Button } from "@ionbit-ui/ui";

import { TERMINAL_LABEL } from "./classes";
import { SectionLabel } from "./SectionLabel";

interface Feature {
  kicker: string;
  title: string;
  desc: string;
  demo: ReactNode;
}

const FEATURES: Feature[] = [
  {
    kicker: "01 · motion",
    title: "Motion is a system, not a garnish",
    desc: "Nine primitives share one timing, easing, and intensity token set — effects coordinate instead of compete.",
    demo: (
      <span className="flex items-center gap-5">
        <Pulse color="var(--success)">
          <span className="block size-2 rounded-full bg-success" />
        </Pulse>
        <Glow intensity={0.7}>
          <Button variant="outline" size="sm">
            hover
          </Button>
        </Glow>
        <Scramble
          trigger="hover"
          className="font-mono text-xs text-foreground-muted"
        >
          decode me
        </Scramble>
      </span>
    ),
  },
  {
    kicker: "02 · source-owned",
    title: "You own every line",
    desc: "Components install into your repo, not node_modules. Read them, diff them, change them — no version gate, no fork.",
    demo: (
      <span className="flex flex-col gap-1 font-mono text-xs text-foreground-subtle">
        <span>components/ui/button.tsx</span>
        <span>components/motion/glow.tsx</span>
        <span className="text-foreground-muted">— yours to edit</span>
      </span>
    ),
  },
  {
    kicker: "03 · accessibility",
    title: "Keyboard-tested by default",
    desc: "Radix and Base UI semantics underneath, visible focus rings, reduced motion respected in every primitive.",
    demo: (
      <span className="flex items-center gap-3">
        <Button variant="secondary" size="sm">
          focus me
        </Button>
        <span className="font-mono text-xs text-foreground-subtle">
          press{" "}
          <kbd className="inline-flex items-center gap-1 rounded border border-border px-1 align-middle">
            <ArrowRightToLine className="size-3" aria-hidden />
            tab
          </kbd>{" "}
          to see the ring
        </span>
      </span>
    ),
  },
];

/** Three reasons to use the library — each cell ends with a live touch,
 * not a stock icon. */
export function FeatureGrid() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <SectionLabel cmd="cat why.md" note="3 lines" />
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.kicker} className="flex flex-col gap-3 bg-surface p-5">
            <span className={`${TERMINAL_LABEL} text-foreground-subtle`}>
              {f.kicker}
            </span>
            <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm leading-relaxed text-foreground-muted">
              {f.desc}
            </p>
            <div className="mt-auto pt-3">{f.demo}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
