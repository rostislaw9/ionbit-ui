import {
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useReducedMotion } from "../hooks/use-reduced-motion";
import { observeIntersection } from "../intersection-observer-pool";
import { ensureMotionStyles } from "../styles";
import { collectTextRuns, MOTION_SKIP_ATTR, type TextRun } from "../text-runs";

/**
 * Default glyph wheel — a real split-flap module only moves forward
 * through its character drum, so order matters: each flip advances
 * from the previous glyph toward the target in this sequence.
 * Characters outside the set (punctuation, lowercase) snap instantly.
 */
// The blank card is part of the wheel — a space in the charset is
// the drum's empty position. Charsets without it (a digit wheel)
// simply have no blank card.
const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

/** Marks a SplitFlap root so nested instances flip only their own text. */
const SPLITFLAP_ATTR = "data-splitflap";

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

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node))
    return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

/** A plain space and a non-breaking one are the same wheel position. */
const normGlyph = (c: string) => (c === " " ? "\u00A0" : c);

/**
 * Glyphs a cell flips through, current card to target card. The wheel
 * can only advance: from `prev` it walks forward until it lands on
 * `target` — a space in the charset is simply the drum's blank card,
 * no special casing. An absent or off-charset `prev` (mount, pad
 * position) rests on the blank card when the wheel has one, else the
 * drum spins up from `flaps` behind the target. Long hops are capped
 * at `flaps` — the wheel simply starts mid-sequence, which reads
 * identically. Returns null for chars that don't animate (same char,
 * or target off-charset).
 */
function flapSequence(
  prev: string | undefined,
  target: string,
  wheel: string[],
  flaps: number,
): string[] | null {
  const t = wheel.indexOf(normGlyph(target));
  if (t < 0 || flaps <= 0) return null;
  let p = prev === undefined ? -1 : wheel.indexOf(normGlyph(prev));
  if (p === t) return null;
  if (p < 0) {
    // No valid rest card — rest on the wheel's blank position when
    // the charset has one; a blankless wheel spins up from `flaps`
    // behind the target.
    p = wheel.indexOf("\u00A0");
    if (p < 0)
      p = (t - Math.min(flaps, wheel.length - 1) + wheel.length) % wheel.length;
  }

  const dist = (t - p + wheel.length) % wheel.length;
  const n = Math.min(dist, flaps);
  // Long hops are capped by truncating the FRONT of the path: the
  // first leaf jumps straight to the glyph `n` steps before the
  // target, then the wheel runs contiguously and lands exactly —
  // never a mid-sequence stall followed by a snap to the target.
  const seq = [wheel[p]!];
  for (let i = n - 1; i >= 0; i--)
    seq.push(wheel[(t - i + wheel.length) % wheel.length]!);
  return seq;
}

interface FlapCell {
  /** Glyph path: seq[0] shows first, seq[steps] is the target. */
  seq: string[];
  /** Number of card flips to land on the target. */
  steps: number;
  /** ms before this cell's first flip — the cascade stagger. */
  offset: number;
  /** Static top half — always shows the NEXT glyph's top. Clipped
   *  in sync with the falling leaf's projected edge, so the reveal
   *  never needs an opaque card. */
  top: HTMLSpanElement;
  topInner: HTMLSpanElement;
  /** Static bottom half — the CURRENT glyph's bottom. Clipped as the
   *  landing leaf covers it. */
  bottom: HTMLSpanElement;
  bottomInner: HTMLSpanElement;
  /** Falling leaf — current glyph's top half, hinges at midline. */
  flapTop: HTMLSpanElement;
  flapTopInner: HTMLSpanElement;
  /** Landing leaf — next glyph's bottom half, hinges at midline. */
  flapBottom: HTMLSpanElement;
  flapBottomInner: HTMLSpanElement;
  /** Cumulative step start times in local ms — times[k] is when flip
   *  k begins and times[steps] is when the run lands. Decelerating:
   *  early flips whip by, the landing flip is deliberately slow. */
  times: number[];
  /** Seq index the layers currently display — avoids no-op writes. */
  lastStep: number;
}

interface FlapSlot {
  /** Original text nodes — kept attached but emptied during the pass. */
  nodes: Text[];
  /** Original data per node — restored on finish. */
  data: string[];
  /** Wrapper holding the cells — removed on finish. */
  holder: HTMLSpanElement | null;
  /** Externally mutated — the pass no longer owns this slot. */
  dead: boolean;
}

