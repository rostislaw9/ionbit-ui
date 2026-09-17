import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { AvatarBadgeDemo } from "../../demos/avatar-badge-demo";
import AvatarBadgeDemoSource from "../../demos/avatar-badge-demo.tsx?highlighted";
import AvatarBadgeDemoRaw from "../../demos/avatar-badge-demo.tsx?raw";
import { AvatarFallbackDemo } from "../../demos/avatar-fallback-demo";
import AvatarFallbackDemoSource from "../../demos/avatar-fallback-demo.tsx?highlighted";
import AvatarFallbackDemoRaw from "../../demos/avatar-fallback-demo.tsx?raw";
import { AvatarGroupCountDemo } from "../../demos/avatar-group-count-demo";
import AvatarGroupCountDemoSource from "../../demos/avatar-group-count-demo.tsx?highlighted";
import AvatarGroupCountDemoRaw from "../../demos/avatar-group-count-demo.tsx?raw";
import { AvatarGroupDemo } from "../../demos/avatar-group-demo";
import AvatarGroupDemoSource from "../../demos/avatar-group-demo.tsx?highlighted";
import AvatarGroupDemoRaw from "../../demos/avatar-group-demo.tsx?raw";
import { AvatarGroupIconDemo } from "../../demos/avatar-group-icon-demo";
import AvatarGroupIconDemoSource from "../../demos/avatar-group-icon-demo.tsx?highlighted";
import AvatarGroupIconDemoRaw from "../../demos/avatar-group-icon-demo.tsx?raw";
import { AvatarOverviewDemo } from "../../demos/avatar-overview-demo";
import AvatarOverviewDemoSource from "../../demos/avatar-overview-demo.tsx?highlighted";
import AvatarOverviewDemoRaw from "../../demos/avatar-overview-demo.tsx?raw";
import { AvatarSizesDemo } from "../../demos/avatar-sizes-demo";
import AvatarSizesDemoSource from "../../demos/avatar-sizes-demo.tsx?highlighted";
import AvatarSizesDemoRaw from "../../demos/avatar-sizes-demo.tsx?raw";
import { AvatarStatusDemo } from "../../demos/avatar-status-demo";
import AvatarStatusDemoSource from "../../demos/avatar-status-demo.tsx?highlighted";
import AvatarStatusDemoRaw from "../../demos/avatar-status-demo.tsx?raw";

