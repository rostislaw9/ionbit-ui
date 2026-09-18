import type { UtilClassEntry } from "../../registry/utils/types";

import highlightedInline from "virtual:highlighted-inline";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ionbit-ui/ui";

import { CodeBlockWithCopy } from "../code/CodeBlockWithCopy";
import { SectionHeading } from "./SectionHeading";

export function UtilUsage({
  utilName,
  classTable,
  usageCode,
  usageProse,
  usageProseAfter,
}: {
  utilName: string;
  classTable?: UtilClassEntry[];
  usageCode?: string;
  usageProse?: React.ReactNode;
  usageProseAfter?: React.ReactNode;
}) {
  if (!classTable && !usageCode) return null;

  const usageKey = `__util_usage_${utilName}__`;
  const usageHtml = highlightedInline[usageKey]?.codeHtml;

  const headClass =
    "h-auto px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground-subtle";
  const cellBase = "px-4 py-2 font-mono text-xs leading-loose";

  return (
    <section id="usage" className="flex scroll-mt-24 flex-col gap-3">
      <SectionHeading id="usage">Usage</SectionHeading>
      {classTable && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-surface hover:bg-surface">
                <TableHead className={headClass}>Class</TableHead>
                <TableHead className={headClass}>Styles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classTable.map((entry) => (
                <TableRow key={entry.className}>
                  <TableCell
                    className={`${cellBase} whitespace-nowrap text-accent`}
                  >
                    {entry.className}
                  </TableCell>
                  <TableCell
                    className={`${cellBase} min-w-150 whitespace-normal text-foreground`}
                  >
                    {entry.styles}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {usageProse && (
        <div className="text-base leading-relaxed text-foreground-muted md:text-sm">
          {usageProse}
        </div>
      )}
      {usageCode && (
        <CodeBlockWithCopy
          rawCode={usageCode}
          html={usageHtml ?? usageCode}
          lang={usageHtml ? undefined : "tsx"}
          lineNumbers={false}
        />
      )}
      {usageProseAfter && (
        <div className="text-base leading-relaxed text-foreground-muted md:text-sm">
          {usageProseAfter}
        </div>
      )}
    </section>
  );
}
