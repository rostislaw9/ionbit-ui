import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const WEIGHTS = [
  { value: "light", label: "Light", fontClass: "font-light" },
  { value: "regular", label: "Regular", fontClass: "font-normal" },
  { value: "medium", label: "Medium", fontClass: "font-medium" },
  { value: "bold", label: "Bold", fontClass: "font-bold" },
] as const;

export function ToggleGroupCustomDemo() {
  const [weight, setWeight] = useState("regular");
  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup
        type="single"
        variant="outline"
        size="lg"
        value={weight}
        onValueChange={(v: string) => v && setWeight(v)}
        aria-label="Font weight"
      >
        {WEIGHTS.map((w) => (
          <ToggleGroupItem
            key={w.value}
            value={w.value}
            className="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span className={`text-2xl leading-none ${w.fontClass}`}>Aa</span>
            <span className="text-xs text-foreground-muted">{w.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-sm text-foreground-muted">
        Selected weight: <span className="text-foreground">{weight}</span>
      </p>
    </div>
  );
}