export const avatarMeta: ComponentMeta = {
  name: "avatar",
  label: "Avatar",
  description:
    "A user or entity image with graceful fallback, plus status, badge, and group composition support.",
  category: "Feedback",
  examples: [
    {
      title: "Overview",
      description:
        "Single avatars with badges and an avatar group with overflow count.",
      code: AvatarOverviewDemoSource,
      rawCode: AvatarOverviewDemoRaw,
      render: () => <AvatarOverviewDemo />,
    },
    {
      title: "Group",
      description: (
        <p>
          Use the <InlineCode>AvatarGroup</InlineCode> component to add a group
          of avatars.
        </p>
      ),
      code: AvatarGroupDemoSource,
      rawCode: AvatarGroupDemoRaw,
      render: () => <AvatarGroupDemo />,
    },
    {
      title: "Group with Count",
      description: (
        <p>
          Use <InlineCode>AvatarGroupCount</InlineCode> to add a count to the
          group.
        </p>
      ),
      code: AvatarGroupCountDemoSource,
      rawCode: AvatarGroupCountDemoRaw,
      render: () => <AvatarGroupCountDemo />,
    },
    {
      title: "Group with Icon",
      description: (
        <p>
          You can also use an icon inside{" "}
          <InlineCode>AvatarGroupCount</InlineCode>.
        </p>
      ),
      code: AvatarGroupIconDemoSource,
      rawCode: AvatarGroupIconDemoRaw,
      render: () => <AvatarGroupIconDemo />,
    },
    {
      title: "With Fallback",
      description: "Shows a fallback (initials) when the image fails to load.",
      code: AvatarFallbackDemoSource,
      rawCode: AvatarFallbackDemoRaw,
      render: () => <AvatarFallbackDemo />,
    },
    {
      title: "Sizes",
      description: (
        <p>
          Use the <InlineCode>size</InlineCode> prop to change the size of the
          avatar.
        </p>
      ),
      code: AvatarSizesDemoSource,
      rawCode: AvatarSizesDemoRaw,
      render: () => <AvatarSizesDemo />,
    },
    {
      title: "Status Indicators",
      description:
        "Presence indicators with online, offline, busy, and away variants.",
      code: AvatarStatusDemoSource,
      rawCode: AvatarStatusDemoRaw,
      render: () => <AvatarStatusDemo />,
    },
    {
      title: "Badge",
      description: "Custom badge with icon and custom styles.",
      code: AvatarBadgeDemoSource,
      rawCode: AvatarBadgeDemoRaw,
      render: () => <AvatarBadgeDemo />,
    },
  ],
  usageImport: `import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@/components/ui/avatar";`,
  usageCode: `<AvatarGroup>
  <Avatar>
    <AvatarImage src="/avatar.jpg" alt="User" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/avatar2.jpg" alt="User" />
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`,
  composition: [
    {
      heading: "Avatar",
      tree: [
        "Avatar",
        "├── AvatarImage",
        "├── AvatarFallback",
        "├── AvatarStatus",
        "└── AvatarBadge",
      ],
    },
    {
      heading: "Avatar Group",
      tree: [
        "AvatarGroup",
        "├── Avatar",
        "│   ├── AvatarImage",
        "│   ├── AvatarFallback",
        "│   ├── AvatarStatus",
        "│   └── AvatarBadge",
        "├── Avatar",
        "│   ├── AvatarImage",
        "│   ├── AvatarFallback",
        "│   ├── AvatarStatus",
        "│   └── AvatarBadge",
        "└── AvatarGroupCount",
      ],
    },
  ],
  primitives: [
    {
      name: "Avatar",
      description:
        "The core wrapper for an avatar. Provides size control and a circular container for image, fallback, status, and badge.",
      props: [
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Avatar size.",
        },
      ],
    },
    {
      name: "AvatarStatus",
      description:
        "A small presence indicator overlaid on the avatar. Place inside Avatar as a sibling of AvatarImage / AvatarFallback.",
      props: [
        {
          name: "variant",
          type: '"online" | "offline" | "busy" | "away"',
          default: '"online"',
          description: "Status indicator color.",
        },
        {
          name: "position",
          type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
          default: '"bottom-right"',
          description: "Position of the status indicator.",
        },
      ],
    },
    {
      name: "AvatarBadge",
      description:
        "A small status badge overlaid on the avatar corner. Similar to AvatarStatus but accepts arbitrary children (icon, dot).",
      props: [
        {
          name: "className",
          type: "string",
          default: "—",
          description:
            "Size, color, and icon styling for the badge (e.g. size-5 bg-success).",
        },
      ],
    },
    {
      name: "AvatarGroupCount",
      description:
        "Overflow count shown at the end of an AvatarGroup. Renders as a circular element matching avatar sizing.",
      props: [
        {
          name: "children",
          type: "string | ReactNode",
          default: "—",
          description: "Overflow count text (e.g. +5) or an icon element.",
        },
      ],
    },
  ],
  apiReference: {
    label: "Base UI Avatar",
    url: "https://base-ui.com/react/components/avatar#api-reference",
  },
  accessibility: [
    "Avatar root renders as a span.",
    "Fallback is shown when the image fails to load or while loading.",
    "Provide meaningful alt text on AvatarImage for screen readers.",
    'AvatarStatus has role="img" — provide an aria-label for screen readers.',
    "AvatarBadge does not have an implicit role — provide an aria-label.",
    "AvatarGroupCount should be readable text (e.g. +4) for screen readers.",
  ],
  basedOn: "base",
};
