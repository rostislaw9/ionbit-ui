import type { ThemeSettings } from "../../data/theme-presets";

import { memo, useEffect, useState } from "react";

import { Label, Slider } from "@ionbit-ui/ui";

/* -------------------------------------------------------------------------- */
/* EffectSlider — local state for instant label feedback, commits on drag end */
/* -------------------------------------------------------------------------- */

type EffectKey =
  | "translucency"
  | "spotlightIntensity"
  | "magneticIntensity"
  | "glowIntensity"
  | "pulseIntensity";

interface EffectSliderProps {
  label: string;
  value: number;
  /** Multiplier applied to display the value as a percentage. */
  displayMultiplier?: number;
  min: number;
  max: number;
  step: number;
  effectKey: EffectKey;
  /** Stable callback from the customizer hook (useCallback). */
  onCommit: (key: EffectKey, value: number) => void;
}

function EffectSliderImpl({
  label,
  value,
  displayMultiplier = 100,
  min,
  max,
  step,
  effectKey,
  onCommit,
}: EffectSliderProps) {
  // Local state mirrors the global value but updates instantly during drag
  // so the label stays responsive. The global state (and all downstream
  // re-renders: ThemePreview, CSS generation, shiki highlight, DOM apply)
  // only updates on `onValueCommit` — i.e. when the user releases the thumb.
  const [local, setLocal] = useState(value);

  // Sync local when the global value changes externally (e.g. selecting a
  // different preset resets all settings). During a drag the global `value`
  // prop does NOT change (we only commit on drag end), so this effect does
  // not fire mid-drag and fight the local state.
  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <div>
      <Label className="mb-2 block text-xs text-foreground-muted">
        {label} ({((local / displayMultiplier) * 100).toFixed(0)}%)
      </Label>
      <Slider
        value={[local]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => setLocal(v[0] ?? 0)}
        onValueCommit={(v) =>
          onCommit(effectKey, (v[0] ?? 0) / displayMultiplier)
        }
      />
    </div>
  );
}

export const EffectSlider = memo(EffectSliderImpl);

/* -------------------------------------------------------------------------- */
/* ThemeSettings — satisfies the constraint on the customizer hook            */
/* -------------------------------------------------------------------------- */
export type { ThemeSettings };
