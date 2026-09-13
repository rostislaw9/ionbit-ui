import type { ComponentMeta } from "../registry/components/types";
import type { ReactNode } from "react";

/**
 * Convert a ComponentMeta object into a markdown document suitable for
 * pasting into AI agent context. Includes description, install command,
 * usage, examples with source code, API props, accessibility, and
 * composition tree.
 */
export function componentToMarkdown(comp: ComponentMeta): string {
  const lines: string[] = [];

  lines.push(`# ${comp.label}`);
  lines.push("");
  lines.push(`> ${comp.description}`);
  lines.push("");

  // Category / tags
  const tags: string[] = [comp.category];
  if (comp.basedOn)
    tags.push(comp.basedOn === "radix" ? "Radix UI" : "Base UI");
  lines.push(`**Tags:** ${tags.join(", ")}`);
  lines.push("");

  // Installation
  lines.push("## Installation");
  lines.push("");
  lines.push("```bash");
  lines.push(`npx ionbit-ui@latest add ${comp.name}`);
  lines.push("```");
  lines.push("");

  // Usage
  if (comp.usageImport && comp.usageCode) {
    lines.push("## Usage");
    lines.push("");
    lines.push("```tsx");
    lines.push(comp.usageImport);
    lines.push("");
    lines.push(comp.usageCode);
    lines.push("```");
    lines.push("");
  }

  // Info blocks (e.g. Controlled State, Cursor)
  if (comp.infoBlocks) {
    for (const block of comp.infoBlocks) {
      lines.push(`## ${block.title}`);
      lines.push("");
      if (typeof block.description === "string") {
        lines.push(block.description);
        lines.push("");
      }
      lines.push("```tsx");
      lines.push(block.code);
      lines.push("```");
      lines.push("");
    }
  }

  // Examples
  if (comp.examples.length > 0) {
    lines.push("## Examples");
    lines.push("");
    for (const ex of comp.examples) {
      lines.push(`### ${ex.title}`);
      lines.push("");
      lines.push(`${ex.description}`);
      lines.push("");
      lines.push("```tsx");
      lines.push(ex.rawCode);
      lines.push("```");
      lines.push("");
    }
  }

  // API Reference — external link
  if (comp.apiReference) {
    lines.push("## API Reference");
    lines.push("");
    lines.push(`See [${comp.apiReference.label}](${comp.apiReference.url}).`);
    lines.push("");
  }

  // API Reference — props table
  if (!comp.apiReference && comp.props && comp.props.length > 0) {
    lines.push("## API Reference");
    lines.push("");
    lines.push("| Prop | Type | Default | Description |");
    lines.push("| --- | --- | --- | --- |");
    for (const prop of comp.props) {
      const def = prop.default ?? "—";
      lines.push(
        `| \`${prop.name}\` | \`${prop.type}\` | \`${def}\` | ${prop.description} |`,
      );
    }
    lines.push("");
  }

  // Accessibility
  if (comp.accessibility && comp.accessibility.length > 0) {
    lines.push("## Accessibility");
    lines.push("");
    for (const note of comp.accessibility) {
      lines.push(`- ${note}`);
    }
    lines.push("");
  }

  // Primitives (e.g. Field sub-components)
  if (comp.primitives) {
    lines.push("## API Reference");
    lines.push("");
    for (const prim of comp.primitives) {
      lines.push(`### ${prim.name}`);
      lines.push("");
      lines.push(`${prim.description}`);
      lines.push("");
      if (prim.props.length > 0) {
        lines.push("| Prop | Type | Default | Description |");
        lines.push("| --- | --- | --- | --- |");
        for (const prop of prim.props) {
          const def = prop.default ?? "—";
          lines.push(
            `| \`${prop.name}\` | \`${prop.type}\` | \`${def}\` | ${prop.description} |`,
          );
        }
        lines.push("");
      }
      if (prim.code) {
        lines.push("```tsx");
        lines.push(prim.code);
        lines.push("```");
        lines.push("");
      }
    }
  }

  // Composition
  if (comp.composition && comp.composition.length > 0) {
    lines.push("## Composition");
    lines.push("");
    const isBlocks = (
      c: typeof comp.composition,
    ): c is { heading?: string; description?: ReactNode; tree: string[] }[] =>
      c.length > 0 &&
      typeof c[0] === "object" &&
      c[0] !== null &&
      "tree" in c[0];
    if (isBlocks(comp.composition)) {
      for (const block of comp.composition) {
        if (block.heading) {
          lines.push(`### ${block.heading}`);
          lines.push("");
        }
        if (typeof block.description === "string") {
          lines.push(block.description);
          lines.push("");
        }
        lines.push("```");
        for (const line of block.tree) {
          lines.push(line);
        }
        lines.push("```");
        lines.push("");
      }
    } else {
      lines.push("```");
      for (const line of comp.composition as string[]) {
        lines.push(line);
      }
      lines.push("```");
      lines.push("");
    }
  }

  return lines.join("\n").trim() + "\n";
}
