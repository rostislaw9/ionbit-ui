import { Check, Copy } from "lucide-react";
import { useMemo } from "react";

import { Reveal } from "@ionbit-ui/motion";
import { Button } from "@ionbit-ui/ui";

import { SidebarLayout } from "../components/layout/SidebarLayout";
import { OnThisPage } from "../components/page/OnThisPage";
import { SectionHeading } from "../components/page/SectionHeading";
import tokensMarkdown from "../content/tokens.md?raw";
import { useCopyPage } from "../hooks/useCopyPage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  flattenSectionIds,
  useScrollSpy,
  type Section,
} from "../hooks/useScrollSpy";
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";

const TOKEN_SECTIONS: Section[] = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "motion", label: "Motion" },
  { id: "effect-intensities", label: "Effect intensities" },
  { id: "animations", label: "Animations" },
];

export function TokensPage() {
  useDocumentTitle("Tokens");

  const { pageCopied, handleCopyPage } = useCopyPage(() => tokensMarkdown);

  const sections = useMemo<Section[]>(() => TOKEN_SECTIONS, []);
  const sectionIds = useMemo(() => flattenSectionIds(sections), [sections]);
  const { activeSection, handleSectionClick } = useScrollSpy(
    sectionIds,
    "tokens",
  );
  useScrollToAnchor(sectionIds);

  return (
    <SidebarLayout
      rightSidebar={
        <OnThisPage
          sections={sections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
      }
    >
      <div className="flex flex-col gap-12">
        <Reveal direction="up">
          <header className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                Design tokens
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                The visual contract
              </h1>
              <p className="max-w-2xl text-foreground-muted">
                Components reference these semantic tokens via Tailwind
                utilities. Retheme by overriding the variables in your CSS — no
                Tailwind config edit required.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPage}
              aria-label={pageCopied ? "Copied" : "Copy page as markdown"}
              className="hidden shrink-0 sm:flex"
            >
              {pageCopied ? (
                <Check data-icon="inline-start" />
              ) : (
                <Copy data-icon="inline-start" />
              )}
              {pageCopied ? "Copied" : "Copy Page"}
            </Button>
          </header>
        </Reveal>

        <section id="colors" className="flex scroll-mt-24 flex-col gap-4">
          <SectionHeading id="colors">Colors</SectionHeading>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            <Reveal direction="up">
              <SubGroup id="surfaces" title="Surfaces">
                <Swatch name="background" var="--background" />
                <Swatch name="surface" var="--surface" />
                <Swatch name="surface-elevated" var="--surface-elevated" />
                <Swatch name="surface-hover" var="--surface-hover" />
              </SubGroup>
            </Reveal>

            <Reveal direction="up" delay={60}>
              <SubGroup id="foreground" title="Foreground">
                <Swatch name="foreground" var="--foreground" />
                <Swatch name="foreground-muted" var="--foreground-muted" />
                <Swatch name="foreground-subtle" var="--foreground-subtle" />
              </SubGroup>
            </Reveal>

            <Reveal direction="up" delay={120}>
              <SubGroup id="accent" title="Accent">
                <Swatch name="accent" var="--accent" />
                <Swatch name="accent-hover" var="--accent-hover" />
                <Swatch name="accent-muted" var="--accent-muted" />
                <Swatch name="accent-subtle" var="--accent-subtle" />
                <Swatch name="accent-foreground" var="--accent-foreground" />
              </SubGroup>
            </Reveal>

            <Reveal direction="up" delay={180}>
              <SubGroup id="borders" title="Borders & ring">
                <Swatch name="border" var="--border" />
                <Swatch name="border-strong" var="--border-strong" />
                <Swatch name="border-accent" var="--border-accent" />
                <Swatch name="border-error" var="--border-error" />
                <Swatch name="border-success" var="--border-success" />
                <Swatch name="border-warning" var="--border-warning" />
                <Swatch name="border-info" var="--border-info" />
                <Swatch name="ring" var="--ring" />
              </SubGroup>
            </Reveal>

            <Reveal direction="up">
              <SubGroup id="success" title="Success">
                <Swatch name="success" var="--success" />
                <Swatch name="success-hover" var="--success-hover" />
                <Swatch name="success-muted" var="--success-muted" />
                <Swatch name="success-subtle" var="--success-subtle" />
                <Swatch name="success-foreground" var="--success-foreground" />
              </SubGroup>
            </Reveal>

            <Reveal direction="up" delay={60}>
              <SubGroup id="warning" title="Warning">
                <Swatch name="warning" var="--warning" />
                <Swatch name="warning-hover" var="--warning-hover" />
                <Swatch name="warning-muted" var="--warning-muted" />
                <Swatch name="warning-subtle" var="--warning-subtle" />
                <Swatch name="warning-foreground" var="--warning-foreground" />
              </SubGroup>
            </Reveal>

            <Reveal direction="up" delay={120}>
              <SubGroup id="error" title="Error">
                <Swatch name="error" var="--error" />
                <Swatch name="error-hover" var="--error-hover" />
                <Swatch name="error-muted" var="--error-muted" />
                <Swatch name="error-subtle" var="--error-subtle" />
                <Swatch name="error-foreground" var="--error-foreground" />
              </SubGroup>
            </Reveal>

            <Reveal direction="up" delay={180}>
              <SubGroup id="info" title="Info">
                <Swatch name="info" var="--info" />
                <Swatch name="info-hover" var="--info-hover" />
                <Swatch name="info-muted" var="--info-muted" />
                <Swatch name="info-subtle" var="--info-subtle" />
                <Swatch name="info-foreground" var="--info-foreground" />
              </SubGroup>
            </Reveal>
          </div>
        </section>

        <TokenGroup id="typography" title="Typography">
          <div className="grid gap-2 font-mono text-xs text-foreground-muted sm:grid-cols-2">
            <Row k="--font-sans" v="ui-sans-serif, system-ui, ..." />
            <Row k="--font-mono" v="ui-monospace, SF Mono, ..." />
            <Row k="--text-xs" v="0.75rem" />
            <Row k="--text-sm" v="0.875rem" />
            <Row k="--text-base" v="1rem" />
            <Row k="--text-lg" v="1.125rem" />
            <Row k="--text-xl" v="1.25rem" />
            <Row k="--text-2xl" v="1.5rem" />
            <Row k="--text-3xl" v="1.875rem" />
            <Row k="--leading-tight" v="1.2" />
            <Row k="--leading-normal" v="1.5" />
            <Row k="--leading-relaxed" v="1.65" />
            <Row k="--tracking-tight" v="-0.01em" />
            <Row k="--tracking-normal" v="0" />
            <Row k="--tracking-wide" v="0.02em" />
            <Row k="--weight-normal" v="400" />
            <Row k="--weight-medium" v="500" />
            <Row k="--weight-semibold" v="600" />
            <Row k="--weight-bold" v="700" />
          </div>
        </TokenGroup>

        <TokenGroup id="spacing" title="Spacing">
          <div className="grid gap-2 font-mono text-xs text-foreground-muted sm:grid-cols-2">
            <Row k="--space-1" v="0.25rem" />
            <Row k="--space-2" v="0.5rem" />
            <Row k="--space-3" v="0.75rem" />
            <Row k="--space-4" v="1rem" />
            <Row k="--space-5" v="1.25rem" />
            <Row k="--space-6" v="1.5rem" />
            <Row k="--space-8" v="2rem" />
            <Row k="--space-10" v="2.5rem" />
            <Row k="--space-12" v="3rem" />
            <Row k="--space-16" v="4rem" />
          </div>
        </TokenGroup>

        <TokenGroup id="radius" title="Radius">
          <div className="flex flex-wrap items-end gap-4">
            {(["sm", "md", "lg", "xl", "full"] as const).map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 border border-border-strong bg-surface-elevated"
                  style={{ borderRadius: `var(--radius-${r})` }}
                />
                <span className="font-mono text-xs text-foreground-muted">
                  {r}
                </span>
              </div>
            ))}
          </div>
        </TokenGroup>

        <TokenGroup id="shadows" title="Shadows">
          <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-surface p-6">
            {(["xs", "sm", "md", "lg"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 rounded-md bg-surface-elevated"
                  style={{ boxShadow: `var(--shadow-${s})` }}
                />
                <span className="font-mono text-xs text-foreground-muted">
                  {s}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-md bg-surface-elevated"
                style={{ boxShadow: "var(--shadow-glow)" }}
              />
              <span className="font-mono text-xs text-foreground-muted">
                glow
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-md bg-surface-elevated"
                style={{ boxShadow: "var(--shadow-glow-error)" }}
              />
              <span className="font-mono text-xs text-foreground-muted">
                glow-error
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-md bg-surface-elevated"
                style={{ boxShadow: "var(--shadow-focus)" }}
              />
              <span className="font-mono text-xs text-foreground-muted">
                focus
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-md bg-surface-elevated"
                style={{ boxShadow: "var(--shadow-focus-error)" }}
              />
              <span className="font-mono text-xs text-foreground-muted">
                focus-error
              </span>
            </div>
          </div>
        </TokenGroup>

        <TokenGroup id="motion" title="Motion">
          <div className="grid gap-2 font-mono text-xs text-foreground-muted sm:grid-cols-2">
            <Row k="--duration-fast" v="140ms" />
            <Row k="--duration-normal" v="220ms" />
            <Row k="--duration-slow" v="420ms" />
            <Row k="--ease-standard" v="cubic-bezier(.2,.8,.2,1)" />
            <Row k="--ease-emphasized" v="cubic-bezier(.3,0,0,1)" />
            <Row k="--ease-exit" v="cubic-bezier(.4,0,1,1)" />
          </div>
        </TokenGroup>

        <TokenGroup id="effect-intensities" title="Effect intensities">
          <div className="grid gap-2 font-mono text-xs text-foreground-muted sm:grid-cols-2">
            <Row k="--spotlight-intensity" v="0.4" />
            <Row k="--magnetic-intensity" v="0.25" />
          </div>
        </TokenGroup>

        <TokenGroup id="animations" title="Animations">
          <div className="grid gap-2 font-mono text-xs text-foreground-muted sm:grid-cols-2">
            <Row
              k="--animate-accordion-down"
              v="accordion-down 220ms ease-standard"
            />
            <Row
              k="--animate-accordion-up"
              v="accordion-up 220ms ease-standard"
            />
          </div>
        </TokenGroup>
      </div>
    </SidebarLayout>
  );
}

function TokenGroup({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-4">
      {id ? (
        <SectionHeading id={id}>{title}</SectionHeading>
      ) : (
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

/** A sub-group within a section — renders a title and content without its own section wrapper. */
function SubGroup({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="flex scroll-mt-24 flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground-muted">{title}</h3>
      {children}
    </div>
  );
}

function Swatch({ name, var: v }: { name: string; var: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 rounded-md border border-border-strong"
        style={{ backgroundColor: `var(${v})` }}
      />
      <div className="flex flex-col">
        <span className="text-sm text-foreground">{name}</span>
        <span className="font-mono text-xs text-foreground-muted">{v}</span>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-surface px-3 py-2">
      <span className="text-foreground">{k}</span>
      <span className="text-foreground-muted">{v}</span>
    </div>
  );
}
