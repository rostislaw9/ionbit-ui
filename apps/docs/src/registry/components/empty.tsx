import type { ComponentMeta } from "./types";

import { EmptyAvatarDemo } from "../../demos/empty-avatar-demo";
import EmptyAvatarDemoSource from "../../demos/empty-avatar-demo.tsx?highlighted";
import EmptyAvatarDemoRaw from "../../demos/empty-avatar-demo.tsx?raw";
import { EmptyAvatarGroupDemo } from "../../demos/empty-avatar-group-demo";
import EmptyAvatarGroupDemoSource from "../../demos/empty-avatar-group-demo.tsx?highlighted";
import EmptyAvatarGroupDemoRaw from "../../demos/empty-avatar-group-demo.tsx?raw";
import { EmptyBackgroundDemo } from "../../demos/empty-background-demo";
import EmptyBackgroundDemoSource from "../../demos/empty-background-demo.tsx?highlighted";
import EmptyBackgroundDemoRaw from "../../demos/empty-background-demo.tsx?raw";
import { EmptyDemo } from "../../demos/empty-demo";
import EmptyDemoSource from "../../demos/empty-demo.tsx?highlighted";
import EmptyDemoRaw from "../../demos/empty-demo.tsx?raw";
import { EmptyInputGroupDemo } from "../../demos/empty-input-group-demo";
import EmptyInputGroupDemoSource from "../../demos/empty-input-group-demo.tsx?highlighted";
import EmptyInputGroupDemoRaw from "../../demos/empty-input-group-demo.tsx?raw";
import { EmptyMediaDemo } from "../../demos/empty-media-demo";
import EmptyMediaDemoSource from "../../demos/empty-media-demo.tsx?highlighted";
import EmptyMediaDemoRaw from "../../demos/empty-media-demo.tsx?raw";

export const emptyMeta: ComponentMeta = {
  name: "empty",
  label: "Empty",
  description: "Placeholder for empty states with structured subcomponents.",
  category: "Feedback",
  examples: [
    {
      title: "Overview",
      description:
        "Standard empty state with an icon container, title, description, and actions.",
      code: EmptyDemoSource,
      rawCode: EmptyDemoRaw,
      render: () => <EmptyDemo />,
    },
    {
      title: "Outline",
      description: "Use the border utility to create an outline empty state.",
      code: EmptyMediaDemoSource,
      rawCode: EmptyMediaDemoRaw,
      render: () => <EmptyMediaDemo />,
    },
    {
      title: "Background",
      description:
        "Use bg-* utilities to add a subtle background to the empty state.",
      code: EmptyBackgroundDemoSource,
      rawCode: EmptyBackgroundDemoRaw,
      render: () => <EmptyBackgroundDemo />,
    },
    {
      title: "Avatar",
      description:
        "Use EmptyMedia with variant=default to display an avatar in the empty state.",
      code: EmptyAvatarDemoSource,
      rawCode: EmptyAvatarDemoRaw,
      render: () => <EmptyAvatarDemo />,
    },
    {
      title: "Avatar Group",
      description:
        "Use EmptyMedia to display an avatar group in the empty state.",
      code: EmptyAvatarGroupDemoSource,
      rawCode: EmptyAvatarGroupDemoRaw,
      render: () => <EmptyAvatarGroupDemo />,
    },
    {
      title: "Input Group",
      description:
        "Add an InputGroup component to the EmptyContent for search-driven empty states.",
      code: EmptyInputGroupDemoSource,
      rawCode: EmptyInputGroupDemoRaw,
      render: () => <EmptyInputGroupDemo />,
    },
  ],
  usageImport: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";`,
  usageCode: `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>`,
  composition: [
    "Empty",
    "├── EmptyHeader",
    "│   ├── EmptyMedia",
    "│   ├── EmptyTitle",
    "│   └── EmptyDescription",
    "└── EmptyContent",
  ],
  props: [
    {
      name: "className",
      type: "string",
      default: "—",
      description:
        "Additional classes for the empty-state container. Add border for an outline style or bg-* for a background.",
    },
    {
      name: "EmptyMedia.variant",
      type: '"default" | "icon"',
      default: '"default"',
      description:
        "Default variant is transparent (for avatars/media). Icon variant renders a rounded icon container.",
    },
    {
      name: "EmptyTitle.children",
      type: "ReactNode",
      default: "—",
      description:
        "Heading text. Renders as an <h3> — use a level appropriate for the page outline.",
    },
    {
      name: "EmptyContent.children",
      type: "ReactNode",
      default: "—",
      description: "Action area, typically a Button, link, or InputGroup.",
    },
    {
      name: "EmptyFooter.children",
      type: "ReactNode",
      default: "—",
      description:
        "Footer section for secondary actions or links. Ionbit-specific addition.",
    },
  ],
  accessibility: [
    "EmptyTitle renders as an h3 — use an appropriate heading level for the page outline.",
    'Add role="status" or aria-live="polite" if the empty state appears after an async operation.',
    "EmptyMedia is decorative by default — add aria-label if it conveys meaning.",
  ],
  isNew: false,
};
