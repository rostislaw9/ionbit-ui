/**
 * Samples the wrapped element's computed text color — the "ink" that
 * reads correctly on any solid background. Used by Ripple (ripple
 * color) and Tilt (reflection glare) so effects follow the element's
 * own foreground on both light and dark surfaces.
 *
 * Reads `firstElementChild` (the wrapped content), falling back to
 * the wrapper itself, and returns `fallback` when the computed color
 * is empty or fully transparent.
 */
export function sampleInkColor(
  el: HTMLElement,
  fallback = "currentColor",
): string {
  const target = (el.firstElementChild ?? el) as HTMLElement;
  const computed = getComputedStyle(target).color;
  return computed && computed !== "transparent" ? computed : fallback;
}

/**
 * Invokes `callback` whenever the document's styles could have changed:
 * injected/replaced stylesheets in `<head>`, attribute/class mutations
 * on the root element (e.g. `.dark` mode toggles, theme classes), and
 * on `pointerenter` of `el` as a fallback for class-driven style
 * changes the document observers cannot see.
 *
 * Used by primitives that sample computed styles (inherited radius,
 * inherited text color) so live theme updates don't require a reload.
 *
 * @returns A cleanup function that disconnects all listeners.
 */
export function observeStyleChanges(
  el: HTMLElement,
  callback: () => void,
): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.head, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  observer.observe(document.documentElement, { attributes: true });
  el.addEventListener("pointerenter", callback);

  return () => {
    observer.disconnect();
    el.removeEventListener("pointerenter", callback);
  };
}
