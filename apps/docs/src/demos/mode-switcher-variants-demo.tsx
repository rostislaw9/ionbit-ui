import { ModeSwitcher } from "@/components/ui/mode-switcher";

import { useTheme } from "../hooks/useTheme";

export function ModeSwitcherVariantsDemo() {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <ModeSwitcher
        mode={mode}
        onModeChange={setMode}
        variant="outline"
        size="icon-sm"
      />
      <ModeSwitcher mode={mode} onModeChange={setMode} variant="secondary" />
      <ModeSwitcher
        mode={mode}
        onModeChange={setMode}
        variant="primary"
        size="icon-lg"
      />
    </div>
  );
}
