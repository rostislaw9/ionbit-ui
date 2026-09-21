import type { ManifestEntry } from "../registry/manifest";

import { LayoutGrid, Text } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button, Input, ToggleGroup, ToggleGroupItem } from "@ionbit-ui/ui";

import { ComponentCards } from "../components/browser/ComponentCards";
import { ComponentLinks } from "../components/browser/ComponentLinks";
import { SidebarLayout } from "../components/layout/SidebarLayout";
import { OnThisPage } from "../components/page/OnThisPage";
import { SectionHeading } from "../components/page/SectionHeading";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  flattenSectionIds,
  useScrollSpy,
  type Section,
} from "../hooks/useScrollSpy";
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";
import {
  componentCategories,
  componentManifest,
} from "../registry/components/manifest";

const categories = ["All", ...componentCategories];

const VIEW_STORAGE_KEY = "ionbit-ui-components-view";

type ViewMode = "cards" | "links";

export function ComponentsPage() {
  useDocumentTitle("Components");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const activeCategory = categories.includes(
    searchParams.get("category") ?? "All",
  )
    ? (searchParams.get("category") ?? "All")
    : "All";

  const setQuery = (value: string) => {
    setSearchParams(
      (prev) => {
        if (value) prev.set("q", value);
        else prev.delete("q");
        return prev;
      },
      { replace: true },
    );
  };
  const setActiveCategory = (value: string) => {
    setSearchParams(
      (prev) => {
        if (value === "All") prev.delete("category");
        else prev.set("category", value);
        return prev;
      },
      { replace: true },
    );
  };
  const [view, setView] = useState<ViewMode>(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEY);
      return stored === "cards" || stored === "links" ? stored : "cards";
    } catch {
      return "cards";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch {
      // Storage may be unavailable (private mode, SSR, etc.)
    }
  }, [view]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return componentManifest.filter((c) => {
      const matchesQuery =
        c.label.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "All" || c.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const newComps = useMemo(() => filtered.filter((c) => c.isNew), [filtered]);
  const showSections = activeCategory === "All";

  const sections = useMemo<Section[]>(() => {
    if (!showSections) return [];
    return [
      ...(newComps.length > 0
        ? [{ id: "new-components", label: "New Components" }]
        : []),
      { id: "all-components", label: "All Components" },
    ];
  }, [showSections, newComps.length]);

  const sectionIds = useMemo(() => flattenSectionIds(sections), [sections]);
  const depKey = useMemo(() => sectionIds.join(","), [sectionIds]);
  const { activeSection, handleSectionClick } = useScrollSpy(
    sectionIds,
    depKey,
  );
  useScrollToAnchor(sectionIds);

  const renderList = (items: ManifestEntry[], hideNewBadges = false) =>
    view === "links" ? (
      <ComponentLinks items={items} hideNewBadges={hideNewBadges} />
    ) : (
      <ComponentCards items={items} hideNewBadges={hideNewBadges} />
    );

  return (
    <SidebarLayout
      rightSidebar={
        sections.length > 0 ? (
          <OnThisPage
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        ) : undefined
      }
    >
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Component browser
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Components
          </h1>
          <p className="text-sm text-foreground-muted">
            {componentManifest.length} primitives. Click any component for live
            previews, code, and API details.
          </p>
        </header>

        <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <div className="flex w-full items-center gap-3 sm:max-w-xs">
            <Input
              placeholder="Search components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={0}
              value={view}
              onValueChange={(v: string) => {
                if (v === "cards" || v === "links") setView(v);
              }}
              aria-label="Show as"
            >
              <ToggleGroupItem value="cards" aria-label="Show as cards">
                <LayoutGrid />
              </ToggleGroupItem>
              <ToggleGroupItem value="links" aria-label="Show as links">
                <Text />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <ToggleGroup
            type="single"
            size="sm"
            spacing={1}
            value={activeCategory}
            onValueChange={(v: string) => v && setActiveCategory(v)}
            aria-label="Filter by category"
            className="flex-wrap"
          >
            {categories.map((cat) => (
              <ToggleGroupItem key={cat} value={cat}>
                {cat}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {showSections ? (
          <div className="flex flex-col gap-12">
            {newComps.length > 0 && (
              <section id="new-components" className="flex flex-col gap-4">
                <SectionHeading id="new-components">
                  New Components
                </SectionHeading>
                {renderList(newComps, true)}
              </section>
            )}
            <section id="all-components" className="flex flex-col gap-4">
              <SectionHeading id="all-components">
                All Components
              </SectionHeading>
              {renderList(filtered)}
            </section>
          </div>
        ) : (
          renderList(filtered)
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-sm text-foreground-muted">
              No components found.
            </p>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
