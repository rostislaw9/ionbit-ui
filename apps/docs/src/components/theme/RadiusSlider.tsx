import type { ThemeRadius } from "../../data/theme-presets";

import { memo } from "react";

import { Label, Slider } from "@ionbit-ui/ui";

import { useCommittedLocal } from "./useCommittedLocal";

/* -------------------------------------------------------------------------- */
/* RadiusSlider — local state for instant label feedback, commits on release  */
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
  // only updates on release — `releaseProps` guarantees the commit lands
  // even when Radix's `onValueCommit` doesn't fire.
  const numeric = parseFloat(value) || 0;
  const { local, setLocal, commit, releaseProps } = useCommittedLocal(
    numeric,
    (v) => onChange(radiusKey, `${v.toFixed(2)}rem`),
  );

  return (
    <div className="flex flex-col gap-1.5" {...releaseProps}>
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
        onValueCommit={(v) => commit(v[0] ?? 0)}
      />
    </div>
  );
}

export const RadiusSlider = memo(RadiusSliderImpl);
