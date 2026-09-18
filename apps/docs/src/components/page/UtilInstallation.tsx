import highlightedInline from "virtual:highlighted-inline";

import { PM_INSTALL_PREFIX } from "../../lib/package-managers";
import { CopyButton } from "../code/CopyButton";
import { HighlightedCode } from "../code/HighlightedCode";
import { InlineCode } from "../code/InlineCode";
import { PmCommandBlock } from "../code/PmCommandBlock";
import { SectionHeading } from "./SectionHeading";

export function UtilInstallation({
  utilName,
  cssImport,
}: {
  utilName: string;
  cssImport: string;
}) {
  return (
    <section id="installation" className="flex scroll-mt-24 flex-col gap-3">
      <SectionHeading id="installation">Installation</SectionHeading>
      <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
        If your project was set up with{" "}
        <InlineCode>npx ionbit-ui@latest init</InlineCode>, you already have{" "}
        <InlineCode>{utilName}</InlineCode>. It ships with the{" "}
        <InlineCode>ionbit-ui</InlineCode> package, which the CLI imports in
        your global CSS file.
      </p>
      <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
        Otherwise, install the <InlineCode>ionbit-ui</InlineCode> package:
      </p>
      <PmCommandBlock
        copyText={(pmId) => PM_INSTALL_PREFIX[pmId] + " ionbit-ui"}
        codeHtml={highlightedInline["__util_install__"]!.install!}
      />
      <p className="text-base leading-relaxed text-foreground-muted md:text-sm">
        Then import the utilities in your global CSS file:
      </p>
      <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
        <div className="absolute top-2.5 right-2.5 z-10 bg-inherit">
          <CopyButton text={cssImport} />
        </div>
        <HighlightedCode
          html={highlightedInline["__util_css__"]!.codeHtml!}
          className="shiki-nolines"
        />
      </div>
    </section>
  );
}
