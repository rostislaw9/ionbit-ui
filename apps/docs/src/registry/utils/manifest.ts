/**
 * Lightweight util manifest — same structure as componentManifest but
 * for CSS utilities (scroll-fade, shimmer, etc.).
 */
import type { ManifestEntry } from "../manifest";

export const utilManifest: ManifestEntry[] = [
  {
    name: "scroll-fade",
    label: "Scroll Fade",
    category: "Layout",
    description:
      "Utilities for adding a scroll-aware fade effect to the edges of a scroll container.",
    exampleCount: 6,
    isNew: false,
    kind: "util",
  },
  {
    name: "shimmer",
    label: "Shimmer",
    category: "Feedback",
    description: "Utilities for adding a shimmer effect to text elements.",
    exampleCount: 7,
    isNew: false,
    kind: "util",
  },
];
