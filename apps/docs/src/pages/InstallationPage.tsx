import { Check, Copy, FileBracesCorner } from "lucide-react";
import { useMemo } from "react";
import highlightedInline from "virtual:highlighted-inline";

import { Button } from "@ionbit-ui/ui";

import { CopyButton } from "../components/code/CopyButton";
import { HighlightedCode } from "../components/code/HighlightedCode";
import { InlineCode } from "../components/code/InlineCode";
import { PmCommandBlock } from "../components/code/PmCommandBlock";
import { SidebarLayout } from "../components/layout/SidebarLayout";
import { OnThisPage } from "../components/page/OnThisPage";
import { SectionHeading } from "../components/page/SectionHeading";
import installationMarkdown from "../content/installation.md?raw";
import { useCopyPage } from "../hooks/useCopyPage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  flattenSectionIds,
  useScrollSpy,
  type Section,
} from "../hooks/useScrollSpy";
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";
import { cliCmd } from "../lib/package-managers";

/** Code block with a filename header — matches Cursor section style. */
function FileCodeBlock({
  filename,
  rawCode,
  html,
}: {
  filename: string;
  rawCode: string;
  html: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between gap-2 border-b border-border py-2 pr-2.5 pl-4">
        <div className="flex min-w-0 items-center gap-2">
          <FileBracesCorner className="h-4 w-4 shrink-0 text-foreground-subtle" />
          <span className="font-mono text-xs text-foreground-muted">
            {filename}
          </span>
        </div>
        <CopyButton text={rawCode} />
      </div>
      <HighlightedCode html={html} className="shiki-nolines" />
    </div>
  );
}

