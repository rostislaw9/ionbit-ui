import type { ComponentMeta } from "./types";

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
  description: "Avatar with image, fallback, status, badge, and group support.",
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
      description: "Overlapping avatars with AvatarGroup.",
      code: AvatarGroupDemoSource,
      rawCode: AvatarGroupDemoRaw,
      render: () => <AvatarGroupDemo />,
    },
    {
      title: "Group with Count",
      description: "AvatarGroup with AvatarGroupCount showing overflow count.",
      code: AvatarGroupCountDemoSource,
      rawCode: AvatarGroupCountDemoRaw,
      render: () => <AvatarGroupCountDemo />,
    },
    {
      title: "Group with Icon",
      description:
        "AvatarGroupCount with an icon instead of text overflow count.",
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
      description: "Avatars in different sizes via className.",
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
      tree: ["AvatarGroup", "├── Avatar", "└── AvatarGroupCount"],
    },
  ],
  props: [
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Avatar size.",
    },
    {
      name: "AvatarStatus.variant",
      type: '"online" | "offline" | "busy" | "away"',
      default: '"online"',
      description: "Status indicator color.",
    },
    {
      name: "AvatarStatus.position",
      type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
      default: '"bottom-right"',
      description: "Position of the status indicator.",
    },
    {
      name: "AvatarBadge.className",
      type: "string",
      default: "—",
      description:
        "Size, color, and icon styling for the badge (e.g. size-5 bg-success).",
    },
    {
      name: "AvatarGroupCount.children",
      type: "string | ReactNode",
      default: "—",
      description: "Overflow count text (e.g. +5) or an icon element.",
    },
  ],
  accessibility: [
    "Avatar root renders as a span.",
    "Fallback is shown when the image fails to load or while loading.",
    "Provide meaningful alt text on AvatarImage for screen readers.",
    'AvatarStatus has role="img" — provide an aria-label for screen readers.',
    "AvatarBadge does not have an implicit role — provide an aria-label.",
    "AvatarGroupCount should be readable text (e.g. +4) for screen readers.",
  ],
  basedOn: "radix",
  isNew: false,
};
