import {
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useReducedMotion } from "../hooks/use-reduced-motion";
import { observeIntersection } from "../intersection-observer-pool";
import { motionTokens } from "../tokens";

/** Default glyph pool — reads as a "decoding" charset. */
const DEFAULT_CHARACTERS = "!<>-_\\/[]{}=+*^?#";

/** Marks a Scramble root so nested instances decode only their own text. */
const SCRAMBLE_ATTR = "data-scramble";

/** Visually hidden styles for the transient screen-reader copy. */
const srOnlyCss: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: "0",
};

function isSpace(ch: string): boolean {
  return ch === " " || ch === "\n" || ch === "\t" || ch === "\r";
}

/**
 * Flattens children to their text content. Element children get a new
 * identity every render, so this stable signature — not `children` —
 * drives the re-decode-on-change effect.
 */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node))
    return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

/** One decoded text node plus the markup this pass inserted for it. */
interface ScrambleSlot {
  /** Original text node — kept attached but emptied during the pass. */
  node: Text;
  text: string;
  chars: string[];
  /** Last string written into `node` — "" while the pass owns it. */
  last: string;
  /** Last string written into the glyph layer — skips no-op writes. */
  out: string;
  /** Wrapper holding the hidden sizer + glyph layer — removed on finish. */
  holder: HTMLSpanElement | null;
  /** Absolutely positioned layer the decode writes to. */
  layer: HTMLSpanElement | null;
  /** Externally mutated — the pass no longer owns this slot. */
  dead: boolean;
}

/**
 * Collects an element's descendant text nodes in document order. Text
 * inside a nested Scramble root belongs to that instance and is skipped.
 */
function collectTextSlots(el: HTMLElement): ScrambleSlot[] {
  const slots: ScrambleSlot[] = [];
  const walker = el.ownerDocument.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const holder = (node as Text).parentElement;
      return holder && holder.closest(`[${SCRAMBLE_ATTR}]`) === el
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });
  let node = walker.nextNode();
  while (node) {
    const text = node as Text;
    if (text.data.length > 0) {
      slots.push({
        node: text,
        text: text.data,
        chars: Array.from(text.data),
        last: text.data,
        out: text.data,
        holder: null,
        layer: null,
        dead: false,
      });
    }
    node = walker.nextNode();
  }
  return slots;
}

/**
 * Wraps a slot for the decode pass: the original text node stays in
 * place (emptied — React must be able to `removeChild` it where it
 * created it) and a holder is inserted after it containing a
 * `visibility: hidden` clone of the text plus an absolutely
 * positioned glyph layer.
 *
 * The hidden clone preserves the exact rendered layout — same font,
 * kerning, ligatures, and wrap points — so the text looks identical
 * to its final state at every frame: no resize, no drift, no extra
 * wrapping. The glyph layer writes the decode on top; `overflow:
 * hidden` clips it to the holder's box, so glyph width can never
 * affect layout.
 */
function wrapSlot(slot: ScrambleSlot, doc: Document): void {
  const holder = doc.createElement("span");
  holder.style.position = "relative";
  const sizer = doc.createElement("span");
  sizer.style.visibility = "hidden";
  sizer.textContent = slot.text;
  const layer = doc.createElement("span");
  layer.style.position = "absolute";
  layer.style.inset = "0";
  layer.style.overflow = "hidden";
  layer.style.pointerEvents = "none";
  layer.setAttribute("aria-hidden", "true");
  layer.textContent = slot.text;
  holder.append(sizer, layer);
  slot.node.data = "";
  slot.last = "";
  slot.out = slot.text;
  slot.node.after(holder);
  slot.holder = holder;
  slot.layer = layer;

  // The absolute layer starts its own line-height context, so its
  // text sits half a leading lower than the inline text it covers —
  // measure the baseline delta and shift the layer to compensate.
  const range = doc.createRange();
  if (typeof range.getBoundingClientRect === "function") {
    range.selectNodeContents(sizer);
    const sizerTop = range.getBoundingClientRect().top;
    range.selectNodeContents(layer);
    const layerTop = range.getBoundingClientRect().top;
    const delta = sizerTop - layerTop;
    if (delta !== 0) {
      layer.style.top = `${delta}px`;
      layer.style.bottom = "auto";
      layer.style.height = "auto";
    }
    range.detach();
  }
}

interface ScrambleRunOptions {
  /** Total decode time in ms (already intensity-scaled). */
  duration: number;
  /** ms between glyph updates for unsettled characters. */
  interval: number;
  characters: string;
  onDone?: () => void;
}

