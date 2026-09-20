import type { ThemePreset } from "./theme-presets";

import { cliCmd } from "../lib/package-managers";

export { generateThemeCss } from "./theme-css";

/** Generate the CLI command for installing a theme preset. */
export function generateCliCommand(preset: ThemePreset): string {
  return cliCmd("npm", `theme ${preset.id}`);
}

/** Generate the CLI command for a custom theme (JSON config). */
export function generateCustomCliCommand(config: string): string {
  return cliCmd("npm", `theme --custom '${config}'`);
}
