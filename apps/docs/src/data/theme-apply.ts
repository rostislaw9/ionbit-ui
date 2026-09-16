import type { ThemePreset } from "./theme-presets";

import { generateThemeCss } from "./theme-css";

/**
 * Apply theme CSS variables to the document for live preview.
 *
 * Injects a `<style id="ionbit-theme-preview">` element with both
 * `:root` (dark) and `.light` blocks so CSS specificity works
 * correctly when the mode switcher toggles the `.light` class.
 */
export function applyThemeToDocument(preset: ThemePreset): void {
  if (typeof document === "undefined") return;

  let styleEl = document.getElementById("ionbit-theme-preview");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "ionbit-theme-preview";
  }
  // Keep the element last in <head> so it wins over app styles injected
  // later (e.g. Vite dev-mode CSS injected after this module evaluates).
  document.head.appendChild(styleEl);
  styleEl.textContent = generateThemeCss(preset);
}

/** Remove all theme overrides from the document. */
export function resetThemeOnDocument(): void {
  if (typeof document === "undefined") return;
  const styleEl = document.getElementById("ionbit-theme-preview");
  if (styleEl) styleEl.remove();
}
