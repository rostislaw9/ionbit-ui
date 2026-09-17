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
    description: "Scroll-aware edge fade for containers.",
    exampleCount: 6,
    isNew: false,
    kind: "util",
  },
  {
    name: "shimmer",
    label: "Shimmer",
    category: "Feedback",
    description: "Shimmer effect for text elements.",
    exampleCount: 7,
    isNew: false,
    kind: "util",
  },
];
