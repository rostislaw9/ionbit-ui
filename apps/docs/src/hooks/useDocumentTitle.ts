import { useEffect } from "react";

const SITE_NAME = "ionbit_ui";

/** Sets the document title for the current page.
 *
 * - `undefined` → just the site name (homepage).
 * - `"Components"` → "Components | ionbit_ui".
 */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page
      ? `${page} | ${SITE_NAME}`
      : `${SITE_NAME} | React UI system`;
  }, [page]);
}
