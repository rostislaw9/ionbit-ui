import { Link } from "react-router-dom";

import { Glow } from "@ionbit-ui/motion";
import { cn } from "@ionbit-ui/ui";

/** Brand logo for Ionbit UI. */
export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-2xl",
  };

  return (
    <Glow always variant="text" intensity={1}>
      <Link
        to="/"
        className={cn(
          "flex items-center px-2 font-mono font-semibold tracking-tight text-foreground",
          sizeClasses[size],
          className,
        )}
      >
        ionbit
        <span className="text-accent">_ui</span>
      </Link>
    </Glow>
  );
}
