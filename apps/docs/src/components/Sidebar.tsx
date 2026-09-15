import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { componentManifest } from "../registry/components/manifest";
import { utilManifest } from "../registry/utils/manifest";
import { navItems } from "./navItems";
import { SidebarLink } from "./SidebarLink";
import { SidebarSection } from "./SidebarSection";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  // Auto-scroll the active item into view with padding from the faded edges.
  useEffect(() => {
    const el = activeRef.current;
    const viewport = scrollRef.current;
    if (!el || !viewport) return;
    const pad = 48;
    const top = el.offsetTop - viewport.scrollTop;
    const bottom = top + el.offsetHeight;
    if (top < pad) viewport.scrollTop += top - pad;
    else if (bottom > viewport.clientHeight - pad)
      viewport.scrollTop += bottom - viewport.clientHeight + pad;
  }, [pathname]);

  return (
    <div className="relative h-full">
      <div className="absolute top-12 right-2 bottom-0 hidden w-px bg-[linear-gradient(to_bottom,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)] lg:block" />
      <div
        ref={scrollRef}
        className="no-scrollbar h-full scroll-fade overflow-y-auto scroll-fade-24"
      >
        <nav className="flex flex-col gap-6">
          {/* Menu — mirrors top bar nav, shown only on mobile */}
          <SidebarSection title="Menu" className="lg:hidden">
            {navItems.map((item) => (
              <SidebarLink
                key={item.to}
                to={item.to}
                label={item.label}
                active={pathname === item.to}
                onClick={onNavigate}
              />
            ))}
          </SidebarSection>

          {/* Sections — shown on all devices */}
          <SidebarSection title="Sections">
            <SidebarLink
              to="/docs/installation"
              label="Installation"
              active={pathname === "/docs/installation"}
              ref={pathname === "/docs/installation" ? activeRef : undefined}
              onClick={onNavigate}
            />
            <SidebarLink
              to="/docs/components"
              label="Components"
              active={pathname === "/docs/components"}
              ref={pathname === "/docs/components" ? activeRef : undefined}
              onClick={onNavigate}
            />
            <SidebarLink
              to="/docs/utils"
              label="Utils"
              active={pathname === "/docs/utils"}
              ref={pathname === "/docs/utils" ? activeRef : undefined}
              onClick={onNavigate}
            />
            <SidebarLink
              to="/tokens"
              label="Tokens"
              active={pathname === "/tokens"}
              ref={pathname === "/tokens" ? activeRef : undefined}
              onClick={onNavigate}
            />
            <SidebarLink
              to="/themes"
              label="Themes"
              active={pathname === "/themes"}
              ref={pathname === "/themes" ? activeRef : undefined}
              onClick={onNavigate}
            />
          </SidebarSection>

          {/* Components — shown on all devices */}
          <SidebarSection title="Components">
            {componentManifest.map((comp) => {
              const isActive = pathname === `/docs/components/${comp.name}`;
              return (
                <SidebarLink
                  key={comp.name}
                  to={`/docs/components/${comp.name}`}
                  label={comp.label}
                  active={isActive}
                  isNew={comp.isNew}
                  ref={isActive ? activeRef : undefined}
                  onClick={onNavigate}
                />
              );
            })}
          </SidebarSection>

          {/* Utilities — shown on all devices */}
          <SidebarSection title="Utilities">
            {utilManifest.map((util) => {
              const isActive = pathname === `/docs/utils/${util.name}`;
              return (
                <SidebarLink
                  key={util.name}
                  to={`/docs/utils/${util.name}`}
                  label={util.label}
                  active={isActive}
                  isNew={util.isNew}
                  ref={isActive ? activeRef : undefined}
                  onClick={onNavigate}
                />
              );
            })}
          </SidebarSection>
        </nav>
      </div>
    </div>
  );
}
