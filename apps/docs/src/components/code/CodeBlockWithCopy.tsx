import { FileBracesCorner } from "lucide-react";

import { CopyButton } from "./CopyButton";
import { HighlightedCode } from "./HighlightedCode";

export function CodeBlockWithCopy({
  rawCode,
  html,
  lang,
  lineNumbers = true,
  filename,
}: {
  rawCode: string;
  html: string;
  lang?: string;
  lineNumbers?: boolean;
  filename?: string;
}) {
  if (filename) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
        <div className="flex items-center justify-between gap-2 border-b border-border py-2 pr-2.5 pl-4">
          <div className="flex min-w-0 items-center gap-2">
            <FileBracesCorner className="h-4 w-4 shrink-0 text-foreground-subtle" />
            <span className="font-mono text-xs text-foreground-muted">
              {filename}
            </span>
          </div>
          <CopyButton text={rawCode} />
        </div>
        <HighlightedCode html={html} className="shiki-nolines" lang={lang} />
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
      <div className="absolute top-2.5 right-2.5 z-10 bg-inherit">
        <CopyButton text={rawCode} />
      </div>
      <HighlightedCode
        html={html}
        className={lineNumbers ? "shiki-lines" : "shiki-nolines"}
        lang={lang}
      />
    </div>
  );
}
