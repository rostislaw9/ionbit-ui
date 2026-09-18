import type { ManifestEntry } from "../registry/manifest";

import { docsManifest } from "../registry/manifest";

export function getPrevNext(
  current: { name: string },
  registry: ManifestEntry[] = docsManifest,
): {
  prev: ManifestEntry | null;
  next: ManifestEntry | null;
} {
  const idx = registry.findIndex((c) => c.name === current.name);
  const prev = idx > 0 ? (registry[idx - 1] ?? null) : null;
  const next = idx < registry.length - 1 ? (registry[idx + 1] ?? null) : null;
  return { prev, next };
}
