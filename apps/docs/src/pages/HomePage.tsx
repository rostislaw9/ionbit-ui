import { Link } from "react-router-dom";

import { Glow, Reveal } from "@ionbit-ui/motion";
import { Button } from "@ionbit-ui/ui";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { componentManifest } from "../registry/components/manifest";
import { ShowcaseGrid } from "../showcase";

export function HomePage() {
  useDocumentTitle();
  return (
    <div className="flex flex-col gap-24">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 py-8 text-center sm:py-16">
        <Reveal direction="up">
          <h1 className="max-w-5xl text-5xl leading-tight font-semibold tracking-tight text-foreground sm:text-6xl">
            Production interfaces that feel{" "}
            <Glow always variant="text" intensity={0.7}>
              <span className="text-accent">alive</span>
            </Glow>
          </h1>
        </Reveal>
        <Reveal direction="up" delay={60}>
          <p className="max-w-2xl text-lg leading-relaxed text-foreground-muted">
            A React component system with a coherent motion layer and a
            restrained digital identity. Source-owned, accessible, and
            production-tested.
          </p>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <div className="flex flex-wrap justify-center gap-3">
            {/* <Magnetic intensity={0.15}> */}
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
            {/* </Magnetic> */}
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

      {/* Showcase waterfall */}
      <ShowcaseGrid />

      {/* Component count */}
      <section className="flex flex-col items-center gap-4 py-8 text-center">
        <Reveal direction="up">
          <p className="text-sm text-foreground-muted">
            {componentManifest.length} components, ready to use. Source-owned,
            accessible, and production-tested.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
