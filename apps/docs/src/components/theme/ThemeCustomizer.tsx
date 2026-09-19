import type { ShadowIntensity, ThemeColors } from "../../data/theme-presets";
import type { ThemeCustomizerState } from "../../hooks/useThemeCustomizer";

import { Label, Separator, ToggleGroup, ToggleGroupItem } from "@ionbit-ui/ui";

import { THEME_PRESETS } from "../../data/theme-presets";
import { useTheme } from "../../hooks/useTheme";
import { ColorField } from "./ColorField";
import { EffectSlider } from "./EffectSlider";
import { PresetCard } from "./PresetCard";
import { RadiusSlider } from "./RadiusSlider";

/* -------------------------------------------------------------------------- */
/* ThemeControls — right sidebar (w-60)                                       */
/* -------------------------------------------------------------------------- */

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

export function ThemeControls({ state }: { state: ThemeCustomizerState }) {
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
    <div className="flex flex-col gap-5 p-0.5">
      {/* Preset grid */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Presets</h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-2">
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
          <EffectSlider
            label="Translucency"
            value={settings.translucency * 100}
            min={2}
            max={20}
            step={1}
            effectKey="translucency"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Glow"
            value={settings.glowIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="glowIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Magnetic"
            value={settings.magneticIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="magneticIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Pulse"
            value={settings.pulseIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="pulseIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Ripple"
            value={settings.rippleIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="rippleIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Scramble"
            value={settings.scrambleIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="scrambleIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Spotlight"
            value={settings.spotlightIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="spotlightIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Tilt"
            value={settings.tiltIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="tiltIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Tilt Reflection"
            value={settings.reflectionIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="reflectionIntensity"
            onCommit={updateSettings}
          />
          <EffectSlider
            label="Trace"
            value={settings.traceIntensity * 100}
            min={0}
            max={100}
            step={5}
            effectKey="traceIntensity"
            onCommit={updateSettings}
          />
        </div>
      </div>
    </div>
  );
}
