import type {
  NumericThemeSettingKey,
  ThemeSettings,
} from "../../data/theme-presets";

import { memo } from "react";

import { Label, Slider } from "@ionbit-ui/ui";

import { useCommittedLocal } from "./useCommittedLocal";

/* -------------------------------------------------------------------------- */
/* EffectSlider — local state for instant label feedback, commits on release  */
/* -------------------------------------------------------------------------- */

type EffectKey = NumericThemeSettingKey;

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
  // re-renders: ThemePreview, CSS generation, DOM apply) only updates on
  // release — `releaseProps` guarantees the commit lands even when Radix's
  // `onValueCommit` doesn't fire.
  const { local, setLocal, commit, releaseProps } = useCommittedLocal(
    value,
    (v) => onCommit(effectKey, v / displayMultiplier),
  );

  return (
    <div {...releaseProps}>
      <Label className="mb-2 block text-xs text-foreground-muted">
        {label} ({((local / displayMultiplier) * 100).toFixed(0)}%)
      </Label>
      <Slider
        value={[local]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => setLocal(v[0] ?? 0)}
        onValueCommit={(v) => commit(v[0] ?? 0)}
      />
    </div>
  );
}

export const EffectSlider = memo(EffectSliderImpl);

/* -------------------------------------------------------------------------- */
/* ThemeSettings — satisfies the constraint on the customizer hook            */
/* -------------------------------------------------------------------------- */
export type { ThemeSettings };
