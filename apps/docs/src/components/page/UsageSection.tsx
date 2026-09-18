import highlightedInline from "virtual:highlighted-inline";

import { CodeBlockWithCopy } from "../code/CodeBlockWithCopy";
import { SectionHeading } from "./SectionHeading";

export function UsageSection({
  componentName,
  usageImport,
  usageCode,
}: {
  componentName: string;
  usageImport: string;
  usageCode: string;
}) {
  const highlighted = highlightedInline[componentName]!;
  return (
    <section id="usage" className="flex scroll-mt-24 flex-col gap-3">
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlockWithCopy
        rawCode={usageImport}
        html={highlighted.importHtml!}
        lineNumbers={false}
      />
      <CodeBlockWithCopy
        rawCode={usageCode}
        html={highlighted.codeHtml!}
        lineNumbers={false}
      />
    </section>
  );
}
