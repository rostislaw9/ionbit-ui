import type {
  NumericThemeSettingKey,
  ShadowIntensity,
  ThemeColors,
} from "../../data/theme-presets";
import type { ThemeCustomizerState } from "../../hooks/useThemeCustomizer";

import { memo } from "react";

import { Label, Separator, ToggleGroup, ToggleGroupItem } from "@ionbit-ui/ui";

import { THEME_PRESETS } from "../../data/theme-presets";
import { useTheme } from "../../hooks/useTheme";
import { ColorField } from "./ColorField";
import { EffectSlider } from "./EffectSlider";
import { PresetCard } from "./PresetCard";
import { RadiusSlider } from "./RadiusSlider";

type DerivedColorKey =
  | "border"
  | "borderStrong"
  | "borderAccent"
  | "borderError"
  | "borderSuccess"
  | "borderWarning"
  | "borderInfo";
type ColorKey = keyof ThemeColors | DerivedColorKey;

interface ColorKeyConfig {
  key: ColorKey;
  label: string;
  derived?: boolean;
}

// Base color keys and calculated border tokens shown in each mode section.
const COLOR_KEYS: ColorKeyConfig[] = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "surfaceElevated", label: "Surface Elevated" },
  { key: "surfaceHover", label: "Surface Hover" },
  { key: "foreground", label: "Foreground" },
  { key: "foregroundMuted", label: "Foreground Muted" },
  { key: "foregroundSubtle", label: "Foreground Subtle" },
  { key: "accent", label: "Accent" },
  { key: "accentHover", label: "Accent Hover" },
  { key: "accentForeground", label: "Accent Foreground" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "error", label: "Error" },
  { key: "info", label: "Info" },
  { key: "ring", label: "Ring" },
  { key: "border", label: "Border", derived: true },
  { key: "borderStrong", label: "Border Strong", derived: true },
  { key: "borderAccent", label: "Border Accent", derived: true },
  { key: "borderError", label: "Border Error", derived: true },
  { key: "borderSuccess", label: "Border Success", derived: true },
  { key: "borderWarning", label: "Border Warning", derived: true },
  { key: "borderInfo", label: "Border Info", derived: true },
];

interface EffectSliderConfig {
  key: NumericThemeSettingKey;
  label: string;
  min: number;
  max: number;
  step: number;
}

// Effect sliders — sorted alphabetically by label. Adding a slider
// here is enough; the sort keeps the list ordered automatically.
const EFFECT_SLIDERS: EffectSliderConfig[] = [
  { key: "translucency", label: "Translucency", min: 2, max: 20, step: 1 },
  { key: "glowIntensity", label: "Glow", min: 0, max: 100, step: 5 },
  {
    key: "magneticIntensity",
    label: "Magnetic",
    min: 0,
    max: 100,
    step: 5,
  },
  { key: "pulseIntensity", label: "Pulse", min: 0, max: 100, step: 5 },
  { key: "rippleIntensity", label: "Ripple", min: 0, max: 100, step: 5 },
  {
    key: "scrambleSpeed",
    label: "Scramble",
    min: 20,
    max: 200,
    step: 10,
  },
  {
    key: "spotlightIntensity",
    label: "Spotlight",
    min: 0,
    max: 100,
    step: 5,
  },
  { key: "tiltIntensity", label: "Tilt", min: 0, max: 100, step: 5 },
  {
    key: "reflectionIntensity",
    label: "Tilt Reflection",
    min: 0,
    max: 100,
    step: 5,
  },
  { key: "traceIntensity", label: "Trace", min: 0, max: 100, step: 5 },
  {
    key: "traceSpeed",
    label: "Trace Speed",
    min: 20,
    max: 200,
    step: 10,
  },
  {
    key: "typewriterSpeed",
    label: "Typewriter Speed",
    min: 20,
    max: 200,
    step: 10,
  },
  {
    key: "counterSpeed",
    label: "Counter Speed",
    min: 20,
    max: 200,
    step: 10,
  },
  {
    key: "splitflapSpeed",
    label: "SplitFlap Speed",
    min: 20,
    max: 200,
    step: 10,
  },
  {
    key: "marqueeSpeed",
    label: "Marquee Speed",
    min: 20,
    max: 200,
    step: 10,
  },
  { key: "caretSpeed", label: "Caret Speed", min: 20, max: 200, step: 10 },
];
EFFECT_SLIDERS.sort((a, b) => a.label.localeCompare(b.label));

