import type {
  UtilBlock,
  UtilSection as UtilSectionMeta,
} from "../registry/utils/types";

import highlightedInline from "virtual:highlighted-inline";

import { slugify } from "../lib/slugify";
import { CodeBlockWithCopy } from "./CodeBlockWithCopy";
import { PreviewCodeBlock } from "./PreviewCodeBlock";
import { SectionHeading } from "./SectionHeading";

export function UtilSections({
  utilName,
  sections,
}: {
  utilName: string;
  sections: UtilSectionMeta[];
}) {
  let codeCounter = 0;

  const renderBlocks = (blocks: UtilBlock[], prefix: string) =>
    blocks.map((block, i) => {
      if (block.code) {
        const key = `__util_section_code_${utilName}_${codeCounter}__`;
        codeCounter++;
        const html = highlightedInline[key]?.codeHtml ?? block.code;
        return (
          <CodeBlockWithCopy
            key={`${prefix}-${i}`}
            rawCode={block.code}
            html={html}
            lang={html === block.code ? "tsx" : undefined}
            lineNumbers={false}
          />
        );
      }
      if (block.prose) {
        return (
          <div
            key={`${prefix}-${i}`}
            className="text-base leading-relaxed text-foreground-muted md:text-sm"
          >
            {block.prose}
          </div>
        );
      }
      return null;
    });

  return sections.map((section) => {
    const sectionId = slugify(section.title);
    return (
      <section
        key={section.title}
        id={sectionId}
        className="flex scroll-mt-24 flex-col gap-3"
      >
        <SectionHeading id={sectionId}>{section.title}</SectionHeading>
        {section.prose && (
          <div className="text-base leading-relaxed text-foreground-muted md:text-sm">
            {section.prose}
          </div>
        )}
        {section.before && renderBlocks(section.before, "before")}
        {section.demo && (
          <PreviewCodeBlock
            preview={section.demo.render()}
            code={section.demo.code}
            rawCode={section.demo.rawCode}
          />
        )}
        {section.after && renderBlocks(section.after, "after")}
      </section>
    );
  });
}
