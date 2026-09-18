import type { Section } from "../../hooks/useScrollSpy";
import type { ReactNode } from "react";

import { memo } from "react";

import { cn } from "@ionbit-ui/ui";

export const OnThisPage = memo(function OnThisPage({
  sections,
  activeSection,
  onSectionClick,
}: {
  sections: Section[];
  activeSection: string;
  onSectionClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-2">
      <span className="text-xs font-semibold tracking-wider text-foreground-subtle uppercase">
        On this page
      </span>
      <ul className="flex flex-col gap-1.5 border-l border-border">
        {sections.map((section) => (
          <li key={section.id} className="flex flex-col gap-1.5">
            <SidebarLink
              href={`#${section.id}`}
              isActive={activeSection === section.id}
              onClick={(e) => onSectionClick(e, section.id)}
            >
              {section.label}
            </SidebarLink>
            {section.subsections && section.subsections.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {section.subsections.map((sub) => (
                  <li key={sub.id}>
                    <SidebarLink
                      href={`#${sub.id}`}
                      isActive={activeSection === sub.id}
                      onClick={(e) => onSectionClick(e, sub.id)}
                      indented
                    >
                      {sub.label}
                    </SidebarLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
});

function SidebarLink({
  href,
  isActive,
  onClick,
  indented,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  indented?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "-ml-px block border-l text-sm transition-colors",
        indented ? "pl-7" : "pl-3",
        isActive
          ? "border-accent font-medium text-foreground"
          : "border-transparent text-foreground-muted hover:border-accent hover:text-foreground",
      )}
    >
      {children}
    </a>
  );
}
