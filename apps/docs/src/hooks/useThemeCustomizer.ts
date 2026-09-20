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

/**
 * Selection-only slice of the theme store — for surfaces that switch
 * presets but never display the generated CSS or CLI command (e.g. the
 * homepage theme strip). Skips the ~40KB CSS regeneration the full hook
 * performs on every change.
 */
export function useThemeSelection(): {
  selectedId: string;
  setSelectedId: (id: string) => void;
} {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { selectedId: state.selectedId, setSelectedId: selectPreset };
}

export function useThemeCustomizer(): ThemeCustomizerState {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const currentPreset: ThemePreset = useMemo(() => {
    const preset = getPreset(state.selectedId);
    return {
      id: preset.id,
      label: state.customized ? "Custom" : preset.label,
      description: state.customized ? "Customized theme" : preset.description,
      dark: state.dark,
      light: state.light,
      radius: state.radius,
      settings: state.settings,
    };
  }, [
    state.customized,
    state.selectedId,
    state.dark,
    state.light,
    state.radius,
    state.settings,
  ]);

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

  // Stable result object so memoized consumers (ThemeControls) bail when
  // nothing they read has changed.
  return useMemo(
    () => ({
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
    }),
    [
      state.selectedId,
      state.customized,
      currentPreset,
      cliCommand,
      cssOutput,
      setSelectedId,
      doUpdateColor,
      doUpdateRadius,
      doUpdateSettings,
      doReset,
    ],
  );
}
