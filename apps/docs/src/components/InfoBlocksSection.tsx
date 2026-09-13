import type { InfoBlock } from "../registry/components/types";

import highlightedInline from "virtual:highlighted-inline";

import { slugify } from "../lib/slugify";
import { CodeBlockWithCopy } from "./CodeBlockWithCopy";
import { SectionHeading } from "./SectionHeading";

export function InfoBlocksSection({
  componentName,
  infoBlocks,
}: {
  componentName: string;
  infoBlocks: InfoBlock[];
}) {
  return (
    <>
      {infoBlocks.map((block, index) => {
        const sectionId = slugify(block.title);
        const key = `__info_${componentName}_${index}__`;
        const highlighted = highlightedInline[key];
        return (
          <section
            key={sectionId}
            id={sectionId}
            className="flex scroll-mt-24 flex-col gap-3"
          >
            <SectionHeading id={sectionId}>{block.title}</SectionHeading>
            <div className="flex flex-col gap-3 text-base text-foreground-muted md:text-sm">
              {block.description}
            </div>
            {highlighted && (
              <CodeBlockWithCopy
                rawCode={highlighted.rawCode!}
                html={highlighted.codeHtml!}
                lineNumbers={false}
                filename={block.filename}
              />
            )}
            {block.after && (
              <div className="flex flex-col gap-3 text-base text-foreground-muted md:text-sm">
                {block.after}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
