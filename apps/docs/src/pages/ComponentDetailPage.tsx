import type { ComponentMeta } from "../registry/components/types";

import { ArrowLeft } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Reveal } from "@ionbit-ui/motion";
import { Badge, Button, ToggleGroup, ToggleGroupItem } from "@ionbit-ui/ui";

import { AccessibilityList } from "../components/AccessibilityList";
import { ApiTable } from "../components/ApiTable";
import { CompositionSection } from "../components/CompositionSection";
import { CursorSection } from "../components/CursorSection";
import { InstallBlock } from "../components/InstallBlock";
import { OnThisPage } from "../components/OnThisPage";
import { PageActions } from "../components/PageActions";
import { PreviewCodeBlock } from "../components/PreviewCodeBlock";
import { PrevNextNav } from "../components/PrevNextNav";
import { SectionHeading } from "../components/SectionHeading";
import { SidebarLayout } from "../components/SidebarLayout";
import { UsageSection } from "../components/UsageSection";
import { useCopyPage } from "../hooks/useCopyPage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  flattenSectionIds,
  useScrollSpy,
  type Section,
} from "../hooks/useScrollSpy";
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";
import { componentToMarkdown } from "../lib/component-to-markdown";
import { getPrevNext } from "../lib/getPrevNext";

// Lazy-load registry files — only the requested component's metadata
// (with demos, ?raw, ?highlighted) is imported, not the entire registry.
const registryModules = import.meta.glob<Record<string, ComponentMeta>>(
  "../registry/components/*.tsx",
  { eager: false },
);

// Map component names to their glob keys for O(1) lookup.
// The glob returns keys like "../registry/components/button.tsx".
const registryKeyMap: Record<string, string> = {};
for (const key of Object.keys(registryModules)) {
  const match = key.match(/\/([^/]+)\.tsx$/);
  if (match && match[1]) registryKeyMap[match[1]] = key;
}

// Registry files export named consts (e.g. `buttonMeta`).
// Find the ComponentMeta value in the module.
function findMeta(mod: Record<string, unknown>): ComponentMeta | null {
  for (const value of Object.values(mod)) {
    if (
      value &&
      typeof value === "object" &&
      "name" in value &&
      "examples" in value
    ) {
      return value as ComponentMeta;
    }
  }
  return null;
}

function toSectionId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Example switcher + preview area.
 *
 * Extracted into its own component so that changing `activeExample`
 * only re-renders this subtree, not the entire ComponentDetailPage
 * (which includes expensive static sections like API tables, usage,
 * installation, etc.).
 */
