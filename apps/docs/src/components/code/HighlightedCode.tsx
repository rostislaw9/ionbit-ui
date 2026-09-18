interface HighlightedCodeProps {
  /** Pre-highlighted HTML from Shiki (generated at build time). */
  html: string;
  className?: string;
  /** Language hint — when set, renders raw text instead of pre-highlighted HTML. */
  lang?: string;
}

/**
 * Renders pre-highlighted HTML from Shiki.
 * All highlighting is done at build time via the `?highlighted` Vite plugin
 * — no Shiki runtime in the browser bundle.
 *
 * When `lang` is provided, the `html` prop is treated as raw text and
 * rendered in a plain <pre> block (used for inline code in util pages).
 */
export function HighlightedCode({
  html,
  className,
  lang,
}: HighlightedCodeProps) {
  if (lang) {
    return (
      <pre
        className={className}
        style={{ margin: 0, padding: "1rem 1.25rem 1rem 0.5rem" }}
      >
        <code
          style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
        >
          {html}
        </code>
      </pre>
    );
  }
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
