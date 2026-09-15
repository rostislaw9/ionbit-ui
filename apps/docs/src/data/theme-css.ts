import type {
  ThemeColors,
  ThemePreset,
  ThemeRadius,
  ThemeSettings,
} from "./theme-types";

function mix(color: string, amount: number): string {
  return `color-mix(in oklab, ${color} ${amount}%, transparent)`;
}

function hover(color: string): string {
  return `color-mix(in oklab, ${color} 88%, black)`;
}

export function colorsToCss(
  c: ThemeColors,
  translucency: number,
  isLight: boolean,
): string {
  const borderBase = isLight ? "0 0 0" : "1 0 0";
  const borderAlpha = translucency.toFixed(2);
  const mutedAmount = Math.round(translucency * 160);
  const subtleAmount = Math.round(translucency * 80);

  return [
    `  --background: ${c.background};`,
    `  --surface: ${c.surface};`,
    `  --surface-elevated: ${c.surfaceElevated};`,
    `  --surface-hover: ${c.surfaceHover};`,
    `  --foreground: ${c.foreground};`,
    `  --foreground-muted: ${c.foregroundMuted};`,
    `  --foreground-subtle: ${c.foregroundSubtle};`,
    `  --accent: ${c.accent};`,
    `  --accent-hover: ${c.accentHover};`,
    `  --accent-foreground: ${c.accentForeground};`,
    `  --accent-muted: ${mix(c.accent, mutedAmount)};`,
    `  --accent-subtle: ${mix(c.accent, subtleAmount)};`,
    `  --success: ${c.success};`,
    `  --success-hover: ${hover(c.success)};`,
    `  --success-muted: ${mix(c.success, mutedAmount)};`,
    `  --success-subtle: ${mix(c.success, subtleAmount)};`,
    `  --success-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.03 155)"};`,
    `  --warning: ${c.warning};`,
    `  --warning-hover: ${hover(c.warning)};`,
    `  --warning-muted: ${mix(c.warning, mutedAmount)};`,
    `  --warning-subtle: ${mix(c.warning, subtleAmount)};`,
    `  --warning-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.03 80)"};`,
    `  --error: ${c.error};`,
    `  --error-hover: ${hover(c.error)};`,
    `  --error-muted: ${mix(c.error, mutedAmount)};`,
    `  --error-subtle: ${mix(c.error, subtleAmount)};`,
    `  --error-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.04 5)"};`,
    `  --info: ${c.info};`,
    `  --info-hover: ${hover(c.info)};`,
    `  --info-muted: ${mix(c.info, mutedAmount)};`,
    `  --info-subtle: ${mix(c.info, subtleAmount)};`,
    `  --info-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.03 230)"};`,
    `  --ring: ${c.ring};`,
    `  --border: oklch(${borderBase} / ${borderAlpha});`,
    `  --border-strong: oklch(${borderBase} / ${(translucency * 1.75).toFixed(2)});`,
    `  --border-accent: ${mix(c.accent, 50)};`,
    `  --border-error: ${mix(c.error, 50)};`,
    `  --border-success: ${mix(c.success, 50)};`,
    `  --border-warning: ${mix(c.warning, 50)};`,
    `  --border-info: ${mix(c.info, 50)};`,
    `  --shadow-xs: 0 1px 2px 0 oklch(0 0 0 / ${isLight ? 0.06 : 0.2});`,
    `  --shadow-sm: 0 2px 4px -1px oklch(0 0 0 / ${isLight ? 0.08 : 0.25}), 0 1px 2px -1px oklch(0 0 0 / ${isLight ? 0.06 : 0.2});`,
    `  --shadow-md: 0 4px 8px -2px oklch(0 0 0 / ${isLight ? 0.1 : 0.3}), 0 2px 4px -2px oklch(0 0 0 / ${isLight ? 0.08 : 0.25});`,
    `  --shadow-lg: 0 12px 24px -8px oklch(0 0 0 / ${isLight ? 0.12 : 0.4}), 0 4px 8px -4px oklch(0 0 0 / ${isLight ? 0.1 : 0.3});`,
  ].join("\n");
}

export function radiusToCss(r: ThemeRadius): string {
  return [
    `  --radius-sm: ${r.sm};`,
    `  --radius-md: ${r.md};`,
    `  --radius-lg: ${r.lg};`,
    `  --radius-xl: ${r.xl};`,
  ].join("\n");
}

export function settingsToCss(s: ThemeSettings): string {
  return [
    `  --spotlight-intensity: ${s.spotlightIntensity};`,
    `  --magnetic-intensity: ${s.magneticIntensity};`,
    `  --glow-intensity: ${s.glowIntensity};`,
    `  --pulse-intensity: ${s.pulseIntensity};`,
  ].join("\n");
}

export function generateThemeCss(preset: ThemePreset): string {
  const darkBlock = `:root {\n${colorsToCss(preset.dark, preset.settings.translucency, false)}\n${radiusToCss(preset.radius)}\n${settingsToCss(preset.settings)}\n}`;
  const lightBlock = `.light {\n${colorsToCss(preset.light, preset.settings.translucency, true)}\n${radiusToCss(preset.radius)}\n${settingsToCss(preset.settings)}\n}`;

  return `/* Ionbit UI — Theme: ${preset.label} */\n${darkBlock}\n\n${lightBlock}`;
}