const ExampleSwitcher = memo(function ExampleSwitcher({
  examples,
  activeExample,
  onSelect,
}: {
  examples: ComponentMeta["examples"];
  activeExample: number;
  onSelect: (index: number) => void;
}) {
  const example = examples[activeExample] ?? examples[0];
  if (!example) return null;

  return (
    <>
      {examples.length > 1 && (
        <Reveal direction="up">
          <ToggleGroup
            type="single"
            size="sm"
            spacing={1}
            value={String(activeExample)}
            onValueChange={(v) => {
              if (v) onSelect(Number(v));
            }}
            aria-label="Demo switcher"
            className="flex-wrap"
          >
            {examples.map((ex, i) => (
              <ToggleGroupItem key={ex.title} value={String(i)}>
                {ex.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Reveal>
      )}

      <Reveal direction="up" delay={60}>
        <section id="preview" className="flex scroll-mt-24 flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground md:text-lg">
            {example.title}
          </h2>
          <p className="text-base text-foreground-muted md:text-sm">
            {example.description}
          </p>
          <PreviewCodeBlock
            preview={example.render()}
            code={example.code}
            rawCode={example.rawCode}
          />
        </section>
      </Reveal>
    </>
  );
});

export function ComponentDetailPage() {
  const { name } = useParams<{ name: string }>();
  const [comp, setComp] = useState<ComponentMeta | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeExample, setActiveExample] = useState(0);

  useDocumentTitle(comp?.label);

  const buildMarkdown = useCallback(
    () => (comp ? componentToMarkdown(comp) : ""),
    [comp],
  );
  const { pageCopied, handleCopyPage } = useCopyPage(buildMarkdown);

  // Dynamically import only the requested component's registry data.
  // Keep old content visible while loading to avoid flicker.
  useEffect(() => {
    const key = name ? registryKeyMap[name] : undefined;
    if (!key || !registryModules[key]) {
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setActiveExample(0);
    let cancelled = false;
    registryModules[key]().then((mod) => {
      if (cancelled) return;
      setComp(findMeta(mod));
    });
    return () => {
      cancelled = true;
    };
  }, [name]);

  // Build the "On this page" sections dynamically — memoized so the
  // array identity is stable across re-renders (e.g. when activeExample
  // changes), preventing unnecessary useScrollSpy / OnThisPage re-renders.
  const sections = useMemo<Section[]>(() => {
    const result: Section[] = [{ id: "preview", label: "Overview" }];
    if (comp?.about) result.push({ id: "about", label: "About" });
    result.push({ id: "installation", label: "Installation" });
    if (comp?.usageImport && comp.usageCode)
      result.push({ id: "usage", label: "Usage" });
    if (comp?.cursor) result.push({ id: "cursor", label: "Cursor" });
    if (comp?.composition)
      result.push({ id: "composition", label: "Composition" });
    if (comp?.apiReference) result.push({ id: "api", label: "API Reference" });
    if (comp?.props && comp.props.length > 0)
      result.push({ id: "api", label: "API Reference" });
    if (comp?.accessibility && comp.accessibility.length > 0)
      result.push({ id: "accessibility", label: "Accessibility" });
    if (comp?.primitives) {
      for (const primitive of comp.primitives) {
        const id = `primitive-${toSectionId(primitive.name)}`;
        result.push({ id, label: `${primitive.name} API` });
      }
    }
    return result;
  }, [comp]);

  const sectionIds = useMemo(() => flattenSectionIds(sections), [sections]);
  const depKey = useMemo(() => sectionIds.join(","), [sectionIds]);

  const { activeSection, handleSectionClick } = useScrollSpy(
    sectionIds,
    depKey,
  );

  useScrollToAnchor(sectionIds);

  if (notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Component not found
        </h1>
        <p className="text-sm text-foreground-muted">
          No component named &quot;{name}&quot;.
        </p>
        <Button asChild variant="outline">
          <Link to="/docs/components">
            <ArrowLeft data-icon="inline-start" /> Back to all components
          </Link>
        </Button>
      </div>
    );
  }

  if (!comp) return null;

  const { prev, next } = getPrevNext(comp);

  return (
    <SidebarLayout
      rightSidebar={
        <Reveal direction="up">
          <OnThisPage
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        </Reveal>
      }
    >
      <div className="flex flex-col gap-8">
        <Reveal direction="up">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <h1 className="order-2 text-3xl font-semibold tracking-tight text-foreground sm:order-1">
                    {comp.label}
                  </h1>
                  <div className="order-1 flex flex-wrap items-center gap-2 sm:order-2">
                    <Badge
                      variant="accent"
                      className="font-mono text-[10px] tracking-wider uppercase"
                    >
                      {comp.category}
                    </Badge>
                    {comp.radixBased && (
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] tracking-wider uppercase"
                      >
                        Radix
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:hidden">
                  <PageActions prev={prev} next={next} />
                </div>
              </div>
              <p className="max-w-2xl text-foreground-muted">
                {comp.description}
              </p>
            </div>
            <div className="hidden items-center gap-1 sm:flex sm:shrink-0">
              <PageActions
                prev={prev}
                next={next}
                pageCopied={pageCopied}
                onCopyPage={handleCopyPage}
              />
            </div>
          </div>
        </Reveal>

        <ExampleSwitcher
          examples={comp.examples}
          activeExample={activeExample}
          onSelect={setActiveExample}
        />

        {comp.about && (
          <Reveal direction="up" delay={120}>
            <section id="about" className="flex scroll-mt-24 flex-col gap-3">
              <SectionHeading id="about">About</SectionHeading>
              <p className="text-sm text-foreground-muted">{comp.about}</p>
            </section>
          </Reveal>
        )}

        <Reveal direction="up" delay={120}>
          <section
            id="installation"
            className="flex scroll-mt-24 flex-col gap-3"
          >
            <SectionHeading id="installation">Installation</SectionHeading>
            <InstallBlock
              name={comp.name}
              radixBased={comp.radixBased}
              setup={comp.setup}
            />
          </section>
        </Reveal>

        {comp.usageImport && comp.usageCode && (
          <Reveal direction="up" delay={180}>
            <UsageSection
              componentName={comp.name}
              usageImport={comp.usageImport}
              usageCode={comp.usageCode}
            />
          </Reveal>
        )}

        {comp.cursor && (
          <Reveal direction="up">
            <CursorSection />
          </Reveal>
        )}

        {comp.composition && (
          <Reveal direction="up">
            <CompositionSection tree={comp.composition} label={comp.label} />
          </Reveal>
        )}

        {comp.apiReference && (
          <Reveal direction="up">
            <section id="api" className="flex scroll-mt-24 flex-col gap-3">
              <SectionHeading id="api">API Reference</SectionHeading>
              <p className="text-sm text-foreground-muted">
                See the{" "}
                <a
                  href={comp.apiReference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {comp.apiReference.label}
                </a>{" "}
                for more information.
              </p>
            </section>
          </Reveal>
        )}

        {!comp.apiReference && comp.props && comp.props.length > 0 && (
          <Reveal direction="up">
            <section id="api" className="flex scroll-mt-24 flex-col gap-3">
              <SectionHeading id="api">API Reference</SectionHeading>
              <ApiTable props={comp.props} />
            </section>
          </Reveal>
        )}

        {comp.accessibility && comp.accessibility.length > 0 && (
          <Reveal direction="up">
            <section
              id="accessibility"
              className="flex scroll-mt-24 flex-col gap-3"
            >
              <SectionHeading id="accessibility">Accessibility</SectionHeading>
              <AccessibilityList notes={comp.accessibility} />
            </section>
          </Reveal>
        )}

        {comp.primitives &&
          comp.primitives.map((primitive) => {
            const sectionId = `primitive-${toSectionId(primitive.name)}`;
            return (
              <Reveal key={primitive.name} direction="up">
                <section
                  id={sectionId}
                  className="flex scroll-mt-24 flex-col gap-3"
                >
                  <SectionHeading id={sectionId}>
                    {primitive.name} API
                  </SectionHeading>
                  <p className="text-sm text-foreground-muted">
                    {primitive.description}
                  </p>
                  <ApiTable props={primitive.props} />
                  <h3 className="text-xs font-semibold text-foreground-muted">
                    {primitive.name} Accessibility
                  </h3>
                  <AccessibilityList notes={primitive.accessibility} />
                </section>
              </Reveal>
            );
          })}

        <PrevNextNav prev={prev} next={next} />
      </div>
    </SidebarLayout>
  );
}
