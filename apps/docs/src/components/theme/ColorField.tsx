import { converter, formatHex, parse } from "culori";
import { Pencil } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ionbit-ui/ui";

import { type ThemeColors } from "../../data/theme-presets";

/* -------------------------------------------------------------------------- */
/* Color picker field                                                          */
/* -------------------------------------------------------------------------- */

/** Round to 4 decimals and drop trailing zeros for compact display. */
function formatChannel(n: number): string {
  return String(Number(n.toFixed(4)));
}

const toOklch = converter("oklch");

/**
 * Convert any CSS color string to #rrggbb (sRGB-clamped) for the native
 * `<input type="color">`. culori's `parse` understands every CSS color
 * format — hex, rgb/hsl/hwb, lab/lch, oklab/oklch, color(), named —
 * so no DOM probing is needed.
 */
function cssColorToHex(color: string): string {
  const parsed = parse(color);
  return parsed ? formatHex(parsed) : "#000000";
}

/** Convert any CSS color string to canonical `oklch(L C H)` text. */
function cssColorToOklch(color: string): string {
  const parsed = parse(color);
  if (!parsed) return color;
  const o = toOklch(parsed);
  const alpha =
    o.alpha !== undefined && o.alpha < 1 ? ` / ${formatChannel(o.alpha)}` : "";
  return `oklch(${formatChannel(o.l ?? 0)} ${formatChannel(o.c ?? 0)} ${formatChannel(o.h ?? 0)}${alpha})`;
}

function isValidColor(value: string): boolean {
  return typeof CSS !== "undefined" && CSS.supports("color", value);
}

interface ColorFieldProps {
  label: string;
  value: string;
  mode: "dark" | "light";
  colorKey: keyof ThemeColors;
  editable?: boolean;
  /** Stable callback from the customizer hook (useCallback). */
  onChange: (
    mode: "dark" | "light",
    key: keyof ThemeColors,
    value: string,
  ) => void;
}

function ColorFieldImpl({
  label,
  value,
  mode,
  colorKey,
  editable = true,
  onChange,
}: ColorFieldProps) {
  // Expensive DOM operations — only recompute when the value actually
  // changes. Each input has a canonical display form: the first field
  // always shows oklch, the second always hex.
  const hex = useMemo(() => cssColorToHex(value), [value]);
  const oklch = useMemo(() => cssColorToOklch(value), [value]);
  const [draft, setDraft] = useState(oklch);
  const [draftHex, setDraftHex] = useState(hex);

  const revertDrafts = useCallback(() => {
    setDraft(oklch);
    setDraftHex(hex);
  }, [oklch, hex]);

  useEffect(() => {
    revertDrafts();
  }, [revertDrafts]);

  // Live two-way sync: clearing one field clears the other; a valid
  // color converts into the other field's canonical form as you type.
  // Invalid in-progress text leaves the other field untouched.
  const onDraftChange = (text: string) => {
    setDraft(text);
    const v = text.trim();
    if (v === "") {
      setDraftHex("");
    } else if (parse(v)) {
      setDraftHex(cssColorToHex(v));
    }
  };
  const onDraftHexChange = (text: string) => {
    setDraftHex(text);
    const v = text.trim();
    if (v === "") {
      setDraft("");
    } else if (parse(v)) {
      setDraft(cssColorToOklch(v));
    }
  };

  // Escape reverts and blurs; the blur fires synchronously with the
  // stale draft still in scope, so flag the pending commit to skip it.
  const cancelCommitRef = useRef(false);

  // Both popover inputs commit the same way: a valid CSS color string is
  // stored verbatim (so consumers can keep hex or oklch — whatever they
  // pasted), invalid input reverts to the current value.
  const commitText = useCallback(
    (text: string) => {
      if (cancelCommitRef.current) {
        cancelCommitRef.current = false;
        return;
      }
      const v = text.trim();
      if (!isValidColor(v)) {
        revertDrafts();
        return;
      }
      if (v !== value) onChange(mode, colorKey, v);
    },
    [colorKey, mode, onChange, revertDrafts, value],
  );

  const commitDraft = useCallback(() => commitText(draft), [commitText, draft]);
  const commitDraftHex = useCallback(
    () => commitText(draftHex),
    [commitText, draftHex],
  );

  // Native color pickers fire `input` (React's onChange) on every drag
  // tick and `change` once when the picker closes. Keeping the picked
  // color in `liveHex` for instant swatch feedback and committing to
  // the store only on `change`/blur avoids a full page re-render and
  // theme-CSS regeneration on every tick.
  const [liveHex, setLiveHex] = useState(hex);
  const liveHexRef = useRef(liveHex);
  const committedHexRef = useRef(hex);
  liveHexRef.current = liveHex;

  useEffect(() => {
    setLiveHex(hex);
    committedHexRef.current = hex;
  }, [hex]);

  const commitLiveHex = useCallback(() => {
    const v = liveHexRef.current;
    if (v === committedHexRef.current) return;
    committedHexRef.current = v;
    onChange(mode, colorKey, v);
  }, [colorKey, mode, onChange]);

  const pickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const input = pickerRef.current;
    if (!input) return;
    input.addEventListener("change", commitLiveHex);
    return () => input.removeEventListener("change", commitLiveHex);
  }, [commitLiveHex]);

  return (
    <div className="flex items-center justify-between gap-2">
      <Label className="text-xs whitespace-nowrap text-foreground-muted">
        {label}
      </Label>
      <div className="flex items-center gap-1.5">
        {/* Swatch — opens the native color picker directly */}
        {editable ? (
          <label
            className="relative size-6 shrink-0 cursor-pointer rounded-[var(--radius-sm)] border-accent ring-1 ring-foreground/20 transition-shadow ring-inset focus-within:shadow-focus focus-within:outline-none hover:border hover:shadow-sm"
            style={{ backgroundColor: liveHex }}
          >
            <input
              ref={pickerRef}
              type="color"
              value={liveHex}
              onChange={(e) => setLiveHex(e.target.value)}
              onBlur={commitLiveHex}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
              aria-label={`Pick ${label} color`}
            />
          </label>
        ) : (
          <span
            className="size-6 shrink-0 rounded-[var(--radius-sm)] ring-1 ring-foreground/20 ring-inset"
            style={{ backgroundColor: value }}
            aria-label={`${label}: calculated`}
          />
        )}
        {editable && (
          /* Value editor — icon button opens a popover with the text input */
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon-xs"
                aria-label={`Edit ${label} value`}
              >
                <Pencil />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 p-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-foreground-muted">OKLCH</Label>
                  <Input
                    value={draft}
                    onChange={(e) => onDraftChange(e.target.value)}
                    onBlur={commitDraft}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                      if (e.key === "Escape") {
                        cancelCommitRef.current = true;
                        revertDrafts();
                        e.currentTarget.blur();
                      }
                    }}
                    placeholder="oklch(0.65 0.2 30)"
                    className="h-7 font-mono text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-foreground-muted">Hex</Label>
                  <Input
                    value={draftHex}
                    onChange={(e) => onDraftHexChange(e.target.value)}
                    onBlur={commitDraftHex}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                      if (e.key === "Escape") {
                        cancelCommitRef.current = true;
                        revertDrafts();
                        e.currentTarget.blur();
                      }
                    }}
                    placeholder="#ff8040"
                    className="h-7 font-mono text-xs"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export const ColorField = memo(ColorFieldImpl);
