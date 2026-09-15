import type { ThemePreset } from "../../data/theme-presets";

import { Check } from "lucide-react";
import { memo } from "react";

/* -------------------------------------------------------------------------- */
/* Preset card — compact color strip                                           */
/* -------------------------------------------------------------------------- */

interface PresetCardProps {
  preset: ThemePreset;
  isActive: boolean;
  mode: "dark" | "light";
  /** Stable callback from the customizer hook (useState setter). */
  onSelect: (id: string) => void;
}

function PresetCardImpl({ preset, isActive, mode, onSelect }: PresetCardProps) {
  const c = preset[mode];
  const r = preset.radius;
  return (
    <button
      type="button"
      onClick={() => onSelect(preset.id)}
      className={`group relative flex flex-col overflow-hidden border text-start transition-all ${
        isActive
          ? "border-accent ring-2 ring-accent"
          : "border-border hover:border-border-strong"
      }`}
      style={{ backgroundColor: c.background, borderRadius: r.sm }}
    >
      {/* Color bands — accent block + surface strip */}
      <div className="flex h-6 items-stretch gap-px">
        <div className="w-1/3" style={{ backgroundColor: c.accent }} />
        <div className="w-1/3" style={{ backgroundColor: c.surfaceHover }} />
        <div className="flex-1" style={{ backgroundColor: c.surface }} />
      </div>
      {/* Label */}
      <div
        className="flex items-center justify-between px-2 py-1.5"
        style={{ color: c.foreground }}
      >
        <span className="truncate text-[11px] leading-none font-medium">
          {preset.label}
        </span>
        {isActive && (
          <Check className="size-3 shrink-0" style={{ color: c.accent }} />
        )}
      </div>
    </button>
  );
}

export const PresetCard = memo(PresetCardImpl);
