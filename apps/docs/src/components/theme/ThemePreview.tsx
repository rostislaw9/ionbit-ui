import { memo } from "react";

import { Glow, Magnetic, Pulse, Spotlight } from "@ionbit-ui/motion";
import { Badge, Button } from "@ionbit-ui/ui";

import { useTheme } from "../../hooks/useTheme";
import { LoginCard, SettingsCard } from "../../showcase";

/* -------------------------------------------------------------------------- */
/* ThemePreview — real showcase cards rendered in the current theme            */
/* -------------------------------------------------------------------------- */

// The showcase cards use CSS variables for theming (bg-surface, text-foreground,
// etc.) — they don't read theme state via React props. Memoizing the grid
// prevents all 4 cards from re-rendering on every settings change; the browser
// handles visual updates automatically when the CSS variables change.
const ShowcaseGrid = memo(function ShowcaseGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LoginCard />
      <SettingsCard />
    </div>
  );
});

interface ThemePreviewProps {
  spotlightIntensity: number;
  magneticIntensity: number;
  glowIntensity: number;
  pulseIntensity: number;
  translucency: number;
  radiusSm: string;
  radiusXl: string;
}

function ThemePreviewImpl({
  spotlightIntensity,
  magneticIntensity,
  glowIntensity,
  pulseIntensity,
}: ThemePreviewProps) {
  const { mode } = useTheme();

  return (
    <div className="flex flex-col gap-6" data-mode={mode}>
      {/* Spotlight hero — full width, large proximity */}
      <Spotlight
        intensity={spotlightIntensity}
        proximity={220}
        className="rounded-[var(--radius-xl)] border border-border bg-surface-elevated p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
              Spotlight
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              Hover anywhere near
            </h3>
            <p className="mt-1 max-w-sm text-sm text-foreground-muted">
              The radial highlight follows your cursor up to 220px away from the
              card edges.
            </p>
          </div>
          <Badge variant="accent">
            {(spotlightIntensity * 100).toFixed(0)}%
          </Badge>
        </div>
      </Spotlight>

      {/* Showcase cards — real components from the home page grid */}
      <ShowcaseGrid />

      {/* Status badges + Motion effects */}
      <div className="flex flex-wrap items-center justify-evenly gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Pulse intensity={pulseIntensity}>
          <span className="h-3 w-3 rounded-full bg-accent" />
        </Pulse>
        <Glow intensity={glowIntensity}>
          <Button size="xs" variant="outline">
            Glow
          </Button>
        </Glow>
        <Magnetic intensity={magneticIntensity}>
          <Button size="xs" variant="primary">
            Magnetic
          </Button>
        </Magnetic>
      </div>
    </div>
  );
}

export const ThemePreview = memo(ThemePreviewImpl);