export function InstallationPage() {
  useDocumentTitle("Installation");

  const { pageCopied, handleCopyPage } = useCopyPage(
    () => installationMarkdown,
  );

  const sections = useMemo<Section[]>(
    () => [
      {
        id: "quick-start",
        label: "Quick Start",
        subsections: [
          { id: "qs-init", label: "Initialize your project" },
          { id: "qs-add", label: "Add components" },
          { id: "qs-list", label: "Browse available components" },
          { id: "qs-import", label: "Import and use" },
        ],
      },
      {
        id: "manual",
        label: "Manual Setup",
        subsections: [
          { id: "man-config", label: "Create the config file" },
          { id: "man-css", label: "Set up CSS imports" },
          { id: "man-add", label: "Add components with the CLI" },
        ],
      },
      { id: "requirements", label: "Requirements" },
    ],
    [],
  );

  const sectionIds = useMemo(() => flattenSectionIds(sections), [sections]);
  const { activeSection, handleSectionClick } = useScrollSpy(
    sectionIds,
    "install",
  );
  useScrollToAnchor(sectionIds);

  const initCmds = highlightedInline["__install_init__"]!.install;
  const addCmds = highlightedInline["__install_add__"]!.install;
  const addMultipleCmds =
    highlightedInline["__install_add_multiple__"]!.install;
  const listCmds = highlightedInline["__install_list__"]!.install;
  const configBlock = highlightedInline["__install_config__"]!;
  const cssBlock = highlightedInline["__install_css__"]!;
  const tsxBlock = highlightedInline["__install_tsx__"]!;

  const quickStartSteps = [
    {
      id: "qs-init",
      heading: "Initialize your project",
      content: (
        <>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Run <InlineCode>init</InlineCode> in your project root. This creates
            an <InlineCode>ionbit-ui.config.json</InlineCode>, sets up the
            directory structure, and installs the <InlineCode>cn</InlineCode>{" "}
            utility and design tokens.
          </p>
          <PmCommandBlock
            copyText={(pmId) => cliCmd(pmId, "init")}
            codeHtml={initCmds}
          />
        </>
      ),
    },
    {
      id: "qs-add",
      heading: "Add components",
      content: (
        <>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Add individual components as needed. The CLI fetches the source from
            the registry and places it in your project.
          </p>
          <PmCommandBlock
            copyText={(pmId) => cliCmd(pmId, "add button")}
            codeHtml={addCmds}
          />
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            You can add multiple components at once:
          </p>
          <PmCommandBlock
            copyText={(pmId) => cliCmd(pmId, "add button dialog accordion")}
            codeHtml={addMultipleCmds}
          />
        </>
      ),
    },
    {
      id: "qs-list",
      heading: "Browse available components",
      content: (
        <>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            List all components and utilities available in the registry.
          </p>
          <PmCommandBlock
            copyText={(pmId) => cliCmd(pmId, "list")}
            codeHtml={listCmds}
          />
        </>
      ),
    },
    {
      id: "qs-import",
      heading: "Import and use",
      content: (
        <>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Components are added to <InlineCode>src/components/ui/</InlineCode>.
            Import them using the path alias configured during init.
          </p>
          <FileCodeBlock
            filename="App.tsx"
            rawCode={tsxBlock.rawCode!}
            html={tsxBlock.codeHtml!}
          />
        </>
      ),
    },
  ];

  const manualSteps = [
    {
      id: "man-config",
      heading: "Create the config file",
      content: (
        <>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Create an <InlineCode>ionbit-ui.config.json</InlineCode> in your
            project root. This tells the CLI where to place components and
            styles.
          </p>
          <FileCodeBlock
            filename="ionbit-ui.config.json"
            rawCode={configBlock.rawCode!}
            html={configBlock.codeHtml!}
          />
        </>
      ),
    },
    {
      id: "man-css",
      heading: "Set up CSS imports",
      content: (
        <>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Add the token, base, and utility CSS imports to your main
            stylesheet. The <InlineCode>init</InlineCode> command does this
            automatically.
          </p>
          <FileCodeBlock
            filename="src/index.css"
            rawCode={cssBlock.rawCode!}
            html={cssBlock.codeHtml!}
          />
        </>
      ),
    },
    {
      id: "man-add",
      heading: "Add components with the CLI",
      content: (
        <>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Once configured, use the <InlineCode>add</InlineCode> command to
            fetch component source files into your project.
          </p>
          <PmCommandBlock
            copyText={(pmId) => cliCmd(pmId, "add button")}
            codeHtml={addCmds}
          />
        </>
      ),
    },
  ];

  const requirements = [
    "React 18+ — components use modern React features.",
    "Tailwind CSS v4 — the design system is built on Tailwind v4 with CSS custom properties.",
    "Node.js 18+ — required for the CLI.",
    "A bundler — Vite, Next.js, or any bundler that supports CSS imports and path aliases.",
  ];

  return (
    <SidebarLayout
      rightSidebar={
        <OnThisPage
          sections={sections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
      }
    >
      <div className="flex flex-col gap-8">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Getting started
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Installation
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-foreground-muted md:text-sm">
              Set up Ionbit UI in your React project with the CLI, or add
              components manually.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyPage}
            aria-label={pageCopied ? "Copied" : "Copy page as markdown"}
            className="hidden shrink-0 sm:flex"
          >
            {pageCopied ? (
              <Check data-icon="inline-start" />
            ) : (
              <Copy data-icon="inline-start" />
            )}
            {pageCopied ? "Copied" : "Copy Page"}
          </Button>
        </header>

        {/* Quick Start */}
        <section id="quick-start" className="flex scroll-mt-24 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SectionHeading id="quick-start">Quick Start</SectionHeading>
            <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
              The fastest way to get started. The CLI scaffolds the directory
              structure, installs base dependencies, and sets up your CSS
              imports.
            </p>
          </div>
          <div className="steps flex flex-col gap-6 [counter-reset:step] md:ml-4 md:border-l md:pl-8">
            {quickStartSteps.map((step) => (
              <div
                key={step.id}
                id={step.id}
                className="flex scroll-mt-24 flex-col gap-3"
              >
                <h3 className="step text-lg font-semibold text-foreground md:text-sm">
                  {step.heading}
                </h3>
                {step.content}
              </div>
            ))}
          </div>
        </section>

        {/* Manual Setup */}
        <section id="manual" className="flex scroll-mt-24 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SectionHeading id="manual">Manual Setup</SectionHeading>
            <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
              Prefer to set things up yourself? Follow these steps to configure
              Ionbit UI manually.
            </p>
          </div>
          <div className="steps flex flex-col gap-6 [counter-reset:step] md:ml-4 md:border-l md:pl-8">
            {manualSteps.map((step) => (
              <div
                key={step.id}
                id={step.id}
                className="flex scroll-mt-24 flex-col gap-3"
              >
                <h3 className="step text-lg font-semibold text-foreground md:text-sm">
                  {step.heading}
                </h3>
                {step.content}
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section id="requirements" className="flex scroll-mt-24 flex-col gap-3">
          <SectionHeading id="requirements">Requirements</SectionHeading>
          <ul className="flex flex-col gap-2">
            {requirements.map((req) => (
              <li
                key={req}
                className="flex items-start gap-2 text-base text-foreground-muted md:text-sm"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {req}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SidebarLayout>
  );
}
