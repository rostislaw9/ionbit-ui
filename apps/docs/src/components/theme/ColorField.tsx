import { Pencil } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import {
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

/** Convert any CSS color string (oklch, hsl, etc.) to hex via the browser. */
function cssColorToHex(color: string): string {
  if (typeof document === "undefined") return "#000000";
  const el = document.createElement("div");
  el.style.color = color;
  el.style.display = "none";
  document.body.appendChild(el);
  const rgb = getComputedStyle(el).color;
  document.body.removeChild(el);
  const match = rgb.match(/[\d.]+/g);
  if (!match || match.length < 3) return "#000000";
  return (
    "#" +
    match
      .slice(0, 3)
      .map((n) => Math.round(Number(n)).toString(16).padStart(2, "0"))
      .join("")
  );
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
  // Expensive DOM operation — only recompute when the value actually changes.
  const hex = useMemo(() => cssColorToHex(value), [value]);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commitDraft = useCallback(() => {
    if (draft !== value) onChange(mode, colorKey, draft);
  }, [colorKey, draft, mode, onChange, value]);

  return (
    <div className="flex items-center justify-between gap-2">
      <Label className="text-xs whitespace-nowrap text-foreground-muted">
        {label}
      </Label>
      <div className="flex items-center gap-1.5">
        {/* Swatch — opens the native color picker directly */}
        {editable ? (
          <label
            className="relative size-5 shrink-0 cursor-pointer rounded-[var(--radius-sm)] ring-1 ring-foreground/20 transition-shadow ring-inset focus-within:shadow-focus focus-within:outline-none hover:shadow-sm"
            style={{ backgroundColor: value }}
          >
            <input
              type="color"
              value={hex}
              onChange={(e) => onChange(mode, colorKey, e.target.value)}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
              aria-label={`Pick ${label} color`}
            />
          </label>
        ) : (
          <span
            className="size-5 shrink-0 rounded-[var(--radius-sm)] ring-1 ring-foreground/20 ring-inset"
            style={{ backgroundColor: value }}
            aria-label={`${label}: calculated`}
          />
        )}
        {editable && (
          /* Value editor — icon button opens a popover with the text input */
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex size-5 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border text-foreground-subtle transition-colors hover:border-border-strong hover:text-foreground focus-visible:shadow-focus focus-visible:outline-none"
                aria-label={`Edit ${label} value`}
              >
                <Pencil className="size-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-6">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitDraft}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                  if (e.key === "Escape") {
                    setDraft(value);
                    e.currentTarget.blur();
                  }
                }}
                className="h-7 w-64 font-mono text-xs"
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export const ColorField = memo(ColorFieldImpl);
