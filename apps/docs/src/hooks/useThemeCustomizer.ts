import type {
  ThemeColors,
  ThemePreset,
  ThemeRadius,
  ThemeSettings,
} from "../data/theme-presets";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  generateCliCommand,
  generateCustomCliCommand,
  generateThemeCss,
} from "../data/theme-generator";
import {
  getPreset,
  getSnapshot,
  reset,
  selectPreset,
  subscribe,
  updateColor,
  updateRadius,
  updateSettings,
} from "../data/theme-store";

export interface ThemeCustomizerState {
  selectedId: string;
  customized: boolean;
  currentPreset: ThemePreset;
  cliCommand: string;
  cssOutput: string;
  setSelectedId: (id: string) => void;
  updateColor: (
    mode: "dark" | "light",
    key: keyof ThemeColors,
    value: string,
  ) => void;
  updateRadius: (key: keyof ThemeRadius, value: string) => void;
  updateSettings: <K extends keyof ThemeSettings>(
    key: K,
    value: ThemeSettings[K],
  ) => void;
  reset: () => void;
}

export function useThemeCustomizer(): ThemeCustomizerState {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const currentPreset: ThemePreset = useMemo(() => {
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
  }, [state.selectedId, state.dark, state.light, state.radius, state.settings]);

  const cliCommand = useMemo(
    () =>
      state.customized
        ? generateCustomCliCommand(
            JSON.stringify({
              dark: state.dark,
              light: state.light,
              radius: state.radius,
              settings: state.settings,
            }),
          )
        : generateCliCommand(currentPreset),
    [
      currentPreset,
      state.customized,
      state.dark,
      state.light,
      state.radius,
      state.settings,
    ],
  );

  const cssOutput = useMemo(
    () => generateThemeCss(currentPreset),
    [currentPreset],
  );

  const setSelectedId = useCallback((id: string) => selectPreset(id), []);
  const doUpdateColor = useCallback(
    (mode: "dark" | "light", key: keyof ThemeColors, value: string) =>
      updateColor(mode, key, value),
    [],
  );
  const doUpdateRadius = useCallback(
    (key: keyof ThemeRadius, value: string) => updateRadius(key, value),
    [],
  );
  const doUpdateSettings = useCallback(
    <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) =>
      updateSettings(key, value),
    [],
  );
  const doReset = useCallback(() => reset(), []);

  return {
    selectedId: state.selectedId,
    customized: state.customized,
    currentPreset,
    cliCommand,
    cssOutput,
    setSelectedId,
    updateColor: doUpdateColor,
    updateRadius: doUpdateRadius,
    updateSettings: doUpdateSettings,
    reset: doReset,
  };
}
