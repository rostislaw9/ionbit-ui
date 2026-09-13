import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import highlightedInline from "virtual:highlighted-inline";

import { Reveal } from "@ionbit-ui/motion";
import { Badge, Button } from "@ionbit-ui/ui";

import { AccessibilityList } from "../components/AccessibilityList";
import { ApiTable } from "../components/ApiTable";
import { CodeBlockWithCopy } from "../components/CodeBlockWithCopy";
import { CompositionSection } from "../components/CompositionSection";
import { ExampleSwitcher } from "../components/ExampleSwitcher";
import { InfoBlocksSection } from "../components/InfoBlocksSection";
import { InstallBlock } from "../components/InstallBlock";
import { OnThisPage } from "../components/OnThisPage";
import { PageActions } from "../components/PageActions";
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
import { scrollToSection } from "../lib/scroll-to-section";
import { slugify } from "../lib/slugify";
import {
  type ComponentMeta,
  BASED_ON_LABEL,
} from "../registry/components/types";

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

export function ComponentDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
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
    if (comp?.infoBlocks) {
      for (const block of comp.infoBlocks) {
        result.push({
          id: slugify(block.title),
          label: block.title,
        });
      }
    }
    if (comp?.composition) {
      const subsections =
        Array.isArray(comp.composition) &&
        comp.composition.length > 0 &&
        typeof comp.composition[0] === "object" &&
        comp.composition[0] !== null &&
        "tree" in comp.composition[0]
          ? (comp.composition as { heading?: string }[])
              .filter((block) => block.heading)
              .map((block) => ({
                id: `composition-${slugify(block.heading!)}`,
                label: block.heading!,
              }))
          : undefined;
      result.push({
        id: "composition",
        label: "Composition",
        subsections,
      });
    }
    if (comp?.apiReference || (comp?.props && comp.props.length > 0))
      result.push({ id: "api", label: "API Reference" });
    if (comp?.accessibility && comp.accessibility.length > 0)
      result.push({ id: "accessibility", label: "Accessibility" });
    if (comp?.primitives && comp.primitives.length > 0) {
      const subsections = comp.primitives.map((primitive) => ({
        id: `primitive-${slugify(primitive.name)}`,
        label: primitive.name,
      }));
      result.push({ id: "api", label: "API Reference", subsections });
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

  // Handle demo anchors (e.g. #demo-basic) — switch to the matching example
  // and scroll to the preview section. Skips when the change came from a
  // tab click (signaled via skipDemoScrollRef) to avoid flash/scroll on
  // plain navigation.
  const skipDemoScrollRef = useRef(false);
  const { hash } = useLocation();
  useEffect(() => {
    if (!comp || !hash) return;
    const id = hash.slice(1);
    if (!id.startsWith("demo-")) return;
    if (skipDemoScrollRef.current) {
      skipDemoScrollRef.current = false;
      return;
    }
    const slug = id.slice(5);
    const index = comp.examples.findIndex((ex) => slugify(ex.title) === slug);
    if (index >= 0) {
      setActiveExample(index);
      requestAnimationFrame(() => scrollToSection("preview"));
    }
  }, [hash, comp]);

  // Update the URL hash when the active example changes via tab click,
  // without scrolling (replace, don't push to history).
  const handleSelectExample = useCallback(
    (index: number) => {
      setActiveExample(index);
      if (comp && comp.examples.length > 1) {
        const example = comp.examples[index];
        if (example) {
          skipDemoScrollRef.current = true;
          navigate(`${pathname}${search}#demo-${slugify(example.title)}`, {
            replace: true,
          });
        }
      }
    },
    [comp, navigate, pathname, search],
  );

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
                    {comp.basedOn && (
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] tracking-wider uppercase"
                      >
                        {comp.basedOn && BASED_ON_LABEL[comp.basedOn]}
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
          key={comp.name}
          examples={comp.examples}
          activeExample={activeExample}
          onSelect={handleSelectExample}
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
              basedOn={comp.basedOn}
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

        {comp.infoBlocks && comp.infoBlocks.length > 0 && (
          <InfoBlocksSection
            componentName={comp.name}
            infoBlocks={comp.infoBlocks}
          />
        )}

        {comp.composition && (
          <CompositionSection
            tree={comp.composition}
            label={comp.label}
            name={comp.name}
          />
        )}

        {comp.apiReference && (
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
        )}

        {!comp.apiReference && comp.props && comp.props.length > 0 && (
          <section id="api" className="flex scroll-mt-24 flex-col gap-3">
            <SectionHeading id="api">API Reference</SectionHeading>
            <ApiTable props={comp.props} />
          </section>
        )}

        {comp.accessibility && comp.accessibility.length > 0 && (
          <section
            id="accessibility"
            className="flex scroll-mt-24 flex-col gap-3"
          >
            <SectionHeading id="accessibility">Accessibility</SectionHeading>
            <AccessibilityList notes={comp.accessibility} />
          </section>
        )}

        {comp.primitives && comp.primitives.length > 0 && (
          <section id="api" className="flex scroll-mt-24 flex-col gap-6">
            <SectionHeading id="api">API Reference</SectionHeading>
            {comp.primitives.map((primitive) => {
              const sectionId = `primitive-${slugify(primitive.name)}`;
              const key = `__primitive_${comp.name}_${primitive.name}__`;
              const highlighted = highlightedInline[key];
              return (
                <section
                  key={primitive.name}
                  id={sectionId}
                  className="flex scroll-mt-24 flex-col gap-3"
                >
                  <SectionHeading id={sectionId} as="h3">
                    {primitive.name}
                  </SectionHeading>
                  <p className="text-sm text-foreground-muted">
                    {primitive.description}
                  </p>
                  <ApiTable props={primitive.props} />
                  {highlighted && (
                    <CodeBlockWithCopy
                      rawCode={highlighted.rawCode!}
                      html={highlighted.codeHtml!}
                      lineNumbers={false}
                      filename={primitive.filename}
                    />
                  )}
                  {primitive.after && (
                    <div className="flex flex-col gap-3 text-base text-foreground-muted md:text-sm">
                      {primitive.after}
                    </div>
                  )}
                </section>
              );
            })}
          </section>
        )}

        <PrevNextNav prev={prev} next={next} />
      </div>
    </SidebarLayout>
  );
}