/**
 * Runs one decode pass over every text node inside `el`. Characters
 * settle left-to-right at staggered times (with slight jitter so it
 * doesn't look mechanical) after a short all-glyph lead-in; whitespace
 * is never scrambled. Each text node is emptied (React keeps ownership)
 * while a hidden clone of it preserves the exact layout and an
 * absolutely positioned, overflow-clipped layer draws the decode on
 * top — the text looks identical to its final state at every frame.
 * DOM writes only — no React re-renders.
 *
 * While the pass runs, `el` is `aria-hidden` and a visually hidden
 * sibling carries the real text; both revert on completion. A slot is
 * only written while it still holds our last write, so a concurrent
 * React update (children changed mid-decode) is never overwritten.
 *
 * @returns A cancel function that stops the pass and restores the text.
 */
function startScramble(
  el: HTMLElement,
  { duration, interval, characters, onDone }: ScrambleRunOptions,
): () => void {
  const slots = collectTextSlots(el);
  const total = slots.reduce((n, s) => n + s.chars.length, 0);
  const glyphs = Array.from(characters);
  if (duration <= 0 || total === 0 || glyphs.length === 0) {
    onDone?.();
    return () => {};
  }

  const leadIn = duration * 0.15;
  const lockAt: number[] = [];
  let g = 0;
  for (const s of slots)
    for (const ch of s.chars) {
      lockAt.push(
        isSpace(ch)
          ? 0
          : leadIn + ((g + Math.random() * 0.4) / total) * (duration - leadIn),
      );
      g++;
    }

  const doc = el.ownerDocument;

  // Wrap each text node: a hidden clone keeps the exact layout while
  // an absolute glyph layer decodes on top — the text looks identical
  // to its final state at every frame.
  for (const s of slots) wrapSlot(s, doc);

  // Screen readers get a static copy while the visual text decodes.
  // Skipped when focus is inside — aria-hidden must not hide focus.
  const hideable = !el.contains(doc.activeElement);
  const prevHidden = el.getAttribute("aria-hidden");
  const sr = doc.createElement("span");
  Object.assign(sr.style, srOnlyCss);
  sr.textContent = slots.map((s) => s.text).join("");
  if (hideable) {
    el.setAttribute("aria-hidden", "true");
    el.insertAdjacentElement("afterend", sr);
  }

  const start = performance.now();
  let last = -Infinity;
  let raf = 0;
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    if (prevHidden === null) el.removeAttribute("aria-hidden");
    else el.setAttribute("aria-hidden", prevHidden);
    sr.remove();
  };
  const restore = () => {
    for (const s of slots) {
      if (s.dead) continue;
      s.holder?.remove();
      s.holder = null;
      if (s.node.data === s.last) s.node.data = s.text;
    }
  };

  const step = (now: number) => {
    const t = now - start;
    if (t >= duration) {
      restore();
      finish();
      onDone?.();
      return;
    }
    if (now - last >= interval) {
      last = now;
      let i = 0;
      for (const s of slots) {
        // Externally mutated or detached (e.g. React rendered new
        // children) — the owner's text wins; drop our markup and
        // stop writing this slot.
        if (!s.dead && (s.node.data !== s.last || !s.node.isConnected)) {
          s.holder?.remove();
          s.holder = null;
          s.dead = true;
        }
        if (s.dead) {
          i += s.chars.length;
          continue;
        }
        let out = "";
        for (let j = 0; j < s.chars.length; j++, i++) {
          out +=
            t >= lockAt[i]!
              ? s.chars[j]
              : glyphs[(Math.random() * glyphs.length) | 0];
        }
        if (s.layer && out !== s.out) {
          s.layer.textContent = out;
          s.out = out;
        }
      }
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(raf);
    restore();
    finish();
  };
}

export interface ScrambleProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /**
   * Content whose text should decode — any renderable children. All
   * descendant text animates in place while the markup is preserved,
   * so a button, paragraph, or card can be wrapped whole. When
   * `children` changes after the first play, the new text re-decodes.
   */
  children?: ReactNode;
  /**
   * 0..1 — scales `duration` (0 settles instantly).
   * @default motionTokens.intensity.scramble
   */
  intensity?: number;
  /** Decode duration in ms at full intensity. @default 800 */
  duration?: number;
  /** ms between glyph updates for unsettled characters. @default 40 */
  speed?: number;
  /** Glyph pool used while decoding. @default "!<>-_\\/[]{}=+*^?#" */
  characters?: string;
  /**
   * When the decode plays. `"focus"` replays whenever the element or
   * a descendant gains focus (keyboard or click activation).
   * @default "view"
   */
  trigger?: "view" | "hover" | "focus";
  /** With `trigger="view"`: decode only on first reveal. @default true */
  once?: boolean;
  /** IntersectionObserver threshold for the view trigger. @default 0.4 */
  threshold?: number;
  /** Called after each decode completes. */
  onComplete?: () => void;
  /** Disable the effect — renders content as-is. @default false */
  disabled?: boolean;
  /** Render as a different element. @default "span" */
  as?: "span" | "div" | "p";
}

