import { useEffect, useState } from "react";

/**
 * Returns `true` when the device has a fine pointer (mouse / trackpad)
 * with real hover capability.
 *
 * Cursor-driven primitives (Spotlight, Magnetic, Tilt) use this to skip
 * their pointer listeners on touch devices, where hover never fires
 * naturally and pointermove only fires during scroll gestures. The hook
 * defaults to `true` when media queries are unavailable (SSR, tests) so
 * behavior matches a desktop environment by default.
 */
export function useFinePointer(): boolean {
  const query = "(hover: hover) and (pointer: fine)";
  const [fine, setFine] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return true;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return fine;
}
