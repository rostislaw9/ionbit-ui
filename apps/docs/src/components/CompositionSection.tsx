import type { CompositionBlock } from "../registry/components/types";

import highlightedInline from "virtual:highlighted-inline";

import { slugify } from "../lib/slugify";
import { CodeBlockWithCopy } from "./CodeBlockWithCopy";
import { InlineCode } from "./InlineCode";
import { SectionHeading } from "./SectionHeading";

function isBlocks(
  composition: string[] | CompositionBlock[],
): composition is CompositionBlock[] {
  return (
    composition.length > 0 &&
    typeof composition[0] === "object" &&
    composition[0] !== null &&
    "tree" in composition[0]
  );
}

function Tree({ lines }: { lines: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed">
      <code className="font-mono text-foreground-muted">
        {lines.join("\n")}
      </code>
    </pre>
  );
}

export function CompositionSection({
  tree,
  label,
  name,
}: {
  tree: string[] | CompositionBlock[];
  label: string;
  name: string;
}) {
  const article = /^[aeiou]/i.test(label) ? "an" : "a";
  return (
    <section id="composition" className="flex scroll-mt-24 flex-col gap-3">
      <SectionHeading id="composition">Composition</SectionHeading>
      <p className="text-base text-foreground-muted md:text-sm">
        Use the following composition to build {article}{" "}
        <InlineCode>{label}</InlineCode>:
      </p>
      {isBlocks(tree) ? (
        <div className="flex flex-col gap-6">
          {tree.map((block, index) => {
            const blockId = block.heading
              ? `composition-${slugify(block.heading)}`
              : undefined;
            const key = `__composition_${name}_${index}__`;
            const highlighted = highlightedInline[key];
            return (
              <div
                key={block.heading ?? index}
                id={blockId}
                className="flex scroll-mt-24 flex-col gap-2"
              >
                {block.heading && blockId && (
                  <SectionHeading as="h3" id={blockId}>
                    {block.heading}
                  </SectionHeading>
                )}
                {block.description && (
                  <p className="text-base text-foreground-muted md:text-sm">
                    {block.description}
                  </p>
                )}
                {block.code && highlighted && (
                  <CodeBlockWithCopy
                    rawCode={highlighted.rawCode!}
                    html={highlighted.codeHtml!}
                    lineNumbers={false}
                  />
                )}
                <Tree lines={block.tree} />
              </div>
            );
          })}
        </div>
      ) : (
        <Tree lines={tree} />
      )}
    </section>
  );
}