/**
 * Scramble — text decodes into place: characters cycle random glyphs,
 * then settle left-to-right. Applies to every text node inside the
 * element, so it can wrap plain text or whole structures (buttons,
 * paragraphs, cards). Plays on first reveal (view trigger), on hover,
 * on focus, and again whenever `children` changes — suited to stat
 * values, version strings, and status transitions.
 *
 * While decoding, the element is `aria-hidden` and a transient,
 * visually hidden sibling carries the real text so screen readers get
 * the final value instead of mid-decode glyphs.
 *
 * Reduced motion: the effect is disabled entirely — the content
 * renders as-is.
 *
 * During a decode each text node is swapped for a hidden clone plus
 * an overflow-clipped glyph layer, so the rendered layout is
 * pixel-identical to the final state — a wrapped button can't
 * resize and text can't re-wrap mid-animation.
 *
 * Performance: DOM text-node mutations only, throttled by `interval`;
 * no React state updates or re-renders during the decode. The view
 * trigger shares the IntersectionObserver pool.
 */
export const Scramble = forwardRef<HTMLElement, ScrambleProps>(
  function Scramble(
    {
      children,
      intensity = motionTokens.intensity.scramble,
      duration = 800,
      speed = 40,
      characters = DEFAULT_CHARACTERS,
      trigger = "view",
      once = true,
      threshold = 0.4,
      onComplete,
      disabled = false,
      as: Tag = "span",
      style,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const enabled = !disabled && !reduced;
    const rootRef = useRef<HTMLElement | null>(null);
    const cancelRef = useRef<(() => void) | null>(null);
    const playedRef = useRef(false);

    const run = useCallback(() => {
      const el = rootRef.current;
      if (!el) return;
      playedRef.current = true;
      cancelRef.current?.();
      cancelRef.current = startScramble(el, {
        duration: duration * intensity,
        interval: speed,
        characters,
        onDone: onComplete,
      });
    }, [characters, duration, intensity, onComplete, speed]);

    // Trigger: first reveal (or every reveal when once=false).
    useEffect(() => {
      if (!enabled || trigger !== "view") return;
      const el = rootRef.current;
      if (!el) return;
      return observeIntersection(
        el,
        threshold,
        (hit) => {
          if (hit) run();
        },
        once,
      );
    }, [enabled, trigger, once, threshold, run]);

    // Trigger: hover — every pointerenter replays the decode.
    useEffect(() => {
      if (!enabled || trigger !== "hover") return;
      const el = rootRef.current;
      if (!el) return;
      el.addEventListener("pointerenter", run);
      return () => el.removeEventListener("pointerenter", run);
    }, [enabled, trigger, run]);

    // Trigger: focus — every focusin replays the decode. focusin
    // bubbles, so a wrapped Button/Input works without its own
    // listener. The decode skips aria-hidden while focus is inside,
    // so AT never loses the focused element.
    useEffect(() => {
      if (!enabled || trigger !== "focus") return;
      const el = rootRef.current;
      if (!el) return;
      el.addEventListener("focusin", run);
      return () => el.removeEventListener("focusin", run);
    }, [enabled, trigger, run]);

    // Re-decode when the content changes after the first play. Before
    // the first play — or when disabled — React's own rendering shows
    // the final content; just cancel any in-flight decode. `textKey`
    // (not `children`) is the dep — element children are new objects
    // every render, but only a real text change should re-decode.
    const textKey = useMemo(() => textOf(children), [children]);
    useEffect(() => {
      cancelRef.current?.();
      cancelRef.current = null;
      if (enabled && playedRef.current) run();
    }, [textKey, enabled, run]);

    // Stop any in-flight decode on unmount.
    useEffect(() => () => cancelRef.current?.(), []);

    const OuterTag = Tag as "span";
    return (
      <OuterTag
        ref={(node: HTMLSpanElement | null) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-scramble=""
        style={style}
        {...rest}
      >
        {children}
      </OuterTag>
    );
  },
);