interface SplitFlapRunOptions {
  /** Glyph wheel order. */
  charset: string[];
  /** Max forward flaps per character. */
  flaps: number;
  /** Base ms per flap step — eased per run (slower at the ends). */
  interval: number;
  /** ms between each character's first tick — the cascade. */
  stagger: number;
  /** ms before flipping starts. */
  delay: number;
  /** Previous text per run — chars flip from these glyphs. */
  prev: string[];
  /** Module count — positions beyond the text render blank cards,
   *  so the board keeps the width of the longest text shown. */
  minLen: number;
  onDone?: () => void;
}

/**
 * Flips every text node inside `el` into its target text, character by
 * character — the departure-board card flip. Each animating char
 * becomes a module holding two static half-layers (top = the NEXT
 * glyph's top half, bottom = the CURRENT glyph's bottom half) plus
 * two leaves hinged at the midline: the falling leaf carries the
 * current top half and rotates 0 → -90deg revealing the incoming top,
 * then the landing leaf swings +90 → 0deg into place as the new
 * bottom half. A single rAF loop drives rotation, shading and
 * per-frame leaf visibility on a staggered timeline — no
 * preserve-3d or backface-visibility, so an incoming glyph can never
 * paint early or overlap. Unchanged and off-charset chars render as
 * plain text so metrics stay identical.
 *
 * The original text nodes stay attached but emptied (React keeps
 * ownership); the holder with the cells is inserted after each run
 * and removed on finish, when node data is restored. `el` is
 * `aria-hidden` during the pass and a visually hidden sibling carries
 * the real text. A slot is only restored while its nodes still hold
 * our emptied value — a concurrent React update wins.
 *
 * @returns A cancel function that stops the pass and restores the text.
 */
