import type { HTMLAttributes, ReactNode } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@ionbit-ui/ui";

interface PreviewCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase eyebrow — the primitive's name. */
  label: string;
  /** One-line call to action. */
  title: string;
  /** Top-right slot — usually the intensity Badge. */
  badge?: ReactNode;
  description: string;
  /** Demo content inside the header (clocks, terminal lines). */
  children?: ReactNode;
  /** Demo content after the header — full-bleed (e.g. a Marquee). */
  after?: ReactNode;
}

/** Shared chrome for the ThemePreview motion cards. */
export function PreviewCard({
  label,
  title,
  badge,
  description,
  children,
  after,
  ...rest
}: PreviewCardProps) {
  return (
    <Card elevated className="h-full" {...rest}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              {label}
            </p>
            <CardTitle className="mt-1 text-lg">{title}</CardTitle>
          </div>
          {badge}
        </div>
        <CardDescription>{description}</CardDescription>
        {children}
      </CardHeader>
      {after}
    </Card>
  );
}
