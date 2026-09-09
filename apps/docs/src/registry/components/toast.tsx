import type { ComponentMeta } from "./types";

import { ToastActionDemo } from "../../demos/toast-action-demo";
import ToastActionDemoSource from "../../demos/toast-action-demo.tsx?highlighted";
import ToastActionDemoRaw from "../../demos/toast-action-demo.tsx?raw";
import { ToastDemo } from "../../demos/toast-demo";
import ToastDemoSource from "../../demos/toast-demo.tsx?highlighted";
import ToastDemoRaw from "../../demos/toast-demo.tsx?raw";
import { ToastDescriptionDemo } from "../../demos/toast-description-demo";
import ToastDescriptionDemoSource from "../../demos/toast-description-demo.tsx?highlighted";
import ToastDescriptionDemoRaw from "../../demos/toast-description-demo.tsx?raw";
import { ToastPositionsDemo } from "../../demos/toast-positions-demo";
import ToastPositionsDemoSource from "../../demos/toast-positions-demo.tsx?highlighted";
import ToastPositionsDemoRaw from "../../demos/toast-positions-demo.tsx?raw";
import { ToastTypesDemo } from "../../demos/toast-types-demo";
import ToastTypesDemoSource from "../../demos/toast-types-demo.tsx?highlighted";
import ToastTypesDemoRaw from "../../demos/toast-types-demo.tsx?raw";

export const toastMeta: ComponentMeta = {
  name: "toast",
  label: "Toast",
  description:
    "Toast notifications with smooth stacking, swipe to dismiss, and five variants.",
  about: (
    <>
      Built on{" "}
      <a
        href="https://sonner.emilkowal.ski"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        Sonner
      </a>{" "}
      by{" "}
      <a
        href="https://twitter.com/emilkowalski"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        Emil Kowalski
      </a>
      .
    </>
  ),
  category: "Feedback",
  examples: [
    {
      title: "Overview",
      description: "A basic toast notification.",
      code: ToastDemoSource,
      rawCode: ToastDemoRaw,
      render: () => <ToastDemo />,
    },
    {
      title: "Types",
      description:
        "Default, info, success, warning, error, and loading toasts. Set the type option to render a status icon.",
      code: ToastTypesDemoSource,
      rawCode: ToastTypesDemoRaw,
      render: () => <ToastTypesDemo />,
    },
    {
      title: "Description",
      description: "Add a description for additional context.",
      code: ToastDescriptionDemoSource,
      rawCode: ToastDescriptionDemoRaw,
      render: () => <ToastDescriptionDemo />,
    },
    {
      title: "Action",
      description:
        "Pass an action button to the toast for inline interactions.",
      code: ToastActionDemoSource,
      rawCode: ToastActionDemoRaw,
      render: () => <ToastActionDemo />,
    },
    {
      title: "Position",
      description:
        "Position each toast individually — top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.",
      code: ToastPositionsDemoSource,
      rawCode: ToastPositionsDemoRaw,
      render: () => <ToastPositionsDemo />,
    },
  ],
  usageImport: `import { toast } from "@/components/ui/toast";`,
  usageCode: `toast("Event has been created.");`,
  apiReference: {
    label: "Sonner API Reference",
    url: "https://sonner.emilkowal.ski/getting-started",
  },
  accessibility: [
    'aria-live="polite" for announcements',
    "Screen readers read toast content",
  ],
  isNew: false,
  setup: {
    heading: "Add the Toaster to your app root.",
    filename: "App.tsx",
    code: `import { Toaster } from "@/components/ui/toast";

export default function App() {
  return (
    <>
      {/* your app */}
      <Toaster />
    </>
  );
}`,
  },
};
