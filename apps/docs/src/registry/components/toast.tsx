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
import { ToastSoftDemo } from "../../demos/toast-soft-demo";
import ToastSoftDemoSource from "../../demos/toast-soft-demo.tsx?highlighted";
import ToastSoftDemoRaw from "../../demos/toast-soft-demo.tsx?raw";
import { ToastTypesDemo } from "../../demos/toast-types-demo";
import ToastTypesDemoSource from "../../demos/toast-types-demo.tsx?highlighted";
import ToastTypesDemoRaw from "../../demos/toast-types-demo.tsx?raw";

export const toastMeta: ComponentMeta = {
  name: "toast",
  label: "Toast",
  description:
    "Toast notifications with smooth stacking, swipe to dismiss, and status icons.",
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
        "Default, accent, info, success, warning, error, and loading toasts. Set the type option to render a status icon.",
      code: ToastTypesDemoSource,
      rawCode: ToastTypesDemoRaw,
      render: () => <ToastTypesDemo />,
    },
    {
      title: "Soft",
      description:
        "Soft variants use a neutral border and background with colored title and icon. Use toast.info.soft(), toast.success.soft(), etc.",
      code: ToastSoftDemoSource,
      rawCode: ToastSoftDemoRaw,
      render: () => <ToastSoftDemo />,
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
      title: "Positions",
      description:
        "Set the Toaster position — top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.",
      code: ToastPositionsDemoSource,
      rawCode: ToastPositionsDemoRaw,
      render: () => <ToastPositionsDemo />,
    },
  ],
  usageImport: `import { toast } from "@/components/ui/toast";`,
  usageCode: `toast("Event has been created.");`,
  basedOn: "base",
  accessibility: [
    'Toaster viewport: role="region", aria-live="polite" for non-urgent toasts',
    'High-priority toasts (e.g. error): role="alert", aria-live="assertive", aria-atomic="true"',
    'Toast root: role="dialog" (or "alertdialog" when it has a title + description)',
    'ToastClose: aria-label="Close toast"',
    "Keyboard: focus moves to the viewport region; Esc dismisses; swipe to dismiss supported",
  ],
  apiReference: {
    label: "Base UI Toast",
    url: "https://base-ui.com/react/components/toast#api-reference",
  },
  primitives: [
    {
      name: "toast",
      description:
        "Imperative API to show toasts from anywhere. Each method returns the toast id. Typed methods (success, error, info, warning, accent) also have a `.soft` variant for neutral-border styling.",
      props: [
        {
          name: "message",
          type: "React.ReactNode",
          default: "—",
          description: "Toast title content.",
        },
        {
          name: "options.description",
          type: "React.ReactNode",
          default: "—",
          description: "Secondary text shown below the title.",
        },
        {
          name: "options.type",
          type: '"default" | "accent" | "info" | "success" | "warning" | "error" | "loading" | "accent-soft" | "info-soft" | "success-soft" | "warning-soft" | "error-soft"',
          default: '"default"',
          description:
            "Visual variant. Controls border color and icon. Soft variants keep the neutral border and color the title and icon.",
        },
        {
          name: "options.duration",
          type: "number",
          default: "—",
          description:
            "Auto-dismiss timeout in ms. Set 0 (or use toast.loading) for a persistent toast.",
        },
        {
          name: "options.id",
          type: "string",
          default: "—",
          description:
            "Custom id. Use with toast.update(id, ...) to replace a loading toast.",
        },
        {
          name: "options.action",
          type: "{ label: string; onClick: (e) => void }",
          default: "—",
          description: "Renders an action button inside the toast.",
        },
      ],
    },
    {
      name: "toast.loading",
      description:
        "Show a persistent loading toast. Returns the toast id — pass it to toast.update(id, ...) to resolve it.",
      props: [
        {
          name: "message",
          type: "React.ReactNode",
          default: "—",
          description: "Loading message.",
        },
      ],
    },
    {
      name: "toast.update",
      description:
        "Update an existing toast by id. Commonly used to resolve a loading toast into success/error. Accepts either options or a function receiving the previous toast.",
      props: [
        {
          name: "id",
          type: "string",
          default: "—",
          description: "The toast id returned by toast.loading or toast.add.",
        },
        {
          name: "options",
          type: "ToastOptions | (prev) => ToastOptions",
          default: "—",
          description: "New title, description, type, etc. (or a function).",
        },
      ],
    },
    {
      name: "toast.close",
      description: "Close a toast by id, or all toasts if no id is given.",
      props: [
        {
          name: "id",
          type: "string",
          default: "—",
          description: "The toast id to close. Omit to close all toasts.",
        },
      ],
    },
    {
      name: "toast.promise",
      description:
        "Show a loading toast that resolves to success or error when the promise settles.",
      props: [
        {
          name: "promise",
          type: "Promise<T>",
          default: "—",
          description: "The promise to track.",
        },
        {
          name: "options.loading",
          type: "string | ToastOptions",
          default: "—",
          description: "Loading toast content (string or full options).",
        },
        {
          name: "options.success",
          type: "string | ToastOptions | (data) => string | ToastOptions",
          default: "—",
          description: "Success toast content (string, options, or function).",
        },
        {
          name: "options.error",
          type: "string | ToastOptions | (err) => string | ToastOptions",
          default: "—",
          description: "Error toast content (string, options, or function).",
        },
      ],
    },
    {
      name: "Toaster",
      description:
        "Renders the toast viewport and provider. Mount once at your app root. Accepts Base UI ToastProvider props (timeout, limit, etc.).",
      props: [
        {
          name: "position",
          type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
          default: '"bottom-right"',
          description: "Where the viewport renders on screen.",
        },
        {
          name: "toastManager",
          type: "ToastManager",
          default: "module-level manager",
          description:
            "Custom manager instance (from createToastManager()). Defaults to the shared module-level manager.",
        },
        {
          name: "timeout",
          type: "number",
          default: "5000",
          description:
            "Default auto-dismiss timeout in ms. 0 keeps toasts until manually closed.",
        },
        {
          name: "limit",
          type: "number",
          default: "3",
          description:
            "Maximum toasts displayed at once. Older toasts are marked as limited.",
        },
      ],
    },
  ],
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
