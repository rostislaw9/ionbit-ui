import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Slider-local value that commits to the store only on release.
 *
 * Radix's `onValueCommit` is not reliable on its own: it only fires
 * when the internal value differs from slide start, and never on
 * interrupted pointer captures — so a slow grab-and-release can leave
 * the store out of sync. `releaseProps` commits the latest local at the
 * wrapper level on `pointerup`/`pointercancel`/`keyup`/`blur`
 * regardless of how the gesture ends; commits dedupe against the last
 * committed value.
 */
export function useCommittedLocal(
  external: number,
  onCommit: (value: number) => void,
) {
  const [local, setLocal] = useState(external);
  const localRef = useRef(local);
  const committedRef = useRef(external);
  localRef.current = local;

  useEffect(() => {
    setLocal(external);
    committedRef.current = external;
  }, [external]);

  const commit = useCallback(
    (next?: number) => {
      const v = next ?? localRef.current;
      if (v === committedRef.current) return;
      committedRef.current = v;
      onCommit(v);
    },
    [onCommit],
  );

  const releaseProps = {
    onPointerUp: () => commit(),
    onPointerCancel: () => commit(),
    // Keyboard changes end on keyup/blur; both are dedupe'd no-ops when
    // Radix's own commit already landed.
    onKeyUp: () => commit(),
    onBlur: () => commit(),
  };

  return { local, setLocal, commit, releaseProps };
}
