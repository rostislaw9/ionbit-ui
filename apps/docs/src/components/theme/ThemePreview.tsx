import { memo } from "react";

import {
  Glow,
  Magnetic,
  Pulse,
  Ripple,
  Scramble,
  Spotlight,
  Tilt,
  Trace,
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

/* -------------------------------------------------------------------------- */
/* ThemePreview — primitives and components rendered in the current theme      */
/* -------------------------------------------------------------------------- */

interface ThemePreviewProps {
  spotlightIntensity: number;
  magneticIntensity: number;
  glowIntensity: number;
  pulseIntensity: number;
  reflectionIntensity: number;
  rippleIntensity: number;
  tiltIntensity: number;
  scrambleIntensity: number;
  traceIntensity: number;
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
  scrambleIntensity,
  traceIntensity,
}: ThemePreviewProps) {
  const { mode } = useTheme();

  return (
    <div className="flex flex-col gap-4" data-mode={mode}>
      {/* Motion hero cards */}
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

        {/* Scramble — hover decodes every text node in the card */}
        <Scramble as="div" intensity={scrambleIntensity} trigger="hover">
          <Card elevated>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                    Scramble
                  </p>
                  <CardTitle className="mt-1 text-lg">
                    Hover to decrypt
                  </CardTitle>
                </div>
                <Badge variant="accent">
                  {(scrambleIntensity * 100).toFixed(0)}%
                </Badge>
              </div>
              <CardDescription>
                Every text node cycles cipher glyphs, then settles left to
                right.
              </CardDescription>
              <p className="mt-3 font-mono text-xs text-foreground-muted">
                &gt; channel: SECURE // keys rotated
              </p>
            </CardHeader>
          </Card>
        </Scramble>

        {/* Trace — the border beam keeps the card in a busy state */}
        <Trace as="div" intensity={traceIntensity}>
          <Card elevated>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                    Trace
                  </p>
                  <CardTitle className="mt-1 text-lg">
                    Beam on the border
                  </CardTitle>
                </div>
                <Badge variant="accent">
                  {(traceIntensity * 100).toFixed(0)}%
                </Badge>
              </div>
              <CardDescription>
                One accent point laps the perimeter — the card reads as busy
                while it runs.
              </CardDescription>
              <p className="mt-3 flex items-center gap-2 font-mono text-xs text-foreground-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                syncing node-07
              </p>
            </CardHeader>
          </Card>
        </Trace>
      </div>

      {/* Motion effects */}
      <div className="grid grid-cols-3 gap-4">
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
