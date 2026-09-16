import { Toggle } from "@/components/ui/toggle";

export function ToggleDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle disabled>Disabled</Toggle>
      <Toggle variant="outline" disabled>
        Disabled
      </Toggle>
    </div>
  );
}
