import { Code2 } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@ionbit-ui/ui";

import { CopyButton } from "./CopyButton";
import { HighlightedCode } from "./HighlightedCode";

interface PreviewCodeBlockProps {
  /** The live preview element. */
  preview: ReactNode;
  /** Pre-highlighted HTML from Shiki (build-time). */
  code: string;
  /** Raw source code for the copy button. */
  rawCode: string;
}

/**
 * Combined preview + code block inspired by shadcn docs.
 *
 * - Preview is always visible at the top.
 * - Code is always present but collapsed with a max-height and gradient
 *   overlay. A centered "View code" button sits on the gradient.
 * - When expanded, a copy button appears in the top-right corner.
 * - Code is syntax-highlighted at build time via Shiki (no runtime cost).
 */
export function PreviewCodeBlock({
  preview,
  code,
  rawCode,
}: PreviewCodeBlockProps) {
  const [codeExpanded, setCodeExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {/* Preview area */}
      <div className="relative flex min-h-[200px] items-center justify-center bg-background p-8">
        <div className="flex w-full items-center justify-center">{preview}</div>
      </div>

      {/* Code area — always in DOM, collapsed with max-height + gradient */}
      <div className="relative border-t border-border bg-surface">
        {/* Copy button — top-right, only when expanded */}
        {codeExpanded && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-inherit">
            <CopyButton text={rawCode} />
          </div>
        )}

        {codeExpanded ? (
          <div className="max-h-[400px] overflow-auto">
            <HighlightedCode html={code} className="shiki-lines" />
          </div>
        ) : (
          <div className="relative max-h-32 overflow-hidden">
            <HighlightedCode html={code} className="shiki-lines" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--surface), color-mix(in oklab, var(--surface) 60%, transparent), transparent)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCodeExpanded(true)}
              >
                <Code2 />
                View code
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
