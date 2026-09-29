import { memo } from "react";

import { Magnetic, Pulse } from "@ionbit-ui/motion";
import { Badge, Button } from "@ionbit-ui/ui";

import { useTheme } from "../../hooks/useTheme";
import { CaretCard } from "./cards/CaretCard";
import { CounterCard } from "./cards/CounterCard";
import { GlowCard } from "./cards/GlowCard";
import { MarqueeCard } from "./cards/MarqueeCard";
import { RevealCard } from "./cards/RevealCard";
import { RippleCard } from "./cards/RippleCard";
import { ScrambleCard } from "./cards/ScrambleCard";
import { SplitFlapCard } from "./cards/SplitFlapCard";
import { SpotlightCard } from "./cards/SpotlightCard";
import { TiltCard } from "./cards/TiltCard";
import { TraceCard } from "./cards/TraceCard";
import { TypewriterCard } from "./cards/TypewriterCard";

interface ThemePreviewProps {
  spotlightIntensity: number;
  magneticIntensity: number;
  glowIntensity: number;
  pulseIntensity: number;
  reflectionIntensity: number;
  rippleIntensity: number;
  tiltIntensity: number;
  scrambleSpeed: number;
  traceIntensity: number;
  traceSpeed: number;
  typewriterSpeed: number;
  counterSpeed: number;
  splitflapSpeed: number;
  marqueeSpeed: number;
  caretSpeed: number;
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
  scrambleSpeed,
  traceIntensity,
  traceSpeed,
  typewriterSpeed,
  counterSpeed,
  splitflapSpeed,
  marqueeSpeed,
  caretSpeed,
}: ThemePreviewProps) {
  const { mode } = useTheme();

  return (
    <div className="flex flex-col gap-4" data-mode={mode}>
      {/* Motion hero cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <SpotlightCard intensity={spotlightIntensity} />
        <TiltCard
          intensity={tiltIntensity}
          reflectionIntensity={reflectionIntensity}
        />
        <ScrambleCard speed={scrambleSpeed} />
        <TraceCard intensity={traceIntensity} speed={traceSpeed} />
        <GlowCard intensity={glowIntensity} />
        <RippleCard intensity={rippleIntensity} />
        <TypewriterCard speed={typewriterSpeed} />
        <MarqueeCard speed={marqueeSpeed} />
        <CounterCard speed={counterSpeed} />
        <SplitFlapCard speed={splitflapSpeed} />
        <CaretCard speed={caretSpeed} />
        <RevealCard />
      </div>

      {/* Status badges + Pulse + Magnetic */}
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
        <Magnetic intensity={magneticIntensity}>
          <Button size="sm" variant="primary">
            Magnetic
          </Button>
        </Magnetic>
      </div>
    </div>
  );
}

export const ThemePreview = memo(ThemePreviewImpl);
