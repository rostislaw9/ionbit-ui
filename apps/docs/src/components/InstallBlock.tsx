import type { BasedOn } from "../registry/components/types";

import { FileBracesCorner } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import highlightedInline from "virtual:highlighted-inline";
import sourceLoaders from "virtual:highlighted-sources-map";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ionbit-ui/ui";

import { PACKAGE_MANAGERS, pmInstallCmd } from "../lib/package-managers";
import { CopyButton } from "./CopyButton";
import { HighlightedCode } from "./HighlightedCode";
import { PmCommandBlock } from "./PmCommandBlock";
import { SourceCodeBlock, type SourceFile } from "./SourceCodeBlock";

interface SourceEntry {
  sourceFiles: SourceFile[];
  depInstall: Record<string, string>;
}

interface SetupMeta {
  heading: string;
  filename: string;
  code: string;
}

interface InstallBlockProps {
  name: string;
  basedOn?: BasedOn;
  setup?: SetupMeta;
}

const PM_INSTALL_CMD = pmInstallCmd("radix-ui");

const INSTALL_TAB_KEY = "ionbit:install-tab";

const LINK_TAB_CLASS =
  "rounded-none border-0 border-b-2 border-transparent px-0 pb-1 text-sm text-foreground-muted hover:text-foreground data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-none";

interface Step {
  heading: string;
  content?: ReactNode;
}

function Steps({ steps }: { steps: Step[] }) {
  const showMarkers = steps.length > 1;
  const containerClass = showMarkers
    ? "steps [counter-reset:step] md:ml-4 md:border-l md:pl-8 flex flex-col gap-6"
    : "flex flex-col gap-4";
  const headingClass = showMarkers
    ? "step text-lg md:text-sm font-semibold text-foreground"
    : "text-lg md:text-sm font-semibold text-foreground";

  return (
    <div className={containerClass}>
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col gap-3">
          <h3 className={headingClass}>{step.heading}</h3>
          {step.content}
        </div>
      ))}
    </div>
  );
}

export function InstallBlock({ name, basedOn, setup }: InstallBlockProps) {
  const [activeTab, setActiveTab] = useState<string>(
    () => localStorage.getItem(INSTALL_TAB_KEY) ?? "command",
  );
  const [sourceData, setSourceData] = useState<SourceEntry | null>(null);

  const inline = highlightedInline[name]!;
  const install = inline.install!;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem(INSTALL_TAB_KEY, value);
  };

  useEffect(() => {
    if (activeTab !== "manual") return;
    const loader = sourceLoaders[name];
    if (!loader) return;
    let cancelled = false;
    loader()
      .then((mod) => {
        if (!cancelled) setSourceData(mod.default);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [name, activeTab]);

  const sourceFiles = sourceData?.sourceFiles;
  const depInstall = sourceData?.depInstall;

  // Setup step (shared by both tabs when present)
  const setupStep: Step | null =
    setup && inline.setupHtml
      ? {
          heading: setup.heading,
          content: (
            <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
              <div className="flex items-center justify-between gap-2 border-b border-border py-2 pr-2.5 pl-4">
                <div className="flex min-w-0 items-center gap-2">
                  <FileBracesCorner className="h-4 w-4 shrink-0 text-foreground-subtle" />
                  <span className="font-mono text-xs text-foreground-muted">
                    {setup.filename}
                  </span>
                </div>
                <CopyButton text={inline.setupRawCode!} />
              </div>
              <HighlightedCode
                html={inline.setupHtml!}
                className="shiki-nolines"
              />
            </div>
          ),
        }
      : null;

  // Build Command tab steps
  const commandSteps: Step[] = [
    {
      heading: "Install the component:",
      content: (
        <>
          <PmCommandBlock
            copyText={(pmId) =>
              `${PACKAGE_MANAGERS.find((pm) => pm.id === pmId)!.prefix} ionbit-ui@latest add ${name}`
            }
            codeHtml={install}
          />
          {basedOn && (
            <p className="text-xs text-foreground-subtle">
              Built on {basedOn === "radix" ? "Radix UI" : "Base UI"} — npm
              dependencies will be installed automatically.
            </p>
          )}
        </>
      ),
    },
  ];
  if (setupStep) commandSteps.push(setupStep);

  // Build Manual tab steps
  const manualSteps: Step[] = [];
  if (basedOn && depInstall) {
    manualSteps.push({
      heading: "Install the following dependencies:",
      content: (
        <PmCommandBlock
          copyText={(pmId) => PM_INSTALL_CMD[pmId]!}
          codeHtml={depInstall}
        />
      ),
    });
  }
  if (sourceFiles && sourceFiles.length > 0) {
    manualSteps.push({
      heading: "Copy and paste the following code into your project.",
      content: (
        <div className="flex flex-col gap-3">
          {sourceFiles.map((file) => (
            <SourceCodeBlock key={`${name}/${file.filename}`} file={file} />
          ))}
        </div>
      ),
    });
  }
  if (setupStep) manualSteps.push(setupStep);
  if (sourceData) {
    manualSteps.push({
      heading: "Update the import paths to match your project setup.",
    });
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="flex flex-col gap-4"
    >
      <TabsList className="gap-6 rounded-none border-0 bg-transparent px-0 [&>span]:hidden">
        <TabsTrigger value="command" className={LINK_TAB_CLASS}>
          Command
        </TabsTrigger>
        <TabsTrigger value="manual" className={LINK_TAB_CLASS}>
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="command">
        <Steps steps={commandSteps} />
      </TabsContent>

      <TabsContent value="manual">
        <Steps steps={manualSteps} />
      </TabsContent>
    </Tabs>
  );
}
