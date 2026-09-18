import { ChevronDown, FileCodeCorner } from "lucide-react";
import { useState } from "react";

import { Button, Separator } from "@ionbit-ui/ui";

import { CopyButton } from "./CopyButton";
import { HighlightedCode } from "./HighlightedCode";

export interface SourceFile {
  filename: string;
  html: string;
  rawCode: string;
}

interface SourceCodeBlockProps {
  file: SourceFile;
}

/**
 * Collapsible source code block for the Manual install tab.
 *
 * - Copy button is always visible in the header.
 * - Expand/collapse button in the header toggles the code area.
 * - Collapsed: shows a gradient overlay with an "Expand" button at the bottom.
 * - Expanded: shows full code in a scrollable container (max 400px).
 */
export function SourceCodeBlock({ file }: SourceCodeBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
      {/* Filename header + expand/collapse + separator + copy buttons */}
      <div className="flex items-center justify-between gap-2 border-b border-border py-2 pr-2.5 pl-4">
        <div className="flex min-w-0 items-center gap-2">
          <FileCodeCorner className="h-4 w-4 shrink-0 text-foreground-subtle" />
          <span className="font-mono text-xs text-foreground-muted">
            {file.filename.split("/").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <>
                    /<wbr />
                  </>
                )}
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={expanded ? "Collapse" : "Expand"}
            onClick={() => setExpanded((e) => !e)}
          >
            <ChevronDown className={expanded ? "rotate-180" : ""} />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-8" />
          <CopyButton text={file.rawCode} />
        </div>
      </div>

      {expanded ? (
        <div className="max-h-[400px] overflow-auto">
          <HighlightedCode html={file.html} className="shiki-lines" />
        </div>
      ) : (
        <div className="relative max-h-32 overflow-hidden">
          <HighlightedCode html={file.html} className="shiki-lines" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--surface), color-mix(in oklab, var(--surface) 60%, transparent), transparent)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2">
            <Button variant="ghost" size="sm" onClick={() => setExpanded(true)}>
              <ChevronDown />
              Expand
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
