import type { UtilMeta } from "../registry/utils/types";

import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Reveal } from "@ionbit-ui/motion";
import { Badge, Button } from "@ionbit-ui/ui";

import { OnThisPage } from "../components/OnThisPage";
import { PageActions } from "../components/PageActions";
import { PreviewCodeBlock } from "../components/PreviewCodeBlock";
import { PrevNextNav } from "../components/PrevNextNav";
import { SidebarLayout } from "../components/SidebarLayout";
import { UtilInstallation } from "../components/UtilInstallation";
import { UtilSections } from "../components/UtilSections";
import { UtilUsage } from "../components/UtilUsage";
import { useCopyPage } from "../hooks/useCopyPage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  flattenSectionIds,
  useScrollSpy,
  type Section,
} from "../hooks/useScrollSpy";
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";
import { getPrevNext } from "../lib/getPrevNext";
import { utilToMarkdown } from "../lib/util-to-markdown";

// Lazy-load util registry files.
const utilRegistryModules = import.meta.glob<Record<string, UtilMeta>>(
  "../registry/utils/*.tsx",
  { eager: false },
);

const registryKeyMap: Record<string, string> = {};
for (const key of Object.keys(utilRegistryModules)) {
  const match = key.match(/\/([^/]+)\.tsx$/);
  if (match && match[1]) registryKeyMap[match[1]] = key;
}

function findMeta(mod: Record<string, unknown>): UtilMeta | null {
  for (const value of Object.values(mod)) {
    if (
      value &&
      typeof value === "object" &&
      "name" in value &&
      "sections" in value
    ) {
      return value as UtilMeta;
    }
  }
  return null;
}

function toSectionId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function UtilDetailPage() {
  const { name } = useParams<{ name: string }>();
  const [util, setUtil] = useState<UtilMeta | null>(null);
  const [notFound, setNotFound] = useState(false);

  useDocumentTitle(util?.label);

  const buildMarkdown = useCallback(
    () => (util ? utilToMarkdown(util) : ""),
    [util],
  );
  const { pageCopied, handleCopyPage } = useCopyPage(buildMarkdown);

  useEffect(() => {
    const key = name ? registryKeyMap[name] : undefined;
    if (!key || !utilRegistryModules[key]) {
      setNotFound(true);
      return;
    }
    setNotFound(false);
    let cancelled = false;
    utilRegistryModules[key]().then((mod) => {
      if (cancelled) return;
      setUtil(findMeta(mod));
    });
    return () => {
      cancelled = true;
    };
  }, [name]);

  // Build "On this page" sections.
  const sections = useMemo<Section[]>(() => {
    if (!util) return [];
    const result: Section[] = [];
    if (util.heroDemo) result.push({ id: "preview", label: "Overview" });
    result.push({ id: "installation", label: "Installation" });
    if (util.classTable || util.usageCode)
      result.push({ id: "usage", label: "Usage" });
    for (const section of util.sections) {
      result.push({ id: toSectionId(section.title), label: section.title });
    }
    return result;
  }, [util]);

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
          Utility not found
        </h1>
        <p className="text-base text-foreground-muted md:text-sm">
          No utility named &quot;{name}&quot;.
        </p>
        <Button asChild variant="outline">
          <Link to="/docs/utils">
            <ArrowLeft data-icon="inline-start" /> Back to all utilities
          </Link>
        </Button>
      </div>
    );
  }

  if (!util) return null;

  const { prev, next } = getPrevNext(util);

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
        {/* Header */}
        <Reveal direction="up">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <h1 className="order-2 text-3xl font-semibold tracking-tight text-foreground sm:order-1">
                    {util.label}
                  </h1>
                  <div className="order-1 flex flex-wrap items-center gap-2 sm:order-2">
                    <Badge
                      variant="accent"
                      className="font-mono text-[10px] tracking-wider uppercase"
                    >
                      {util.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:hidden">
                  <PageActions prev={prev} next={next} />
                </div>
              </div>
              <p className="max-w-2xl text-foreground-muted">
                {util.description}
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

        {/* Hero demo */}
        {util.heroDemo && (
          <Reveal direction="up" delay={60}>
            <section
              id="preview"
              key={util.name}
              className="flex scroll-mt-24 flex-col gap-3"
            >
              <PreviewCodeBlock
                preview={util.heroDemo.render()}
                code={util.heroDemo.code}
                rawCode={util.heroDemo.rawCode}
              />
            </section>
          </Reveal>
        )}

        {/* Installation */}
        <Reveal direction="up" delay={120}>
          <UtilInstallation utilName={util.name} cssImport={util.cssImport} />
        </Reveal>

        {/* Usage */}
        <UtilUsage
          utilName={util.name}
          classTable={util.classTable}
          usageCode={util.usageCode}
          usageProse={util.usageProse}
          usageProseAfter={util.usageProseAfter}
        />

        {/* Additional sections */}
        <UtilSections utilName={util.name} sections={util.sections} />

        <PrevNextNav prev={prev} next={next} />
      </div>
    </SidebarLayout>
  );
}
