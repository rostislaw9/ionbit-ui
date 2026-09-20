import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getPreset } from "../../data/theme-store";
import { useTheme } from "../../hooks/useTheme";
import { useThemeSelection } from "../../hooks/useThemeCustomizer";
import { PresetCard } from "../theme/PresetCard";
import { SectionLabel } from "./SectionLabel";

/** A cross-section of the 20 presets — darks, lights, and accents that
 * read differently on the same components. */
const FEATURED = ["digital", "amber", "matcha", "bubblegum", "retro", "nord"];

/** Theme swatches that re-skin the whole page on click — the token
 * system demonstrated on the site itself. */
export function ThemeStrip() {
  const { mode } = useTheme();
  const { selectedId, setSelectedId } = useThemeSelection();

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <SectionLabel cmd="theme --list" note="applied live · try one" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {FEATURED.map((id) => {
          const preset = getPreset(id);
          return (
            <PresetCard
              key={id}
              preset={preset}
              isActive={id === selectedId}
              mode={mode}
              onSelect={setSelectedId}
            />
          );
        })}
      </div>
      <Link
        to="/themes"
        className="group flex items-center gap-1.5 font-mono text-xs text-foreground-muted transition-colors hover:text-foreground"
      >
        all 20 presets, plus a full customizer
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
