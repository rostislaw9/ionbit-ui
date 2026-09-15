import type {
  ThemeColors,
  ThemePreset,
  ThemeRadius,
  ThemeSettings,
} from "./theme-presets";

import { applyThemeToDocument, resetThemeOnDocument } from "./theme-apply";
import { DEFAULT_THEME_ID, THEME_PRESETS } from "./theme-presets-data";

/**
 * Global theme customizer store — persists the user's theme customization
 * to sessionStorage and applies it to the document on every change.
 *
 * Modeled after the `useTheme` hook's module-level store: state is shared
 * across all callers, survives navigation (the store is module-level, not
 * tied to any component's lifecycle), and re-applies on app startup.
 * sessionStorage keeps the choice scoped to the browsing session so it
 * doesn't persist across browser restarts.
 */

const STORAGE_KEY = "ionbit-ui-theme-customizer";

interface PersistedTheme {
  selectedId: string;
  customized: boolean;
  dark: ThemeColors;
  light: ThemeColors;
  radius: ThemeRadius;
  settings: ThemeSettings;
}

function getPreset(id: string): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === id) ?? THEME_PRESETS[0]!;
}

function loadPersisted(): PersistedTheme | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedTheme;
    // Basic shape validation.
    if (
      typeof parsed.selectedId === "string" &&
      typeof parsed.customized === "boolean" &&
      parsed.dark &&
      parsed.light &&
      parsed.radius &&
      parsed.settings
    ) {
      return parsed;
    }
  } catch {
    // Corrupt or missing — fall back to default.
  }
  return null;
}

function persist(state: PersistedTheme): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage may be unavailable (private mode, SSR, etc.)
  }
}

// --- Module-level shared store -------------------------------------

const initial = loadPersisted();
const defaultPreset = getPreset(initial?.selectedId ?? DEFAULT_THEME_ID);

let currentState: PersistedTheme = initial ?? {
  selectedId: DEFAULT_THEME_ID,
  customized: false,
  dark: defaultPreset.dark,
  light: defaultPreset.light,
  radius: defaultPreset.radius,
  settings: defaultPreset.settings,
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): PersistedTheme {
  return currentState;
}

function notify(): void {
  for (const listener of listeners) listener();
}

function setState(next: PersistedTheme): void {
  currentState = next;
  persist(next);
  applyThemeToDocument(buildPreset(next));
  notify();
}

function buildPreset(state: PersistedTheme): ThemePreset {
  const preset = getPreset(state.selectedId);
  return {
    id: preset.id,
    label: preset.label,
    description: preset.description,
    dark: state.dark,
    light: state.light,
    radius: state.radius,
    settings: state.settings,
  };
}

// Apply the initial theme before first render to avoid flash.
if (typeof document !== "undefined") {
  applyThemeToDocument(buildPreset(currentState));
}

// --- Mutators -------------------------------------------------------

function selectPreset(id: string): void {
  const preset = getPreset(id);
  setState({
    selectedId: id,
    customized: false,
    dark: preset.dark,
    light: preset.light,
    radius: preset.radius,
    settings: preset.settings,
  });
}

function updateColor(
  mode: "dark" | "light",
  key: keyof ThemeColors,
  value: string,
): void {
  setState({
    ...currentState,
    customized: true,
    [mode]: { ...currentState[mode], [key]: value },
  });
}

function updateRadius(key: keyof ThemeRadius, value: string): void {
  const order: (keyof ThemeRadius)[] = ["sm", "md", "lg", "xl"];
  const next = { ...currentState.radius, [key]: value };
  const nums = order.map((k) => parseFloat(next[k]) || 0);
  const idx = order.indexOf(key);

  for (let i = idx; i < nums.length - 1; i++) {
    const cur = nums[i] ?? 0;
    const nextVal = nums[i + 1] ?? 0;
    if (nextVal < cur) nums[i + 1] = cur;
  }
  for (let i = idx; i > 0; i--) {
    const cur = nums[i] ?? 0;
    const prevVal = nums[i - 1] ?? 0;
    if (prevVal > cur) nums[i - 1] = cur;
  }
  for (let i = 0; i < order.length; i++) {
    next[order[i]!] = `${(nums[i] ?? 0).toFixed(2)}rem`;
  }

  setState({ ...currentState, customized: true, radius: next });
}

function updateSettings(
  key:
    | "translucency"
    | "spotlightIntensity"
    | "magneticIntensity"
    | "glowIntensity"
    | "pulseIntensity",
  value: number,
): void {
  setState({
    ...currentState,
    customized: true,
    settings: { ...currentState.settings, [key]: value },
  });
}

function reset(): void {
  const preset = getPreset(currentState.selectedId);
  setState({
    selectedId: currentState.selectedId,
    customized: false,
    dark: preset.dark,
    light: preset.light,
    radius: preset.radius,
    settings: preset.settings,
  });
}

function clearTheme(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  resetThemeOnDocument();
}

export {
  type PersistedTheme,
  subscribe,
  getSnapshot,
  selectPreset,
  updateColor,
  updateRadius,
  updateSettings,
  reset,
  clearTheme,
  getPreset,
};
