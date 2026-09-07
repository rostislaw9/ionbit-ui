import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Button, ModeSwitcher, Separator } from "@ionbit-ui/ui";

import { useTheme } from "../hooks/useTheme";
import { GitHubStarButton } from "./GitHubStarButton";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { navItems } from "./navItems";
import { Sidebar } from "./Sidebar";

/** Top navigation bar. Desktop: nav links on the left, mode switcher
 * on the right. Mobile: burger menu button that opens a fullscreen
 * overlay with the docs sidebar content. */
export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { mode, setMode } = useTheme();

  // Lock body scroll when menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/40 bg-surface/80 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-6 py-3 lg:py-4">
          {/* Left: logo + nav links (desktop) / burger (mobile) */}
          <div className="flex items-center gap-5">
            <div className="lg:hidden">
              <MenuButton
                open={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              />
            </div>
            <Logo size="sm" className="hidden lg:flex" />
            <Separator orientation="vertical" className="hidden lg:block" />
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Button asChild variant="ghost" key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"}>
                    {item.label}
                  </NavLink>
                </Button>
              ))}
            </nav>
          </div>

          {/* Right: GitHub star button + mode switcher */}
          <div className="flex items-center gap-2">
            <GitHubStarButton />
            <Separator orientation="vertical" />
            <ModeSwitcher mode={mode} onModeChange={setMode} />
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-20 lg:hidden">
          {/* Blur backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 cursor-default bg-background/80 backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
          />
          {/* Full-width sidebar content — starts below the header */}
          <div className="absolute inset-x-0 top-14 bottom-0 overflow-y-auto px-3 py-6">
            <Sidebar onNavigate={closeMenu} />
          </div>
        </div>
      )}
    </>
  );
}
