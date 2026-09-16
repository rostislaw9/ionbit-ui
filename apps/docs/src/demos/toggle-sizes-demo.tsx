import { Toggle } from "@/components/ui/toggle";

export function ToggleSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" size="xs">
        XS
      </Toggle>
      <Toggle variant="outline" size="sm">
        Small
      </Toggle>
      <Toggle variant="outline" size="md">
        Medium
      </Toggle>
      <Toggle variant="outline" size="lg">
        Large
      </Toggle>
      <Toggle variant="outline" size="xl">
        XL
      </Toggle>
    </div>
  );
}
