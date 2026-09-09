import type { ComponentMeta } from "./types";

import { AlertDialogDemo } from "../../demos/alert-dialog-demo";
import AlertDialogDemoSource from "../../demos/alert-dialog-demo.tsx?highlighted";
import AlertDialogDemoRaw from "../../demos/alert-dialog-demo.tsx?raw";

export const alertDialogMeta: ComponentMeta = {
  name: "alert-dialog",
  label: "Alert Dialog",
  description:
    "Alert dialog for destructive confirmations with overlay and zoom animations.",
  category: "Overlay",
  examples: [
    {
      title: "Overview",
      description:
        "Destructive action confirmation with cancel and action buttons.",
      code: AlertDialogDemoSource,
      rawCode: AlertDialogDemoRaw,
      render: () => <AlertDialogDemo />,
    },
  ],
  usageImport: `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";`,
  usageCode: `<AlertDialog>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  composition: [
    "AlertDialog",
    "├── AlertDialogTrigger",
    "└── AlertDialogContent",
    "    ├── AlertDialogTitle",
    "    ├── AlertDialogDescription",
    "    └── AlertDialogFooter",
    "        ├── AlertDialogCancel",
    "        └── AlertDialogAction",
  ],
  props: [
    { name: "open", type: "boolean", description: "Controlled open state." },
    {
      name: "defaultOpen",
      type: "boolean",
      description: "Uncontrolled default open state.",
    },
    {
      name: "onOpenChange",
      type: "function",
      description: "Called when open state changes.",
    },
  ],
  accessibility: [
    "Focus is trapped within the dialog",
    "Escape closes the dialog",
    'role="alertdialog" for screen readers',
  ],
  basedOn: "radix",
  isNew: false,
};