function startSplitFlap(
  el: HTMLElement,
  {
    charset,
    flaps,
    interval,
    stagger,
    delay,
    prev,
    minLen,
    onDone,
  }: SplitFlapRunOptions,
): () => void {
  if (interval <= 0) {
    onDone?.();
    return () => {};
  }
  const runs = collectTextRuns(el, SPLITFLAP_ATTR);
  if (runs.length === 0) {
    onDone?.();
    return () => {};
  }

  const doc = el.ownerDocument;
  const slots: FlapSlot[] = [];
  const cells: FlapCell[] = [];
  // The wheel is normalized once per pass — flapSequence is called
  // per module position.
  const wheel = charset.map(normGlyph);
  let cellIndex = 0;

  // Blank cards pad to the longest text seen — on the side the
  // text alignment dictates, like a fixed-width module row on a
  // real board. Extra modules belong to the edge run.
  const align = doc.defaultView?.getComputedStyle(el).textAlign ?? "start";
  const totalLen = runs.reduce((n, r) => n + r.chars.length, 0);
  const extra = Math.max(0, minLen - totalLen);
  const edgeRun = align === "end" || align === "right" ? 0 : runs.length - 1;
  const totalModules = Math.max(
    totalLen + extra,
    prev.reduce((n, t) => n + Array.from(t).length, 0),
  );
  // Prev glyphs map by flat module position, not per run — a word's
  // tail pads must still find the prev chars they're replacing.
  const prevFlat = Array.from(prev.join(""));

  const offsetFor = (n: number, L: number) =>
    align === "end" || align === "right"
      ? L - n
      : align === "center"
        ? Math.floor((L - n) / 2)
        : 0;
  const prevOff = offsetFor(prevFlat.length, totalModules);

  let runPrefix = 0;
  runs.forEach((run, runIndex) => {
    const slot: FlapSlot = {
      nodes: run.nodes,
      data: run.data,
      holder: null,
      dead: false,
    };
    const holder = doc.createElement("span");
    // Never collected as text — re-triggered passes must not pick up
    // the previous holder's glyphs.
    holder.setAttribute(MOTION_SKIP_ATTR, "");

    // The module row is fixed-width: cells cover the run's module
    // count L, and target/prev glyphs are read through alignment
    // offsets — for text-end the blanks lead, for text-start they
    // trail, exactly like a real board. Pad positions flip to a
    // blank card so a shorter word never loses its tail.
    const L = run.chars.length + (runIndex === edgeRun ? extra : 0);
    const targetOff = offsetFor(run.chars.length, L);

    for (let i = 0; i < L; i++) {
      const ti = i - targetOff;
      const g = runPrefix + i - prevOff;
      const ch = ti >= 0 && ti < run.chars.length ? run.chars[ti]! : null;
      const pv = g >= 0 && g < prevFlat.length ? prevFlat[g] : undefined;
      const seq = flapSequence(pv, ch ?? " ", wheel, flaps);
      if (seq === null) {
        if (ch === null || ch.trim() !== "") {
          // Pad position, blank target, or off-charset glyph — a
          // static cell holds the module (blank cards keep the
          // board's width).
          const cell = doc.createElement("span");
          cell.style.display = "inline-block";
          cell.setAttribute(SPLITFLAP_ATTR + "-cell", "");
          cell.textContent = ch === null || ch.trim() === "" ? "\u00A0" : ch;
          holder.append(cell);
          cellIndex++;
        } else {
          // Real whitespace stays raw text — spacing and wrapping
          // behave normally.
          holder.append(doc.createTextNode(ch));
        }
        continue;
      }
      const glyph =
        ch === null || ch === " " || ch === "\u00A0" ? "\u00A0" : ch;
      const cell = doc.createElement("span");
      cell.style.display = "inline-block";
      cell.style.position = "relative";
      cell.style.perspective = "6em";
      cell.setAttribute(SPLITFLAP_ATTR + "-cell", "");
      cellIndex++;

      // An invisible copy of the glyph keeps the cell's width, height
      // and baseline identical to the text it replaces — without it
      // the animated module renders in a different line box and the
      // text visibly shifts when the pass starts or ends.
      const sizer = doc.createElement("span");
      sizer.style.visibility = "hidden";
      sizer.textContent = glyph;
      cell.append(sizer);

      // A half-glyph layer: 50% of the cell tall, overflow hidden.
      // The inner is the full glyph rendered with inherited metrics
      // (matching the sizer exactly); the bottom layer shifts it up
      // by half a cell so each layer shows exactly its half. Halves
      // anchor to the cell's left edge — the glyph's pen position —
      // so an animating glyph lands exactly where the text it
      // replaces sat; wide proportional glyphs overflow right
      // instead of shifting position.
      const makeHalf = (bottomHalf: boolean) => {
        const h = doc.createElement("span");
        h.style.position = "absolute";
        if (bottomHalf) {
          // Reach a hair above the midline — two layers meeting at
          // exactly 50% leave an AA seam that reads as a dark line.
          h.style.top = "calc(50% - 0.5px)";
          h.style.height = "calc(50% + 0.5px)";
        } else {
          h.style.top = "0";
          h.style.height = "50%";
        }
        h.style.left = "0";
        h.style.width = "max-content";
        h.style.minWidth = "100%";
        h.style.overflow = "hidden";
        const inner = doc.createElement("span");
        inner.style.display = "block";
        inner.style.height = "200%";
        // The bottom box starts 0.5px above the midline, so the inner
        // needs 1px back to keep the glyph's pen position exact —
        // without it the bottom half draws a pixel too high.
        if (bottomHalf) inner.style.transform = "translateY(calc(-50% + 1px))";
        h.append(inner);
        return { h, inner };
      };

      const top = makeHalf(false);
      // Hidden until the falling leaf vacates its projection — the
      // incoming top half is only ever revealed as the flip sweeps.
      top.h.style.clipPath = "inset(0 0 100% 0)";
      const bottom = makeHalf(true);

      // Two leaves, one per stage — deliberately no preserve-3d and
      // no backface-visibility. Each leaf is a plain transformed
      // child under the cell's perspective, and step() drives its
      // visibility explicitly, so no compositing quirk can ever show
      // an incoming glyph early or overlap two halves.
      //
      // flapTop: the CURRENT glyph's top half, hinged at the midline;
      //   rotates 0 → -90deg over the first half of the flip —
      //   falling away reveals the static NEXT top half behind it.
      // flapBottom: the NEXT glyph's bottom half, hinged at the
      //   midline; rotates +90 → 0deg over the second half — swings
      //   down and lands covering the static CURRENT bottom half.
      const flapTop = makeHalf(false);
      flapTop.h.style.transformOrigin = "50% 100%";
      flapTop.h.setAttribute(SPLITFLAP_ATTR + "-flap-top", "");
      const flapBottom = makeHalf(true);
      flapBottom.h.style.transformOrigin = "50% 0%";
      flapBottom.h.style.transform = "rotateX(90deg)";
      flapBottom.h.style.visibility = "hidden";
      flapBottom.h.setAttribute(SPLITFLAP_ATTR + "-flap-bottom", "");

      // Leaves paint above the static halves; the falling leaf last.
      cell.append(top.h, bottom.h, flapBottom.h, flapTop.h);
      top.inner.textContent = seq[1]!;
      bottom.inner.textContent = seq[0]!;
      flapTop.inner.textContent = seq[0]!;
      flapBottom.inner.textContent = seq[1]!;

      // Per-step schedule — the drum releases fast and decelerates
      // into the landing card, like a real board: early flips run
      // ~0.45x interval, the final flip ~1.8x. One- and two-flip hops
      // stay uniform (a single flip is already the landing), and the
      // deceleration scales with run length.
      const steps = seq.length - 1;
      const ramp = Math.min(1, Math.max(0, (steps - 2) / 6));
      const times = [0];
      for (let k = 0; k < steps; k++) {
        // u: 0 on the first flip, 1 on the last — decelerate into it.
        const u = steps <= 1 ? 1 : k / (steps - 1);
        times.push(
          times[k]! + interval * (1 - 0.55 * ramp + 1.35 * ramp * u * u),
        );
      }

      cells.push({
        seq,
        steps,
        times,
        offset: cellIndex * stagger,
        top: top.h,
        topInner: top.inner,
        bottom: bottom.h,
        bottomInner: bottom.inner,
        flapTop: flapTop.h,
        flapTopInner: flapTop.inner,
        flapBottom: flapBottom.h,
        flapBottomInner: flapBottom.inner,
        lastStep: -1,
      });
      holder.append(cell);
    }

    for (const n of slot.nodes) n.data = "";
    slot.nodes[slot.nodes.length - 1]!.after(holder);
    slot.holder = holder;
    slots.push(slot);
    runPrefix += L;
  });

  if (cells.length === 0) {
    for (const s of slots) {
      s.holder?.remove();
      for (let i = 0; i < s.nodes.length; i++)
        if (s.nodes[i]!.data === "") s.nodes[i]!.data = s.data[i]!;
    }
    onDone?.();
    return () => {};
  }

  // Screen readers get a static copy while the visual text flips.
  const prevHidden = el.getAttribute("aria-hidden");
  let sr: HTMLSpanElement | null = null;
  if (!el.contains(doc.activeElement)) {
    sr = doc.createElement("span");
    Object.assign(sr.style, srOnlyCss);
    sr.textContent = runs.map((r: TextRun) => r.text).join("");
    el.setAttribute("aria-hidden", "true");
    el.insertAdjacentElement("afterend", sr);
  }

  // Anchor to the first rAF timestamp — rAF times and
  // performance.now() are the same clock in browsers but different
  // epochs in jsdom; basing `elapsed` on the first frame keeps the
  // pass testable and frame-accurate.
  let start: number | null = null;
  let raf = 0;
  let done = false;

  const teardown = () => {
    if (done) return;
    done = true;
    for (const s of slots) {
      if (s.dead) continue;
      s.holder?.remove();
      for (let i = 0; i < s.nodes.length; i++) {
        // Restore only while the node still holds our emptied value —
        // an external write (React children changed) wins.
        if (s.nodes[i]!.data === "") s.nodes[i]!.data = s.data[i]!;
      }
    }
    if (sr) {
      if (prevHidden === null) el.removeAttribute("aria-hidden");
      else el.setAttribute("aria-hidden", prevHidden);
      sr.remove();
    }
  };

  const step = (now: number) => {
    if (start === null) start = now;
    const elapsed = now - start - delay;
    let finished = elapsed >= 0;
    if (elapsed >= 0) {
      for (const c of cells) {
        // Each cell flips on its own staggered timeline — sequential
        // flips are what make it read as a board, not a blur-swap.
        const local = elapsed - c.offset;
        if (local < 0) {
          finished = false;
          continue;
        }
        // Time only moves forward — resume the scan where the last
        // frame left off instead of re-walking the whole schedule.
        let stepIdx = Math.max(0, c.lastStep);
        while (stepIdx < c.steps && c.times[stepIdx + 1]! <= local) stepIdx++;
        const landed = stepIdx >= c.steps;

        if (stepIdx !== c.lastStep) {
          c.lastStep = stepIdx;
          if (landed) {
            // Settled — the static halves take over the target glyph.
            c.topInner.textContent = c.seq[c.steps]!;
            c.bottomInner.textContent = c.seq[c.steps]!;
            c.top.style.clipPath = "";
            c.bottom.style.clipPath = "";
            c.flapTop.style.visibility = "hidden";
            c.flapBottom.style.visibility = "hidden";
          } else {
            // Next flip: re-arm the leaves — the falling leaf shows
            // the outgoing top half, the landing leaf the incoming
            // bottom half, and the static layers hold in/out states.
            c.topInner.textContent = c.seq[stepIdx + 1]!;
            c.bottomInner.textContent = c.seq[stepIdx]!;
            c.flapTopInner.textContent = c.seq[stepIdx]!;
            c.flapBottomInner.textContent = c.seq[stepIdx + 1]!;
            c.flapTop.style.visibility = "visible";
            c.flapTop.style.transform = "rotateX(0deg)";
            c.flapTop.style.filter = "";
            c.flapBottom.style.visibility = "hidden";
            c.flapBottom.style.transform = "rotateX(90deg)";
            c.flapBottom.style.filter = "";
            c.top.style.clipPath = "inset(0 0 100% 0)";
            c.bottom.style.clipPath = "";
          }
        }
        if (landed) continue;

        const frac = Math.min(
          1,
          (local - c.times[stepIdx]!) /
            (c.times[stepIdx + 1]! - c.times[stepIdx]!),
        );
        if (frac < 0.5) {
          // First half — the leaf falls away from the midline,
          // accelerating like a released card and darkening as it
          // turns edge-on. The static top is clipped to the strip the
          // leaf's projection has already vacated — transparent
          // layers, exact compositing, no overlap on any background.
          const e = (frac / 0.5) ** 2;
          const covered = Math.cos((90 * e * Math.PI) / 180);
          c.flapTop.style.visibility = "visible";
          c.flapBottom.style.visibility = "hidden";
          c.flapTop.style.transform = `rotateX(${-90 * e}deg)`;
          c.flapTop.style.filter = `brightness(${1 - 0.4 * e})`;
          c.top.style.clipPath = `inset(0 0 ${covered * 100}% 0)`;
        } else {
          // Second half — the incoming bottom leaf swings down from
          // the midline and lands flat, relighting as it settles;
          // the static bottom is clipped away under its projection.
          const p = (frac - 0.5) / 0.5;
          const e = 1 - (1 - p) * (1 - p);
          const covered = Math.cos((90 * (1 - e) * Math.PI) / 180);
          c.flapTop.style.visibility = "hidden";
          c.flapBottom.style.visibility = "visible";
          c.flapBottom.style.transform = `rotateX(${90 * (1 - e)}deg)`;
          c.flapBottom.style.filter = `brightness(${0.6 + 0.4 * e})`;
          c.top.style.clipPath = "";
          c.bottom.style.clipPath = `inset(${covered * 100}% 0 0 0)`;
        }
        finished = false;
      }
    }
    // Externally mutated runs drop their markup — the owner's text
    // (React's new children) is already in place.
    for (const s of slots) {
      if (!s.dead && s.nodes.some((n) => n.data !== "")) {
        s.holder?.remove();
        s.dead = true;
      }
    }
    if (finished) {
      teardown();
      onDone?.();
      return;
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(raf);
    teardown();
  };
}

export interface SplitFlapProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /**
   * Content whose text should flip in — any renderable children. All
   * descendant text flips in place, so a board row or card can be
   * wrapped whole. When `children` changes after the first play, only
   * the changed characters re-flip — each one cycles forward from its
   * previous glyph.
   *
   * Elements marked `data-motion-skip` keep their text untouched —
   * use it to opt badges, icons, or live values out of the flips.
   */
  children?: ReactNode;
  /**
   * Glyph wheel the flaps cycle through, in order. A space is the
   * drum's blank card — shorter words pad to it and hops travel
   * through it. Chars outside the set render instantly — add glyphs
   * (e.g. lowercase, `:-/.`) to animate them too.
   * @default "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 " (trailing space
   *   is the blank card)
   */
  charset?: string;
  /**
   * Max forward flaps per character — longer drum distances start
   * mid-sequence. Defaults to the full wheel, so every hop runs its
   * true distance; pass a number to cap it.
   * @default Infinity
   */
  flaps?: number;
  /**
   * Base milliseconds per card flip. Long runs decelerate into the
   * landing card — early flips run faster, the final flip slower,
   * like a real drum. @default 160
   */
  interval?: number;
  /**
   * Milliseconds between each character's first tick — the left-to-
   * right cascade that makes the flips read as a board rather than a
   * single blur. @default 30
   */
  stagger?: number;
  /** Delay in ms before flipping starts once triggered. @default 0 */
  delay?: number;
  /**
   * When flipping plays. `"mount"` flips once, immediately — before
   * first paint, so no finished text flashes first. `"view"` flips on
   * scroll into view (once, unless `once={false}`). `"hover"` and
   * `"focus"` replay on every pointerenter / focusin.
   * @default "view"
   */
  trigger?: "mount" | "view" | "hover" | "focus";
  /** With `trigger="view"`: flip only on first reveal. @default true */
  once?: boolean;
  /** IntersectionObserver threshold for the view trigger. @default 0.4 */
  threshold?: number;
  /** Called after each flip pass completes. */
  onComplete?: () => void;
  /**
   * Render the module row as a card — one merged filled strip
   * around the whole block, the departure-board look. The chrome
   * lives on the element itself, so it persists unchanged between
   * flips and mid-pass. Theme via `--splitflap-card-bg`.
   * @default false
   */
  cards?: boolean;
  /** Disable the effect — renders content as-is. @default false */
  disabled?: boolean;
  /** Render as a different element. @default "span" */
  as?: "span" | "div" | "p";
}

