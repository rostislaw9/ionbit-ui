import { useEffect, useMemo, useState } from "react";

import { CopyButton } from "../components/code/CopyButton";
import { HighlightedCode } from "../components/code/HighlightedCode";
import { PmCommandBlock } from "../components/code/PmCommandBlock";
import { SidebarLayout } from "../components/layout/SidebarLayout";
import { SectionHeading } from "../components/page/SectionHeading";
import { ThemeControls } from "../components/theme/ThemeCustomizer";
import { ThemePreview } from "../components/theme/ThemePreview";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useScrollToAnchor } from "../hooks/useScrollToAnchor";
import { useThemeCustomizer } from "../hooks/useThemeCustomizer";
import { highlightCode } from "../lib/highlight";
import { cliCmd, PACKAGE_MANAGERS } from "../lib/package-managers";

const SECTION_IDS = ["preview", "install"];

function DynamicCodeBlock({ code, lang }: { code: string; lang: "css" }) {
  const [html, setHtml] = useState("");
  // The CSS is ~40KB — re-tokenizing per slider tick stutters the drag.
  // The previous highlight stays visible until the input settles.
  const settledCode = useDebouncedValue(code, 250);
  useEffect(() => {
    let cancelled = false;
    highlightCode(settledCode, lang).then((h) => {
      if (!cancelled) setHtml(h);
    });
    return () => {
      cancelled = true;
    };
  }, [settledCode, lang]);
  return (
    <HighlightedCode
      html={html || code}
      className="shiki-nolines"
      lang={html ? undefined : lang}
    />
  );
}

/** Highlight the CLI command once per package manager (runtime shiki). */
function useHighlightedCommand(args: string): Record<string, string> {
  const [html, setHtml] = useState<Record<string, string>>({});
  // Customized themes embed a JSON blob that changes per slider tick —
  // highlight only once the input settles.
  const settledArgs = useDebouncedValue(args, 200);
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      PACKAGE_MANAGERS.map(async (pm) => {
        const cmd = `${pm.prefix} ${settledArgs}`;
        return [pm.id, await highlightCode(cmd, "bash")] as const;
      }),
    ).then((entries) => {
      if (!cancelled) setHtml(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, [settledArgs]);
  // Fall back to raw command text until highlighting resolves.
  return Object.fromEntries(
    PACKAGE_MANAGERS.map((pm) => [
      pm.id,
      html[pm.id] ?? `${pm.prefix} ${args}`,
    ]),
  );
}

export function ThemePage() {
  useDocumentTitle("Themes");
  useScrollToAnchor(SECTION_IDS);

  const state = useThemeCustomizer();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const { cliCommand, cssOutput, currentPreset } = state;

  // Strip the leading `npx ` — PmCommandBlock applies per-PM prefixes.
  const commandArgs = cliCommand.replace(/^npx /, "");
  const commandHtml = useHighlightedCommand(commandArgs);

  // Extract only the primitives ThemePreview needs (avoids re-render on
  // unrelated state changes like selectedId / customized).
  const previewProps = useMemo(
    () => ({
      spotlightIntensity: currentPreset.settings.spotlightIntensity,
      magneticIntensity: currentPreset.settings.magneticIntensity,
      glowIntensity: currentPreset.settings.glowIntensity,
      pulseIntensity: currentPreset.settings.pulseIntensity,
      rippleIntensity: currentPreset.settings.rippleIntensity,
      tiltIntensity: currentPreset.settings.tiltIntensity,
      reflectionIntensity: currentPreset.settings.reflectionIntensity,
      scrambleIntensity: currentPreset.settings.scrambleIntensity,
      traceIntensity: currentPreset.settings.traceIntensity,
      translucency: currentPreset.settings.translucency,
      radiusSm: currentPreset.radius.sm,
      radiusXl: currentPreset.radius.xl,
    }),
    [
      currentPreset.settings.spotlightIntensity,
      currentPreset.settings.magneticIntensity,
      currentPreset.settings.glowIntensity,
      currentPreset.settings.pulseIntensity,
      currentPreset.settings.rippleIntensity,
      currentPreset.settings.tiltIntensity,
      currentPreset.settings.reflectionIntensity,
      currentPreset.settings.scrambleIntensity,
      currentPreset.settings.traceIntensity,
      currentPreset.settings.translucency,
      currentPreset.radius.sm,
      currentPreset.radius.xl,
    ],
  );

  return (
    <SidebarLayout
      rightSidebar={isDesktop ? <ThemeControls state={state} /> : undefined}
    >
      <div className="flex flex-col gap-12">
        <header className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Themes
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Make it yours
          </h1>
          <p className="max-w-2xl text-foreground-muted">
            Choose a preset or fine-tune every color, radius, and effect. Copy
            the CLI command to install the theme in your project.
          </p>
        </header>

        {!isDesktop && <ThemeControls state={state} />}

        <section id="preview" className="flex scroll-mt-24 flex-col gap-4">
          <SectionHeading id="preview">Live Preview</SectionHeading>
          <ThemePreview {...previewProps} />
        </section>

        <section id="install" className="flex scroll-mt-24 flex-col gap-4">
          <SectionHeading id="install">Install</SectionHeading>
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Apply the selected theme to your project:
          </p>
          <PmCommandBlock
            copyText={(pmId) => cliCmd(pmId, commandArgs)}
            codeHtml={commandHtml}
          />
          <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
            Or paste the generated CSS into your global CSS file:
          </p>
          <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
            <div className="absolute top-2.5 right-2.5 z-10 bg-inherit">
              <CopyButton text={cssOutput} />
            </div>
            <div className="no-scrollbar max-h-80 scroll-fade overflow-y-auto scroll-fade-12">
              <DynamicCodeBlock code={cssOutput} lang="css" />
            </div>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
