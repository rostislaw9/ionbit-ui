import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type MutableRefObject,
} from "react";

import { observeStyleChanges } from "../style-observer";

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
 * The radius is sampled lazily on the first commit where the wrapper
 * element actually exists — primitives that drop their wrapper while
 * `disabled` mount it only once the effect turns on, so a one-shot
 * mount-time sample would leave them radius-less. Re-sampled when the
 * document's styles change (injected stylesheets, root attribute/class
 * changes — e.g. theme switches) and on `pointerenter`, so live theme
 * updates don't require a reload.
 *
 * @returns A ref to attach to the wrapper element.
 */
export function useInheritedRadius<T extends HTMLElement = HTMLElement>(
  options?: UseInheritedRadiusOptions<T>,
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  // Pending-sample flag — kept true until the wrapper exists, so a
  // late-mounted wrapper (disabled → enabled) still gets sampled.
  const dirty = useRef(true);

  const sample = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const child = (optionsRef.current?.resolveChild?.(el) ??
      el.firstElementChild) as HTMLElement | null;
    if (!child) return;

    const childRadius = getComputedStyle(child).borderRadius;
    if (childRadius && el.style.borderRadius !== childRadius) {
      el.style.borderRadius = childRadius;
    }
  }, []);

  // Runs after every commit but only samples while one is pending —
  // covers wrappers mounted by a disabled→enabled flip, and applies
  // the radius before paint on the initial mount.
  useLayoutEffect(() => {
    if (!dirty.current || !ref.current) return;
    dirty.current = false;
    sample();
  });

  useEffect(
    () =>
      observeStyleChanges(ref.current ?? document.documentElement, () => {
        dirty.current = true;
        sample();
      }),
    [sample],
  );

  return ref;
}
