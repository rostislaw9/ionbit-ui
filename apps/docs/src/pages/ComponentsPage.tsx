import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Pulse, Reveal } from "@ionbit-ui/motion";
import {
  Badge,
  Button,
  Input,
  ToggleGroup,
  ToggleGroupItem,
} from "@ionbit-ui/ui";

import { SidebarLayout } from "../components/SidebarLayout";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  componentCategories,
  componentManifest,
} from "../registry/components/manifest";

const categories = ["All", ...componentCategories];

export function ComponentsPage() {
  useDocumentTitle("Components");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

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

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        <Reveal direction="up">
          <header className="flex flex-col gap-2">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Component browser
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              All components
            </h1>
            <p className="text-sm text-foreground-muted">
              {componentManifest.length} primitives. Click any component for
              live previews, code, and API details.
            </p>
          </header>
        </Reveal>

        <Reveal direction="up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Input
              placeholder="Search components..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:max-w-xs"
            />
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
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((comp, i) => (
            <Reveal key={comp.name} direction="up" delay={(i % 3) * 60}>
              <Link
                to={`/docs/components/${comp.name}`}
                className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:bg-surface-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground transition-colors duration-[var(--duration-fast)] group-hover:text-accent">
                      {comp.label}
                    </h3>
                    {comp.isNew && (
                      <Pulse intensity={0.3}>
                        <Badge variant="accent">New</Badge>
                      </Pulse>
                    )}
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-foreground-subtle uppercase">
                    {comp.category}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-foreground-muted">
                  {comp.description}
                </p>
                <div className="mt-auto flex items-center gap-1 text-xs text-foreground-subtle">
                  <span>
                    {comp.exampleCount} example
                    {comp.exampleCount > 1 ? "s" : ""}
                  </span>
                  <ArrowRight className="size-3" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

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
