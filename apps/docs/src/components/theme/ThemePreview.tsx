import { memo } from "react";

import {
  Glow,
  Magnetic,
  Pulse,
  Ripple,
  Spotlight,
  Tilt,
} from "@ionbit-ui/motion";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ionbit-ui/ui";

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
  reflectionIntensity: number;
  rippleIntensity: number;
  tiltIntensity: number;
  translucency: number;
  radiusSm: string;
  radiusXl: string;
}

function ThemePreviewImpl({
  spotlightIntensity,
  magneticIntensity,
  glowIntensity,
  pulseIntensity,
  reflectionIntensity,
  rippleIntensity,
  tiltIntensity,
}: ThemePreviewProps) {
  const { mode } = useTheme();

  return (
    <div className="flex flex-col gap-6" data-mode={mode}>
      {/* Pointer-driven hero cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Spotlight — large proximity so the glow leads the cursor */}
        <Spotlight intensity={spotlightIntensity} proximity={220}>
          <Card elevated>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                    Spotlight
                  </p>
                  <CardTitle className="mt-1 text-lg">
                    Hover anywhere near
                  </CardTitle>
                </div>
                <Badge variant="accent">
                  {(spotlightIntensity * 100).toFixed(0)}%
                </Badge>
              </div>
              <CardDescription>
                The radial highlight follows your cursor up to 220px away from
                the card edges.
              </CardDescription>
            </CardHeader>
          </Card>
        </Spotlight>

        {/* Tilt — the whole card surface tilts toward the cursor */}
        <Tilt
          reflection
          reflectionIntensity={reflectionIntensity}
          intensity={tiltIntensity}
        >
          <Card elevated>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                    Tilt
                  </p>
                  <CardTitle className="mt-1 text-lg">
                    Move across the card
                  </CardTitle>
                </div>
                <Badge variant="accent">
                  {(tiltIntensity * 100).toFixed(0)}%
                </Badge>
              </div>
              <CardDescription>
                The surface tilts toward your cursor and springs back when you
                leave.
              </CardDescription>
            </CardHeader>
          </Card>
        </Tilt>
      </div>

      {/* Motion effects */}
      <div className="grid grid-cols-3 gap-2">
        <Glow intensity={glowIntensity}>
          <Button variant="outline" className="w-full">
            Glow
          </Button>
        </Glow>
        <Ripple intensity={rippleIntensity}>
          <Button variant="secondary" className="w-full">
            Ripple
          </Button>
        </Ripple>
        <Magnetic intensity={magneticIntensity}>
          <Button variant="primary" className="w-full">
            Magnetic
          </Button>
        </Magnetic>
      </div>

      {/* Showcase cards — real components from the home page grid */}
      <ShowcaseGrid />

      {/* Status badges + Pulse */}
      <div className="flex flex-wrap items-center justify-evenly gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <div className="flex items-center gap-3">
          <Pulse intensity={pulseIntensity}>
            <span className="h-3 w-3 rounded-full bg-accent" />
          </Pulse>
          <span className="text-sm text-foreground-muted">Pulse</span>
        </div>
      </div>
    </div>
  );
}

export const ThemePreview = memo(ThemePreviewImpl);
