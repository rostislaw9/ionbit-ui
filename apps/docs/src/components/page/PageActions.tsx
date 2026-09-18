import type { ManifestEntry } from "../../registry/manifest";

import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@ionbit-ui/ui";

function docPath(entry: ManifestEntry): string {
  const section = entry.kind === "util" ? "utils" : "components";
  return `/docs/${section}/${entry.name}`;
}

export interface PageActionsProps {
  prev: ManifestEntry | null;
  next: ManifestEntry | null;
  pageCopied?: boolean;
  onCopyPage?: () => void;
}

export function PageActions({
  prev,
  next,
  pageCopied,
  onCopyPage,
}: PageActionsProps) {
  return (
    <>
      {onCopyPage && (
        <Button
          variant="outline"
          size="sm"
          onClick={onCopyPage}
          aria-label={pageCopied ? "Copied" : "Copy page as markdown"}
        >
          {pageCopied ? (
            <Check data-icon="inline-start" />
          ) : (
            <Copy data-icon="inline-start" />
          )}
          {pageCopied ? "Copied" : "Copy Page"}
        </Button>
      )}
      <Button
        variant="outline"
        size="icon-sm"
        disabled={!prev}
        nativeButton={!prev}
        aria-label={prev ? `Previous: ${prev.label}` : "No previous page"}
        render={prev ? <Link to={docPath(prev)} /> : undefined}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        disabled={!next}
        nativeButton={!next}
        aria-label={next ? `Next: ${next.label}` : "No next page"}
        render={next ? <Link to={docPath(next)} /> : undefined}
      >
        <ChevronRight />
      </Button>
    </>
  );
}
