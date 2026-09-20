import { useEffect, useState } from "react";

/**
 * Returns `value` after it has been stable for `delay` ms. For
 * high-frequency updates (slider drags) where downstream work —
 * e.g. syntax highlighting — should settle once, not run per tick.
 */
export function useDebouncedValue<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
