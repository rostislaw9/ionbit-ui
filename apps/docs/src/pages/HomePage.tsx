import { Link } from "react-router-dom";

import { Glow, Reveal } from "@ionbit-ui/motion";
import { Button } from "@ionbit-ui/ui";

import { CyclingWord } from "../components/home/CyclingWord";
import { DeployConsole } from "../components/home/DeployConsole";
import { FeatureGrid } from "../components/home/FeatureGrid";
import { InstallFooter } from "../components/home/InstallFooter";
import { InterfaceExamples } from "../components/home/InterfaceExamples";
import { ThemeStrip } from "../components/home/ThemeStrip";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle();

  return (
    <div className="flex flex-col gap-20">
      {/* Faint blueprint grid + accent wash — the digital identity at its most restrained; purely decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] [mask-image:radial-gradient(ellipse_55%_65%_at_50%_0%,black,transparent)] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 55% 70% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 65% at 50% 0%, black 55%, transparent 100%)",
        }}
      />

      <section className="relative flex flex-col items-center gap-6 pt-8 text-center sm:pt-16">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          react · typescript · tailwind
        </p>
        <Reveal direction="up">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-6xl">
            Interfaces that{" "}
            <span className="block whitespace-nowrap lg:inline-block">
              feel <CyclingWord />
            </span>
          </h1>
        </Reveal>
        <Reveal direction="up" delay={60}>
          <p className="max-w-xl text-lg leading-relaxed text-foreground-muted lg:max-w-3xl">
            A component system with a coherent motion layer — one timing, one
            easing, one intensity language shared by every primitive.
            Source-owned, accessible, and yours to edit.
          </p>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <div className="flex flex-wrap justify-center gap-3">
            <Glow intensity={0.7}>
              <Button
                variant="primary"
                size="lg"
                nativeButton={false}
                render={<Link to="/docs" />}
              >
                Get Started
              </Button>
            </Glow>
            <Glow intensity={0.7}>
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={<Link to="/docs/components" />}
              >
                Browse Components
              </Button>
            </Glow>
          </div>
        </Reveal>
      </section>

      <DeployConsole />
      <FeatureGrid />
      <InterfaceExamples />
      <ThemeStrip />
      <InstallFooter />
    </div>
  );
}
