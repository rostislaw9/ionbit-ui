import type { Mode } from "@ionbit-ui/ui";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "ionbit-ui-theme";

type SystemMode = Mode | "system";

function getStoredMode(): SystemMode | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "dark" || value === "light" || value === "system") {
      return value;
    }
  } catch {
    // localStorage may be unavailable (private mode, SSR, etc.)
  }
  return null;
}

function getSystemMode(): Mode {
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: light)").matches
  ) {
    return "light";
  }
  return "dark";
}

function resolveMode(stored: SystemMode | null): Mode {
  if (stored && stored !== "system") return stored;
  return getSystemMode();
}

function applyMode(mode: Mode) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(mode);
}

// --- Module-level shared store -------------------------------------

type State = { mode: Mode };

let currentState: State = { mode: resolveMode(getStoredMode()) };
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): State {
  return currentState;
}

function setMode(next: Mode): void {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
  applyMode(next);
  currentState = { mode: next };
  for (const listener of listeners) listener();
}

// Sync across tabs / windows.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      const next = resolveMode(getStoredMode());
      applyMode(next);
      currentState = { mode: next };
      for (const listener of listeners) listener();
    }
  });
}

// React to system preference changes when the user chose "system"
// or hasn't made an explicit choice yet.
if (typeof window !== "undefined") {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", () => {
    const stored = getStoredMode();
    if (stored && stored !== "system") return;
    const next = getSystemMode();
    applyMode(next);
    currentState = { mode: next };
    for (const listener of listeners) listener();
  });
}

// Apply the initial mode before first render to avoid flash.
if (typeof document !== "undefined") {
  applyMode(currentState.mode);
}

// --- Hook -----------------------------------------------------------

/** Theme hook — manages the `.dark` / `.light` class on `<html>`,
 * persists the user's choice to localStorage, and reacts to system
 * preference changes when the user hasn't made an explicit choice.
 *
 * State is shared across all callers via a module-level store, so
 * multiple ModeSwitcher instances on the same page stay in sync. */
export function useTheme() {
  const { mode } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const toggle = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode]);

  return { mode, setMode, toggle };
}
