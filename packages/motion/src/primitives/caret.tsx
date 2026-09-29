import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useReducedMotion } from "../hooks/use-reduced-motion";
import { ensureMotionStyles } from "../styles";

/** Default glyph — the terminal block cursor. */
const DEFAULT_CHAR = "▌";

/**
 * Applies the shared caret styling to an element — used by the
 * `Caret` component and by primitives that insert a caret via DOM
 * APIs (Typewriter's trailing cursor), so the blink stays one source.
 */
export function applyCaretStyles(el: HTMLElement, interval: number): void {
  el.style.display = "inline-block";
  el.style.color = "var(--accent, currentColor)";
  el.style.animation = `ionbit-ui-caret-blink ${interval}ms step-end infinite`;
}

export interface CaretProps extends HTMLAttributes<HTMLSpanElement> {
  /** Glyph to blink. @default "▌" */
  children?: ReactNode;
  /** Blink on/off — when false the glyph renders static. @default true */
  blink?: boolean;
  /** Blink cycle in ms. @default 1100 */
  interval?: number;
}

/**
 * Caret — a blinking terminal block cursor as a standalone primitive.
 * Place it after prompts, inputs, or status lines that read as "the
 * channel is open". The same caret Typewriter trails while typing.
 *
 * Reduced motion: renders the glyph statically — a blinking cursor is
 * decoration, not content.
 */
export const Caret = forwardRef<HTMLSpanElement, CaretProps>(function Caret(
  { children = DEFAULT_CHAR, blink = true, interval = 1100, style, ...rest },
  ref,
) {
  const reduced = useReducedMotion();

  ensureMotionStyles();

  const caretStyle: CSSProperties = { display: "inline-block" };
  if (blink && !reduced) {
    caretStyle.color = "var(--accent, currentColor)";
    caretStyle.animation = `ionbit-ui-caret-blink ${interval}ms step-end infinite`;
  }

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-caret=""
      style={{ ...caretStyle, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
});
