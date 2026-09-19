import { useEffect, useRef, type MutableRefObject } from "react";

export interface UseInheritedRadiusOptions<T extends HTMLElement> {
  /**
   * Resolve the element whose computed border-radius should be
   * mirrored. Defaults to the wrapper's `firstElementChild` — override
   * when the wrapper's DOM contains non-content siblings (e.g.
   * overlay layers) before the real content.
   */
  resolveChild?: (el: T) => HTMLElement | null;
}

/**
 * Reads the content child's computed border-radius and applies it to
 * the wrapper element. This lets motion wrappers (Glow, Pulse,
 * Spotlight, Tilt, Ripple) automatically match the wrapped element's
 * rounded corners without requiring the user to pass a `className`
 * for the radius.
 *
 * The radius is re-sampled when the document's styles change (injected
 * stylesheets, root attribute/class changes — e.g. theme switches) and
 * on `pointerenter`, so live theme updates don't require a reload.
 *
 * @returns A ref to attach to the wrapper element.
 */
export function useInheritedRadius<T extends HTMLElement = HTMLElement>(
  options?: UseInheritedRadiusOptions<T>,
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sample = () => {
      const child = (optionsRef.current?.resolveChild?.(el) ??
        el.firstElementChild) as HTMLElement | null;
      if (!child) return;

      const childRadius = getComputedStyle(child).borderRadius;
      if (childRadius && el.style.borderRadius !== childRadius) {
        el.style.borderRadius = childRadius;
      }
    };

    sample();

    const observer = new MutationObserver(sample);
    observer.observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    observer.observe(document.documentElement, { attributes: true });
    el.addEventListener("pointerenter", sample);

    return () => {
      observer.disconnect();
      el.removeEventListener("pointerenter", sample);
    };
  }, []);

  return ref;
}
