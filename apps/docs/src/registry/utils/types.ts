import type { ReactNode } from "react";

export interface UtilClassEntry {
  className: string;
  styles: ReactNode;
}

export interface UtilDemo {
  render: () => ReactNode;
  /** Pre-highlighted HTML from Shiki. */
  code: string;
  /** Raw source code for the copy button. */
  rawCode: string;
}

export interface UtilBlock {
  prose?: ReactNode;
  /** Raw code string, highlighted at build time by the Shiki plugin. */
  code?: string;
}

export interface UtilSection {
  title: string;
  prose?: ReactNode;
  demo?: UtilDemo;
  /** Blocks rendered before the demo, in order. Each can be prose or code. */
  before?: UtilBlock[];
  /** Blocks rendered after the demo, in order. Each can be prose or code. */
  after?: UtilBlock[];
}

export interface UtilMeta {
  name: string;
  label: string;
  description: string;
  category: string;
  /** Hero demo shown at the top of the page. */
  heroDemo?: UtilDemo;
  /** Installation: npm/pnpm/yarn/bun command. */
  installCommand: string;
  /** Installation: CSS import statement. */
  cssImport: string;
  /** Usage section: class reference table. */
  classTable?: UtilClassEntry[];
  /** Usage section: primary code example. */
  usageCode?: string;
  /** Usage section: prose before the code example. */
  usageProse?: ReactNode;
  /** Usage section: prose after the code example. */
  usageProseAfter?: ReactNode;
  /** Additional content sections. */
  sections: UtilSection[];
}
