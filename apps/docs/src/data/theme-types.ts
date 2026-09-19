/**
 * Theme preset definitions for the Ionbit UI theme customizer.
 *
 * Each preset defines a subset of the CSS custom properties from tokens.css
 * that control the visual identity: surface colors, accent, semantic
 * status colors, translucency, and radius scale.
 *
 * Presets are mode-aware (dark/light) and generate CSS that overrides the
 * `:root` / `.light` variables when applied via the CLI.
 */

export interface ThemeColors {
  /** Background surface. */
  background: string;
  /** Base surface. */
  surface: string;
  /** Elevated surface (cards, popovers). */
  surfaceElevated: string;
  /** Hover surface. */
  surfaceHover: string;
  /** Primary foreground text. */
  foreground: string;
  /** Muted foreground. */
  foregroundMuted: string;
  /** Subtle foreground (placeholders, hints). */
  foregroundSubtle: string;
  /** Accent color. */
  accent: string;
  /** Accent hover state. */
  accentHover: string;
  /** Accent foreground (text on accent). */
  accentForeground: string;
  /** Success status. */
  success: string;
  /** Warning status. */
  warning: string;
  /** Error status. */
  error: string;
  /** Info status. */
  info: string;
  /** Ring color for focus states. */
  ring: string;
}

export interface ThemeRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/** Shadow intensity tier — scales the elevation shadow alphas. */
export type ShadowIntensity = "subtle" | "normal" | "dramatic";

export interface ThemeSettings {
  /**
   * Translucency multiplier (0-1). Controls the alpha of borders and of
   * tinted surfaces (muted/subtle backgrounds for accent, status colors).
   * Lower = more subtle borders and fainter tinted surfaces.
   */
  translucency: number;
  /** Shadow intensity tier — emitted as --shadow-* overrides. */
  shadowIntensity: ShadowIntensity;
  /** Spotlight effect intensity (0-1). */
  spotlightIntensity: number;
  /** Magnetic effect intensity (0-1). */
  magneticIntensity: number;
  /** Glow effect intensity (0-1). */
  glowIntensity: number;
  /** Pulse effect intensity (0-1). */
  pulseIntensity: number;
  /** Ripple effect intensity (0-1). */
  rippleIntensity: number;
  /** Tilt effect intensity (0-1). */
  tiltIntensity: number;
  /** Tilt reflection intensity (0-1). */
  reflectionIntensity: number;
}

/**
 * Settings keys whose value is a number — the slider-adjustable
 * settings (translucency and the effect intensities). Derived from
 * `ThemeSettings` so it stays in sync automatically; `shadowIntensity`
 * is excluded because it is a `ShadowIntensity` tier, not a number.
 */
export type NumericThemeSettingKey = {
  [K in keyof ThemeSettings]: ThemeSettings[K] extends number ? K : never;
}[keyof ThemeSettings];

export interface ThemePreset {
  /** Unique identifier used in CLI. */
  id: string;
  /** Display name. */
  label: string;
  /** Short description. */
  description: string;
  /** Dark mode colors. */
  dark: ThemeColors;
  /** Light mode colors. */
  light: ThemeColors;
  /** Radius scale. */
  radius: ThemeRadius;
  /** Additional settings. */
  settings: ThemeSettings;
}

/* -------------------------------------------------------------------------- */
/* Preset themes                                                               */
/* -------------------------------------------------------------------------- */
