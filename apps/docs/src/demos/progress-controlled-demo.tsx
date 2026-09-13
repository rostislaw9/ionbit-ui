import { useState } from "react";

import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

export function ProgressControlledDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value} className="w-full" />
      <Slider
        value={[value]}
        onValueChange={(values) => setValue(values[0]!)}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
}
