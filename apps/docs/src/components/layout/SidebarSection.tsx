import { cn } from "@ionbit-ui/ui";

const blockTitleClass =
  "px-2.5 py-1 text-sm font-semibold text-foreground-subtle lg:text-xs";
const sectionClass = "flex flex-col items-start gap-0.5 max-lg:items-stretch";

/** A titled group of links in the sidebar. */
export function SidebarSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(sectionClass, className)}>
      <span className={blockTitleClass}>{title}</span>
      {children}
    </div>
  );
}
