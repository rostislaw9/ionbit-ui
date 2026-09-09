/**
 * Convert a title/name to a URL-safe slug.
 *
 * Used for section IDs, demo anchors, and "On this page" navigation entries.
 * Keep this in sync across all consumers so anchors match exactly.
 */
export function slugify(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}
