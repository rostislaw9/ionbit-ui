import { forwardRef } from "react";
import { Link } from "react-router-dom";

import { Button, cn } from "@ionbit-ui/ui";

import { NewDot } from "../browser/NewDot";

const activeClass =
  "lg:bg-accent-muted lg:text-accent lg:hover:bg-accent-muted lg:hover:text-accent";
const mobileClass =
  "max-lg:h-10 max-lg:w-full max-lg:justify-start max-lg:text-2xl max-lg:hover:bg-inherit";

/** Sidebar link that highlights when the current path matches. */
export const SidebarLink = forwardRef<
  HTMLAnchorElement,
  {
    to: string;
    label: string;
    active?: boolean;
    isNew?: boolean;
    onClick?: () => void;
  }
>(function SidebarLink({ to, label, active, isNew, onClick }, ref) {
  return (
    <Button
      variant="ghost"
      nativeButton={false}
      className={cn(mobileClass, active && activeClass)}
      render={<Link ref={ref} to={to} onClick={onClick} />}
    >
      <span className="flex items-center gap-1.5">
        {label}
        {isNew && <NewDot />}
      </span>
    </Button>
  );
});
