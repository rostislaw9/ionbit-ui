import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Reveal } from "@ionbit-ui/motion";
import { Badge } from "@ionbit-ui/ui";

import { SidebarLayout } from "../components/layout/SidebarLayout";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { utilManifest } from "../registry/utils/manifest";

export function UtilsPage() {
  useDocumentTitle("Utils");
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            CSS utilities
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            All utilities
          </h1>
          <p className="text-sm text-foreground-muted">
            {utilManifest.length} utilities. Click any utility for live
            previews, code, and API details.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {utilManifest.map((util, i) => (
            <Reveal key={util.name} direction="up" delay={(i % 3) * 60}>
              <Link
                to={`/docs/utils/${util.name}`}
                className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:bg-surface-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground transition-colors duration-[var(--duration-fast)] group-hover:text-accent">
                      {util.label}
                    </h3>
                    {util.isNew && <Badge variant="accent">New</Badge>}
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-foreground-subtle uppercase">
                    {util.category}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-foreground-muted">
                  {util.description}
                </p>
                <div className="mt-auto flex items-center gap-1 text-xs text-foreground-subtle">
                  <span>
                    {util.exampleCount} example
                    {util.exampleCount > 1 ? "s" : ""}
                  </span>
                  <ArrowRight className="size-3" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
