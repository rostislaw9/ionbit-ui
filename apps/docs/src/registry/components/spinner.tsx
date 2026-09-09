import type { ComponentMeta } from "./types";

import { SpinnerButtonDemo } from "../../demos/spinner-button-demo";
import SpinnerButtonDemoSource from "../../demos/spinner-button-demo.tsx?highlighted";
import SpinnerButtonDemoRaw from "../../demos/spinner-button-demo.tsx?raw";
import { SpinnerDemo } from "../../demos/spinner-demo";
import SpinnerDemoSource from "../../demos/spinner-demo.tsx?highlighted";
import SpinnerDemoRaw from "../../demos/spinner-demo.tsx?raw";

export const spinnerMeta: ComponentMeta = {
  name: "spinner",
  label: "Spinner",
  description: "Animated loading indicator for buttons and async states.",
  category: "Feedback",
  examples: [
    {
      title: "Sizes",
      description: "Five sizes from xs to xl. Default is md.",
      code: SpinnerDemoSource,
      rawCode: SpinnerDemoRaw,
      render: () => <SpinnerDemo />,
    },
    {
      title: "In Buttons",
      description:
        "Compose Spinner into a disabled Button with data-icon for loading states.",
      code: SpinnerButtonDemoSource,
      rawCode: SpinnerButtonDemoRaw,
      render: () => <SpinnerButtonDemo />,
    },
  ],
  usageImport: `import { Spinner } from "@/components/ui/spinner";`,
  usageCode: `<Button disabled>\n  <Spinner data-icon="inline-start" />\n  Saving...\n</Button>`,
  props: [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Size of the spinner icon.",
    },
    {
      name: "className",
      type: "string",
      default: "—",
      description:
        "Additional classes for the spinner. Uses text-current to inherit the surrounding text color.",
    },
  ],
  accessibility: [
    "Spinner is marked aria-hidden by default since it is decorative.",
    'Wrap with aria-live="polite" for screen reader announcements during async operations.',
    "Use aria-label on the parent button when the spinner is the only content.",
  ],
  isNew: false,
};
