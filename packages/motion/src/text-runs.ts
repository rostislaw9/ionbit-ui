/**
 * Opt-out attribute — elements marked `data-motion-skip` keep their
 * text untouched by text-walking motion effects (Scramble, Typewriter).
 * Marks a subtree the same way a nested primitive root is skipped.
 */
export const MOTION_SKIP_ATTR = "data-motion-skip";

/** One contiguous run of sibling text nodes inside an element. */
export interface TextRun {
  /** Original text nodes — React keeps ownership; write only via `data`. */
  nodes: Text[];
  /** Original data per node — restore on teardown. */
  data: string[];
  /** Joined text of the run. */
  text: string;
  chars: string[];
}

/**
 * Collects an element's text content into runs — one run per maximal
 * group of contiguous sibling text nodes. A run like `{x}%` renders as
 * a single box (one anonymous flex item), so it is processed as one
 * run; splitting it into per-node units would create extra flex items
 * and pick up the parent's `gap`.
 *
 * Whitespace-only runs carry no content and are skipped. Text inside a
 * nested element marked with `markerAttr` belongs to that nested
 * instance, and elements marked `data-motion-skip` are excluded —
 * both are skipped.
 */
export function collectTextRuns(
  el: HTMLElement,
  markerAttr: string,
): TextRun[] {
  const runs: TextRun[] = [];

  const visit = (parent: Node) => {
    let run: Text[] = [];
    const flush = () => {
      const nodes = run;
      run = [];
      const text = nodes.map((n) => n.data).join("");
      if (text.trim().length === 0) return;
      runs.push({
        nodes,
        data: nodes.map((n) => n.data),
        text,
        chars: Array.from(text),
      });
    };
    for (const child of parent.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        run.push(child as Text);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        flush();
        const c = child as Element;
        if (!c.hasAttribute(markerAttr) && !c.hasAttribute(MOTION_SKIP_ATTR))
          visit(c);
      }
      // Comments etc. generate no boxes — they don't break the run.
    }
    flush();
  };
  visit(el);
  return runs;
}
