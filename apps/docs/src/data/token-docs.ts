/**
 * Design-token reference data — the single source for the tokens page.
 *
 * The page renders sections from this data and the "Copy Page" markdown
 * is generated from it, so the two can never drift apart.
 */

export interface TokenRow {
  token: string;
  value: string;
}

export interface TokenSubGroup {
  id: string;
  title: string;
  /** CSS variable names without the `--` prefix. */
  tokens: string[];
}

export type TokenDocSection =
  | { id: string; title: string; kind: "colors"; groups: TokenSubGroup[] }
  | { id: string; title: string; kind: "rows"; rows: TokenRow[] }
  | { id: string; title: string; kind: "radius"; tokens: string[] }
  | { id: string; title: string; kind: "shadows"; tokens: string[] };

function statusGroup(id: string): TokenSubGroup {
  return {
    id,
    title: id[0]!.toUpperCase() + id.slice(1),
    tokens: [
      id,
      `${id}-hover`,
      `${id}-muted`,
      `${id}-subtle`,
      `${id}-foreground`,
    ],
  };
}

export const TOKEN_DOC_SECTIONS: TokenDocSection[] = [
  {
    id: "colors",
    title: "Colors",
    kind: "colors",
    groups: [
      {
        id: "surfaces",
        title: "Surfaces",
        tokens: ["background", "surface", "surface-elevated", "surface-hover"],
      },
      {
        id: "foreground",
        title: "Foreground",
        tokens: ["foreground", "foreground-muted", "foreground-subtle"],
      },
      {
        id: "accent",
        title: "Accent",
        tokens: [
          "accent",
          "accent-hover",
          "accent-muted",
          "accent-subtle",
          "accent-foreground",
        ],
      },
      {
        id: "borders",
        title: "Borders & ring",
        tokens: [
          "border",
          "border-strong",
          "border-accent",
          "border-error",
          "border-success",
          "border-warning",
          "border-info",
          "ring",
        ],
      },
      statusGroup("success"),
      statusGroup("warning"),
      statusGroup("error"),
      statusGroup("info"),
    ],
  },
  {
    id: "typography",
    title: "Typography",
    kind: "rows",
    rows: [
      { token: "--font-sans", value: "ui-sans-serif, system-ui, ..." },
      { token: "--font-mono", value: "ui-monospace, SF Mono, ..." },
      { token: "--text-xs", value: "0.75rem" },
      { token: "--text-sm", value: "0.875rem" },
      { token: "--text-base", value: "1rem" },
      { token: "--text-lg", value: "1.125rem" },
      { token: "--text-xl", value: "1.25rem" },
      { token: "--text-2xl", value: "1.5rem" },
      { token: "--text-3xl", value: "1.875rem" },
      { token: "--leading-tight", value: "1.2" },
      { token: "--leading-normal", value: "1.5" },
      { token: "--leading-relaxed", value: "1.65" },
      { token: "--tracking-tight", value: "-0.01em" },
      { token: "--tracking-normal", value: "0" },
      { token: "--tracking-wide", value: "0.02em" },
      { token: "--weight-normal", value: "400" },
      { token: "--weight-medium", value: "500" },
      { token: "--weight-semibold", value: "600" },
      { token: "--weight-bold", value: "700" },
    ],
  },
  {
    id: "spacing",
    title: "Spacing",
    kind: "rows",
    rows: [
      { token: "--space-1", value: "0.25rem" },
      { token: "--space-2", value: "0.5rem" },
      { token: "--space-3", value: "0.75rem" },
      { token: "--space-4", value: "1rem" },
      { token: "--space-5", value: "1.25rem" },
      { token: "--space-6", value: "1.5rem" },
      { token: "--space-8", value: "2rem" },
      { token: "--space-10", value: "2.5rem" },
      { token: "--space-12", value: "3rem" },
      { token: "--space-16", value: "4rem" },
    ],
  },
  {
    id: "radius",
    title: "Radius",
    kind: "radius",
    tokens: ["radius-sm", "radius-md", "radius-lg", "radius-xl", "radius-full"],
  },
  {
    id: "shadows",
    title: "Shadows",
    kind: "shadows",
    tokens: [
      "shadow-xs",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-glow",
      "shadow-glow-error",
      "shadow-focus",
      "shadow-focus-error",
    ],
  },
  {
    id: "motion",
    title: "Motion",
    kind: "rows",
    rows: [
      { token: "--duration-fast", value: "140ms" },
      { token: "--duration-normal", value: "220ms" },
      { token: "--duration-slow", value: "420ms" },
      { token: "--ease-standard", value: "cubic-bezier(.2,.8,.2,1)" },
      { token: "--ease-emphasized", value: "cubic-bezier(.3,0,0,1)" },
      { token: "--ease-exit", value: "cubic-bezier(.4,0,1,1)" },
    ],
  },
  {
    id: "effect-intensities",
    title: "Effect intensities",
    kind: "rows",
    rows: [
      { token: "--glow-intensity", value: "0.7" },
      { token: "--magnetic-intensity", value: "0.2" },
      { token: "--pulse-intensity", value: "0.65" },
      { token: "--ripple-intensity", value: "0.3" },
      { token: "--scramble-intensity", value: "0.6" },
      { token: "--spotlight-intensity", value: "0.4" },
      { token: "--tilt-intensity", value: "0.5" },
      { token: "--reflection-intensity", value: "0.35" },
      { token: "--trace-intensity", value: "0.6" },
    ],
  },
  {
    id: "animations",
    title: "Animations",
    kind: "rows",
    rows: [
      {
        token: "--animate-accordion-down",
        value: "accordion-down 220ms ease-standard",
      },
      {
        token: "--animate-accordion-up",
        value: "accordion-up 220ms ease-standard",
      },
    ],
  },
];

function varTable(tokens: string[]): string[] {
  return [
    "| Token | Value |",
    "| --- | --- |",
    ...tokens.map((t) => `| \`--${t}\` | \`var(--${t})\` |`),
  ];
}

function rowTable(rows: TokenRow[]): string[] {
  return [
    "| Token | Value |",
    "| --- | --- |",
    ...rows.map((r) => `| \`${r.token}\` | \`${r.value}\` |`),
  ];
}

/** Generate the "Copy Page" markdown from the same section data the
 * page renders — one source, two views. */
export function tokensToMarkdown(): string {
  const lines = [
    "# Design Tokens",
    "",
    "> The visual contract. Components reference these semantic tokens via Tailwind utilities. Retheme by overriding the variables in your CSS — no Tailwind config edit required.",
  ];

  for (const section of TOKEN_DOC_SECTIONS) {
    lines.push("", `## ${section.title}`);
    if (section.kind === "colors") {
      for (const group of section.groups) {
        lines.push("", `### ${group.title}`, "", ...varTable(group.tokens));
      }
    } else if (section.kind === "rows") {
      lines.push("", ...rowTable(section.rows));
    } else {
      lines.push("", ...varTable(section.tokens));
    }
  }

  return `${lines.join("\n")}\n`;
}
