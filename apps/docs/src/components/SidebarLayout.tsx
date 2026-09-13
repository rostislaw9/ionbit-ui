import type { ReactNode } from "react";

import { Reveal } from "@ionbit-ui/motion";

import { Sidebar } from "./Sidebar";

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
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="fixed top-1/2 h-[calc(100vh-16rem)] w-60 -translate-y-1/2">
          <Reveal direction="right" className="h-full">
            <Sidebar />
          </Reveal>
        </div>
      </aside>

      {/* Main content — centered on the page */}
      <div className="flex min-w-0 flex-1 justify-center">
        <div className="w-full max-w-4xl">{children}</div>
      </div>

      {/* Right sidebar — "On this page" (xl+ only) */}
      {rightSidebar ? (
        <aside className="hidden w-60 shrink-0 xl:block">
          <div className="sticky top-24">{rightSidebar}</div>
        </aside>
      ) : (
        /* Right spacer — balances the left sidebar for true centering */
        <aside className="hidden w-60 shrink-0 xl:block" aria-hidden="true" />
      )}
    </div>
  );
}
