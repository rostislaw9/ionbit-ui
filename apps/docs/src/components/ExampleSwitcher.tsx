import type { ComponentMeta } from "../registry/components/types";

import { memo } from "react";

import { Reveal } from "@ionbit-ui/motion";
import { ToggleGroup, ToggleGroupItem } from "@ionbit-ui/ui";

import { PreviewCodeBlock } from "./PreviewCodeBlock";

/**
 * Example switcher + preview area.
 *
 * Extracted into its own component so that changing `activeExample`
 * only re-renders this subtree, not the entire ComponentDetailPage
 * (which includes expensive static sections like API tables, usage,
 * installation, etc.).
 */
export const ExampleSwitcher = memo(function ExampleSwitcher({
  examples,
  activeExample,
  onSelect,
}: {
  examples: ComponentMeta["examples"];
  activeExample: number;
  onSelect: (index: number) => void;
}) {
  const example = examples[activeExample] ?? examples[0];
  if (!example) return null;

  return (
    <>
      {examples.length > 1 && (
        <Reveal direction="up">
          <ToggleGroup
            type="single"
            size="sm"
            spacing={1}
            value={String(activeExample)}
            onValueChange={(v) => {
              if (v) onSelect(Number(v));
            }}
            aria-label="Demo switcher"
            className="flex-wrap"
          >
            {examples.map((ex, i) => (
              <ToggleGroupItem key={ex.title} value={String(i)}>
                {ex.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Reveal>
      )}

      <Reveal direction="up" delay={60}>
        <section id="preview" className="flex scroll-mt-24 flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground md:text-lg">
            {example.title}
          </h2>
          <p className="text-base text-foreground-muted md:text-sm">
            {example.description}
          </p>
          <PreviewCodeBlock
            preview={example.render()}
            code={example.code}
            rawCode={example.rawCode}
          />
        </section>
      </Reveal>
    </>
  );
});
