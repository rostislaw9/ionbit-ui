import type { ThemeRadius } from "../../data/theme-presets";

import { memo, useEffect, useState } from "react";

import { Label, Slider } from "@ionbit-ui/ui";

/* -------------------------------------------------------------------------- */
/* RadiusSlider — local state for instant label feedback, commits on drag end */
/* -------------------------------------------------------------------------- */

interface RadiusSliderProps {
  label: string;
  value: string;
  radiusKey: keyof ThemeRadius;
  /** Stable callback from the customizer hook (useCallback). */
  onChange: (key: keyof ThemeRadius, value: string) => void;
}

function RadiusSliderImpl({
  label,
  value,
  radiusKey,
  onChange,
}: RadiusSliderProps) {
  // Local state mirrors the global value but updates instantly during drag
  // so the label stays responsive. The global state (and all downstream
  // re-renders: ThemePreview, CSS generation, shiki highlight, DOM apply)
  // only updates on `onValueCommit` — i.e. when the user releases the thumb.
  const numeric = parseFloat(value) || 0;
  const [local, setLocal] = useState(numeric);

  // Sync local when the global value changes externally (e.g. selecting a
  // different preset resets all settings). During a drag the global `value`
  // prop does NOT change (we only commit on drag end), so this effect does
  // not fire mid-drag and fight the local state.
  useEffect(() => {
    setLocal(numeric);
  }, [numeric]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-foreground-muted">{label}</Label>
        <span className="font-mono text-xs text-foreground">
          {local.toFixed(2)}rem
        </span>
      </div>
      <Slider
        value={[local]}
        min={0}
        max={2}
        step={0.05}
        onValueChange={(v) => setLocal(v[0] ?? 0)}
        onValueCommit={(v) =>
          onChange(radiusKey, `${(v[0] ?? 0).toFixed(2)}rem`)
        }
      />
    </div>
  );
}

export const RadiusSlider = memo(RadiusSliderImpl);
