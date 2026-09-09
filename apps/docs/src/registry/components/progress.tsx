import type { ComponentMeta } from "./types";

import { ProgressDemo } from "../../demos/progress-demo";
import ProgressDemoSource from "../../demos/progress-demo.tsx?highlighted";
import ProgressDemoRaw from "../../demos/progress-demo.tsx?raw";

export const progressMeta: ComponentMeta = {
  name: "progress",
  label: "Progress",
  description: "Progress bar with transform-based indicator.",
  category: "Feedback",
  examples: [
    {
      title: "Overview",
      description: "Adjustable progress value.",
      code: ProgressDemoSource,
      rawCode: ProgressDemoRaw,
      render: () => <ProgressDemo />,
    },
  ],
  usageImport: `import { Progress } from "@/components/ui/progress";`,
  usageCode: `<Progress value={60} />`,
  props: [
    {
      name: "value",
      type: "number",
      description: "Current progress value (0-100).",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value.",
    },
  ],
  accessibility: [
    'role="progressbar" with aria-valuenow/min/max',
    "Screen readers announce progress",
  ],
  basedOn: "radix",
  isNew: false,
};
