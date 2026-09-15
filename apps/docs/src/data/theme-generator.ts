import type { ThemePreset } from "./theme-presets";

import { generateThemeCss as generateCss } from "./theme-css";

/** Generate the full CSS block for a theme preset. */
export function generateThemeCss(preset: ThemePreset): string {
  return generateCss(preset);
}

/** Generate the CLI command for installing a theme preset. */
export function generateCliCommand(preset: ThemePreset): string {
  return `npx ionbit-ui@latest theme ${preset.id}`;
}

/** Generate the CLI command for a custom theme (JSON config). */
export function generateCustomCliCommand(config: string): string {
  return `npx ionbit-ui@latest theme --custom '${config}'`;
}
