import type { ReactNode } from "react";

export type ComponentCategory =
  "Form" | "Layout" | "Overlay" | "Feedback" | "Navigation" | "Data" | "Motion";

/** The underlying headless framework a component is built on. */
export const BasedOn = {
  radix: "radix",
  base: "base",
} as const;

export type BasedOn = (typeof BasedOn)[keyof typeof BasedOn];

/** Display name for a BasedOn value. */
export const BASED_ON_LABEL: Record<BasedOn, string> = {
  radix: "Radix UI",
  base: "Base UI",
};

export interface ComponentExample {
  title: string;
  description: ReactNode;
  /** Pre-highlighted HTML from Shiki (build-time via ?highlighted import). */
  code: string;
  /** Raw source code for the copy button. */
  rawCode: string;
  render: () => ReactNode;
}

export interface PropMeta {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface PrimitiveMeta {
  name: string;
  description: string;
  props: PropMeta[];
  /** Optional content rendered after the code block (e.g. notes, bullet lists). */
  after?: ReactNode;
  /** Optional code example shown in a code block. */
  code?: string;
  /** Code language for syntax highlighting (defaults to "tsx"). */
  lang?: string;
  /** Optional filename header for the code block. */
  filename?: string;
}

export interface InfoBlock {
  /** Section heading (e.g. "Controlled State"). */
  title: string;
  /** Short description shown below the heading. Can include React nodes for inline code. */
  description: ReactNode;
  /** Code example shown in a code block. */
  code: string;
  /** Code language for syntax highlighting (defaults to "tsx"). */
  lang?: string;
  /** Optional filename header for the code block (e.g. "src/index.css"). */
  filename?: string;
  /** Optional content rendered after the code block (e.g. notes, bullet lists). */
  after?: ReactNode;
}

export interface CompositionBlock {
  /** Optional subheading for this composition variant (e.g. "Simple"). Omitted for single-block compositions. */
  heading?: string;
  /** Short description shown below the subheading. Can include React nodes for inline code and links. */
  description?: ReactNode;
  /** ASCII tree diagram. */
  tree: string[];
  /** Optional code example shown above the tree diagram. */
  code?: string;
}

export interface ComponentMeta {
  name: string;
  label: string;
  description: string;
  category: ComponentCategory;
  examples: ComponentExample[];
  /** Optional info blocks (e.g. "Controlled State") shown after Usage. */
  infoBlocks?: InfoBlock[];
  /** Props table for the API reference section. */
  props?: PropMeta[];
  /** External API reference link (shown instead of the props table when present). */
  apiReference?: { label: string; url: string };
  /** Accessibility notes. */
  accessibility?: string[];
  /** Whether this component is built on Radix UI or Base UI. */
  basedOn?: BasedOn;
  /** Attribution / "About" note shown above installation (e.g. upstream author). */
  about?: ReactNode;
  /** For grouped entries (e.g. motion): per-primitive API + accessibility. */
  primitives?: PrimitiveMeta[];
  /** Whether this component is newly added (shows a "New" badge). */
  isNew?: boolean;
  /** Import statement for the Usage section. */
  usageImport?: string;
  /** JSX usage example for the Usage section. */
  usageCode?: string;
  /** Component tree diagram(s) for the Composition section. */
  composition?: string[] | CompositionBlock[];
  /** Optional final install step (e.g. "Add the Toaster to your app root"). */
  setup?: { heading: string; filename: string; code: string };
}