function getColorValue(
  colors: ThemeColors,
  key: ColorKey,
  light: boolean,
  translucency: number,
): string {
  if (
    key !== "border" &&
    key !== "borderStrong" &&
    key !== "borderAccent" &&
    key !== "borderError" &&
    key !== "borderSuccess" &&
    key !== "borderWarning" &&
    key !== "borderInfo"
  ) {
    return colors[key as keyof ThemeColors];
  }

  const borderBase = light ? "0 0 0" : "1 0 0";
  if (key === "border") {
    return `oklch(${borderBase} / ${translucency.toFixed(2)})`;
  }
  if (key === "borderStrong") {
    return `oklch(${borderBase} / ${(translucency * 1.75).toFixed(2)})`;
  }

  const source =
    key === "borderAccent"
      ? colors.accent
      : key === "borderError"
        ? colors.error
        : key === "borderSuccess"
          ? colors.success
          : key === "borderWarning"
            ? colors.warning
            : colors.info;
  return `color-mix(in oklab, ${source} 50%, transparent)`;
}

function ThemeControlsImpl({ state }: { state: ThemeCustomizerState }) {
  const {
    selectedId,
    customized,
    currentPreset,
    setSelectedId,
    updateColor,
    updateRadius,
    updateSettings,
  } = state;

  const { mode } = useTheme();
  const { dark, light, radius, settings } = currentPreset;

  return (
    <div className="flex flex-col gap-5 p-1">
      {/* Preset grid */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Presets</h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 xl:grid-cols-2">
          {THEME_PRESETS.map((p) => (
            <PresetCard
              key={p.id}
              preset={p}
              isActive={selectedId === p.id && !customized}
              mode={mode}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Color customization */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Colors</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {(["dark", "light"] as const).map((m) => (
            <div key={m} className="flex flex-col gap-2.5">
              <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-accent uppercase">
                {m === "dark" ? "Dark Mode" : "Light Mode"}
              </span>
              {COLOR_KEYS.map(({ key, label, derived }) => (
                <ColorField
                  key={`${m}-${key}`}
                  label={label}
                  value={getColorValue(
                    m === "dark" ? dark : light,
                    key,
                    m === "light",
                    settings.translucency,
                  )}
                  mode={m}
                  colorKey={key as keyof ThemeColors}
                  editable={!derived}
                  onChange={updateColor}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Radius */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Border Radius
        </h3>
        <div className="flex flex-col gap-4">
          {(["sm", "md", "lg", "xl"] as const).map((r) => (
            <RadiusSlider
              key={r}
              label={r.toUpperCase()}
              value={radius[r]}
              radiusKey={r}
              onChange={updateRadius}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Effect Settings */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Effects</h3>
        <div className="flex flex-col gap-4">
          <div>
            <Label className="mb-2 block text-xs text-foreground-muted">
              Shadow
            </Label>
            <ToggleGroup
              type="single"
              size="sm"
              variant="outline"
              spacing={0}
              className="w-full"
              value={settings.shadowIntensity}
              onValueChange={(v: string) => {
                if (v) updateSettings("shadowIntensity", v as ShadowIntensity);
              }}
            >
              <ToggleGroupItem value="subtle" className="flex-1">
                Subtle
              </ToggleGroupItem>
              <ToggleGroupItem value="normal" className="flex-1">
                Normal
              </ToggleGroupItem>
              <ToggleGroupItem value="dramatic" className="flex-1">
                Dramatic
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {EFFECT_SLIDERS.map(({ key, label, min, max, step }) => (
            <EffectSlider
              key={key}
              label={label}
              value={settings[key] * 100}
              min={min}
              max={max}
              step={step}
              effectKey={key}
              onCommit={updateSettings}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Memoized — the store notifies on every change, but the controls only
 * need to reconcile when the state object itself changes. */
export const ThemeControls = memo(ThemeControlsImpl);
