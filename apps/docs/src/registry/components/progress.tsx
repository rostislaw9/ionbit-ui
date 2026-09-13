import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { ProgressControlledDemo } from "../../demos/progress-controlled-demo";
import ProgressControlledDemoSource from "../../demos/progress-controlled-demo.tsx?highlighted";
import ProgressControlledDemoRaw from "../../demos/progress-controlled-demo.tsx?raw";
import { ProgressDemo } from "../../demos/progress-demo";
import ProgressDemoSource from "../../demos/progress-demo.tsx?highlighted";
import ProgressDemoRaw from "../../demos/progress-demo.tsx?raw";
import { ProgressLabelDemo } from "../../demos/progress-label-demo";
import ProgressLabelDemoSource from "../../demos/progress-label-demo.tsx?highlighted";
import ProgressLabelDemoRaw from "../../demos/progress-label-demo.tsx?raw";

export const progressMeta: ComponentMeta = {
  name: "progress",
  label: "Progress",
  description:
    "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  category: "Feedback",
  examples: [
    {
      title: "Overview",
      description: "An animated progress bar that cycles through values.",
      code: ProgressDemoSource,
      rawCode: ProgressDemoRaw,
      render: () => <ProgressDemo />,
    },
    {
      title: "Label",
      description: (
        <>
          Use <InlineCode>ProgressLabel</InlineCode> and{" "}
          <InlineCode>ProgressValue</InlineCode> to add a label and value
          display.
        </>
      ),
      code: ProgressLabelDemoSource,
      rawCode: ProgressLabelDemoRaw,
      render: () => <ProgressLabelDemo />,
    },
    {
      title: "Controlled",
      description: "A progress bar that can be controlled by a slider.",
      code: ProgressControlledDemoSource,
      rawCode: ProgressControlledDemoRaw,
      render: () => <ProgressControlledDemo />,
    },
  ],
  usageImport: `import { Progress } from "@/components/ui/progress";`,
  usageCode: `<Progress value={60} />`,
  composition: [
    {
      heading: "With label and value",
      description: (
        <>
          Use <InlineCode>ProgressLabel</InlineCode> and{" "}
          <InlineCode>ProgressValue</InlineCode> to add a label and value
          display.
        </>
      ),
      code: `import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

<Progress value={56} className="w-full max-w-sm">
  <ProgressLabel>Upload progress</ProgressLabel>
  <ProgressValue />
</Progress>`,
      tree: [
        "Progress",
        "├── ProgressLabel",
        "├── ProgressValue",
        "└── ProgressTrack",
        "    └── ProgressIndicator",
      ],
    },
  ],
  apiReference: {
    label: "Base UI Progress",
    url: "https://base-ui.com/react/components/progress#api-reference",
  },
  accessibility: [
    'role="progressbar" with aria-valuenow/min/max',
    "ProgressLabel provides an accessible name for the progress bar",
    "Screen readers announce progress changes",
  ],
  basedOn: "base",
  isNew: false,
};
