import type { ReactNode } from "react";

import { Sidebar } from "./Sidebar";

/**
 * Both rails share one stepped width — w-56, w-68 at 2xl —
 * so the flex row is always symmetric and main content stays
 * viewport-centered with no fake reservations.
 */
const RAIL_W = "w-56 2xl:w-68";

/**
 * Layout with a fixed left sidebar (desktop only) and truly centered
 * content. When `rightSidebar` is provided, a sticky right column is
 * shown on xl+ screens (used for "On this page" navigation).
 */

export function SidebarLayout({
  children,
  rightSidebar,
}: {
  children: ReactNode;
  rightSidebar?: ReactNode;
}) {
  return (
    <div className="flex gap-8 px-6 py-8">
      {/* Left sidebar — hidden on mobile (burger menu shows instead) */}
      <aside className={`hidden shrink-0 lg:block ${RAIL_W}`}>
        <div
          className={`fixed top-1/2 h-[calc(100vh-16rem)] -translate-y-1/2 ${RAIL_W}`}
        >
          <Sidebar />
        </div>
      </aside>

      {/* Main content — centered on the page */}
      <div className="flex min-w-0 flex-1 justify-center">
        <div className="w-full max-w-4xl">{children}</div>
      </div>

      {/* Right sidebar — "On this page" (xl+ only), scrolls independently.
          The fixed panel's width matches the reservation (RAIL_W), so it
          lands exactly inside its slot at the viewport's right edge. */}
      {rightSidebar ? (
        <aside className={`hidden shrink-0 xl:block ${RAIL_W}`}>
          <div
            className={`fixed top-24 right-6 no-scrollbar max-h-[calc(100vh-8rem)] scroll-fade overflow-y-auto overscroll-contain pb-8 scroll-fade-24 ${RAIL_W}`}
          >
            {rightSidebar}
          </div>
        </aside>
      ) : (
        /* Right spacer — mirrors the right rail so pages without a
           sidebar keep the same centered content column. */
        <aside
          className={`hidden shrink-0 xl:block ${RAIL_W}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
