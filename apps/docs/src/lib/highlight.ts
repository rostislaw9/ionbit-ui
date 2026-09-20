import type { HighlighterCore } from "shiki/core";

let highlighterPromise: Promise<HighlighterCore> | null = null;
// Bounded FIFO — drag-driven callers produce a unique string per tick;
// without a cap the cache grows for the session's lifetime.
const HIGHLIGHT_CACHE_CAP = 64;
const highlightedCache = new Map<string, string>();

// Everything shiki is imported dynamically — the engine is large and only
// the Theme page needs it at runtime, so it must not land in a shared chunk.
function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import("shiki/core"),
      import("shiki/engine/javascript"),
    ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [
          import("shiki/themes/github-dark-default.mjs"),
          import("shiki/themes/github-light-default.mjs"),
        ],
        langs: [import("shiki/langs/css.mjs"), import("shiki/langs/bash.mjs")],
        engine: createJavaScriptRegexEngine(),
      }),
    );
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
  if (highlightedCache.size >= HIGHLIGHT_CACHE_CAP) {
    highlightedCache.delete(highlightedCache.keys().next().value!);
  }
  highlightedCache.set(key, html);
  return html;
}
