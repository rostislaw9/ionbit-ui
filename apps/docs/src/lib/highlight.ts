import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

let highlighterPromise: Promise<HighlighterCore> | null = null;
const highlightedCache = new Map<string, string>();

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [
        import("shiki/themes/github-dark-default.mjs"),
        import("shiki/themes/github-light-default.mjs"),
      ],
      langs: [import("shiki/langs/css.mjs"), import("shiki/langs/bash.mjs")],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

/** Highlight code at runtime (for dynamic content the build plugin can't see). */
export async function highlightCode(
  code: string,
  lang: "css" | "bash",
): Promise<string> {
  const key = `${lang}\0${code}`;
  const cached = highlightedCache.get(key);
  if (cached) return cached;

  const hl = await getHighlighter();
  const html = hl.codeToHtml(code, {
    lang,
    themes: { dark: "github-dark-default", light: "github-light-default" },
    defaultColor: "dark",
  });
  highlightedCache.set(key, html);
  return html;
}
