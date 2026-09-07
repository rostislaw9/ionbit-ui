import { ModeSwitcher } from "@/components/ui/mode-switcher";

import { useTheme } from "../hooks/useTheme";

export function ModeSwitcherDemo() {
  const { mode, setMode } = useTheme();

  return <ModeSwitcher mode={mode} onModeChange={setMode} />;
}
