import { componentManifest } from "../registry/components/manifest";

/** Library surface area derived from the component manifest — reused
 * by the homepage for ambient traffic lines, section receipts, and
 * the install footer. */
export const COMPONENT_SLUGS = componentManifest.map((c) => c.name);
export const UI_COUNT = componentManifest.filter(
  (c) => c.category !== "Motion",
).length;
export const MOTION_COUNT = componentManifest.filter(
  (c) => c.category === "Motion",
).length;
