import { Check, Copy } from "lucide-react";
import { useMemo, type CSSProperties, type ReactNode } from "react";

import { Reveal } from "@ionbit-ui/motion";
import { Button } from "@ionbit-ui/ui";

import { SidebarLayout } from "../components/layout/SidebarLayout";
import { OnThisPage } from "../components/page/OnThisPage";
import { SectionHeading } from "../components/page/SectionHeading";
import {
  TOKEN_DOC_SECTIONS,
  tokensToMarkdown,
  type TokenDocSection,
} from "../data/token-docs";
import { useCopyPage } from "../hooks/useCopyPage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  flattenSectionIds,
  useScrollSpy,
  type Section,
} from "../hooks/useScrollSpy";
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";

export function TokensPage() {
  useDocumentTitle("Tokens");

  const { pageCopied, handleCopyPage } = useCopyPage(tokensToMarkdown);

  const sections = useMemo<Section[]>(
    () =>
      TOKEN_DOC_SECTIONS.map((s) => ({
        id: s.id,
        label: s.title,
      })),
    [],
  );
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

        {TOKEN_DOC_SECTIONS.map((section) => (
          <TokenSection key={section.id} section={section} />
        ))}
      </div>
    </SidebarLayout>
  );
}

function TokenSection({ section }: { section: TokenDocSection }) {
  if (section.kind === "colors") {
    return (
      <section id={section.id} className="flex scroll-mt-24 flex-col gap-4">
        <SectionHeading id={section.id}>{section.title}</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {section.groups.map((group, i) => (
            <Reveal key={group.id} direction="up" delay={(i % 4) * 60}>
              <SubGroup id={group.id} title={group.title}>
                {group.tokens.map((t) => (
                  <Swatch key={t} name={t} var={`--${t}`} />
                ))}
              </SubGroup>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "radius" || section.kind === "shadows") {
    const radius = section.kind === "radius";
    return (
      <TokenGroup id={section.id} title={section.title}>
        <div className="flex flex-wrap items-end gap-4">
          {section.tokens.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 border border-border-strong bg-surface-elevated"
                style={
                  {
                    borderRadius: radius ? `var(--${t})` : "var(--radius-md)",
                    ...(radius ? {} : { boxShadow: `var(--${t})` }),
                  } as CSSProperties
                }
              />
              <span className="font-mono text-xs text-foreground-muted">
                {t.slice(t.indexOf("-") + 1)}
              </span>
            </div>
          ))}
        </div>
      </TokenGroup>
    );
  }

  return (
    <TokenGroup id={section.id} title={section.title}>
      <div className="grid gap-2 font-mono text-xs text-foreground-muted sm:grid-cols-2">
        {section.rows.map((r) => (
          <Row key={r.token} k={r.token} v={r.value} />
        ))}
      </div>
    </TokenGroup>
  );
}

function TokenGroup({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
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
  children: ReactNode;
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
