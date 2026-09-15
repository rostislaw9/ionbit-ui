import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { scrollToSection } from "../lib/scroll-to-section";

/**
 * Scrolls to the element matching the URL hash on mount and whenever
 * the hash changes. Re-scrolls when the document height changes (e.g.
 * lazy-loaded registry content or a tab restored from localStorage
 * loading its content asynchronously) for up to 1s.
 */
export function useScrollToAnchor(sectionIds: string[]) {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    if (!id) return;
    // Only scroll for known section anchors — skip demo-* anchors
    // (handled by ComponentDetailPage's demo-switching effect).
    if (!sectionIds.includes(id)) return;

    let frame: number | null = null;
    const scheduleScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        scrollToSection(id, sectionIds);
      });
    };

    const ro = new ResizeObserver(scheduleScroll);
    ro.observe(document.body);
    scheduleScroll();

    const stop = setTimeout(() => ro.disconnect(), 1000);
    return () => {
      clearTimeout(stop);
      ro.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [hash, sectionIds]);
}
