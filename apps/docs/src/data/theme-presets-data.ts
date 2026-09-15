import type { ThemePreset } from "./theme-types";

import { THEME_PRESETS_GROUP_0 } from "./theme-presets-digital-sunset";
import { THEME_PRESETS_GROUP_2 } from "./theme-presets-emerald-nord";
import { THEME_PRESETS_GROUP_1 } from "./theme-presets-ocean-slate";

export const THEME_PRESETS: ThemePreset[] = [
  ...THEME_PRESETS_GROUP_0,
  ...THEME_PRESETS_GROUP_1,
  ...THEME_PRESETS_GROUP_2,
];

/** Default preset ID. */
export const DEFAULT_THEME_ID = "digital";