/**
 * SplitFlap — text flips into place like an airport departure board:
 * each character flips forward through the charset like a hinged
 * card — top half falls, bottom half unfolds — then lands on its
 * target. Applies to every text node inside
 * the element. Plays on mount, first reveal (view trigger), on hover,
 * on focus, and again whenever `children` changes — where only the
 * changed characters re-flip, which makes it ideal for clocks,
 * counters, and live status boards.
 *
 * While flipping, the element is `aria-hidden` and a transient,
 * visually hidden sibling carries the real text so screen readers get
 * the final value instead of mid-flip glyphs.
 *
 * Reduced motion: the effect is disabled entirely — the content
 * renders as-is.
 *
 * Performance: DOM writes only, driven by a single rAF loop; no React
 * re-renders during the pass. The view trigger shares the
 * IntersectionObserver pool. Animated chars are clipped 1em cells —
 * best in `font-mono`, where every glyph shares one advance width.
 */
export const SplitFlap = forwardRef<HTMLElement, SplitFlapProps>(
  function SplitFlap(
    {
      children,
      charset = DEFAULT_CHARSET,
      flaps = Infinity,
      interval = 160,
      stagger = 30,
      delay = 0,
      trigger = "view",
      once = true,
      threshold = 0.4,
      onComplete,
      cards = false,
      disabled = false,
      as: Tag = "span",
      style,
      ...rest
    },
    ref,
  ) {
    if (cards) ensureMotionStyles();
    const reduced = useReducedMotion();
    const enabled = !disabled && !reduced;
    const rootRef = useRef<HTMLElement | null>(null);
    const cancelRef = useRef<(() => void) | null>(null);
    const playedRef = useRef(false);
    /** Run texts at the last flip — chars flip forward from these. */
    const prevRunsRef = useRef<string[]>([]);
    /** Longest text seen — the board's fixed module count. */
    const maxLenRef = useRef(0);
    /** Rest-state padding: a nbsp ghost sibling holds the board width
     *  between passes; emptied while a pass runs (pad cells take
     *  over) and restored on completion. */
    const padRef = useRef<HTMLSpanElement | null>(null);
    const padCountRef = useRef(0);

    const glyphs = useMemo(() => Array.from(charset), [charset]);
    // `textKey` (not `children`) drives the change detector — element
    // children are new objects every render, but only a real text
    // change re-flips.
    const textKey = useMemo(() => textOf(children), [children]);
    const textLen = useMemo(() => Array.from(textKey).length, [textKey]);

    // Synchronize the pad sibling with the current pad count — no-op
    // while a pass owns the row (run() empties it first).
    const syncPad = useCallback(() => {
      const el = rootRef.current;
      if (!el) return;
      const pad = padCountRef.current;
      let ghost = padRef.current;
      if (pad <= 0) {
        ghost?.remove();
        padRef.current = null;
        return;
      }
      if (!ghost || !ghost.isConnected) {
        ghost = el.ownerDocument.createElement("span");
        ghost.setAttribute("aria-hidden", "true");
        ghost.setAttribute("data-motion-skip", "");
        // Inside `el` — a sibling would become its own flex/grid
        // item and push the row's layout around.
        const align =
          el.ownerDocument.defaultView?.getComputedStyle(el).textAlign ??
          "start";
        if (align === "end" || align === "right")
          el.insertAdjacentElement("afterbegin", ghost);
        else el.append(ghost);
        padRef.current = ghost;
      }
      ghost.textContent = "\u00A0".repeat(pad);
    }, []);

    // Track the longest text seen — the module count never shrinks.
    useLayoutEffect(() => {
      maxLenRef.current = Math.max(maxLenRef.current, textLen);
      padCountRef.current = maxLenRef.current - textLen;
      syncPad();
      return () => {
        padRef.current?.remove();
        padRef.current = null;
      };
    }, [textLen, enabled, syncPad]);

    const run = useCallback(() => {
      const el = rootRef.current;
      if (!el) return;
      playedRef.current = true;
      cancelRef.current?.();
      const prev = prevRunsRef.current;
      // Snapshot the current text — on the next pass these are the
      // glyphs the drum flips forward FROM.
      const current = collectTextRuns(el, SPLITFLAP_ATTR).map((r) => r.text);
      prevRunsRef.current = current;
      for (const t of current)
        maxLenRef.current = Math.max(maxLenRef.current, Array.from(t).length);
      // Pad cells inside the pass take over module width — drop the
      // rest-state ghost so padding isn't doubled.
      if (padRef.current) padRef.current.textContent = "";
      cancelRef.current = startSplitFlap(el, {
        charset: glyphs,
        flaps,
        interval,
        stagger,
        delay,
        prev,
        minLen: maxLenRef.current,
        onDone: () => {
          syncPad();
          onComplete?.();
        },
      });
    }, [glyphs, flaps, interval, stagger, delay, onComplete, syncPad]);

    // Trigger: mount — flip in immediately, before the first paint,
    // so the finished text never flashes.
    useLayoutEffect(() => {
      if (!enabled || trigger !== "mount") return;
      run();
    }, [enabled, trigger, run]);

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

    // Trigger: hover — every pointerenter replays the flips.
    useEffect(() => {
      if (!enabled || trigger !== "hover") return;
      const el = rootRef.current;
      if (!el) return;
      el.addEventListener("pointerenter", run);
      return () => el.removeEventListener("pointerenter", run);
    }, [enabled, trigger, run]);

    // Trigger: focus — every focusin replays the flips.
    useEffect(() => {
      if (!enabled || trigger !== "focus") return;
      const el = rootRef.current;
      if (!el) return;
      el.addEventListener("focusin", run);
      return () => el.removeEventListener("focusin", run);
    }, [enabled, trigger, run]);

    // Re-flip when the content changes after the first play. Layout
    // effect: React's new text is emptied and wrapped before paint —
    // for ticking values (a clock) the new text never flashes before
    // its flip.
    const lastText = useRef(textKey);
    useLayoutEffect(() => {
      const changed = lastText.current !== textKey;
      lastText.current = textKey;
      if (!changed && enabled) return;
      cancelRef.current?.();
      cancelRef.current = null;
      if (enabled && changed && playedRef.current) run();
    }, [textKey, enabled, run]);

    // Stop any in-flight pass on unmount.
    useEffect(() => () => cancelRef.current?.(), []);

    const OuterTag = Tag as "span";
    return (
      <OuterTag
        ref={(node: HTMLSpanElement | null) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-splitflap=""
        data-splitflap-cards={cards ? "" : undefined}
        style={style}
        {...rest}
      >
        {children}
      </OuterTag>
    );
  },
);
