import type { ComponentMeta } from "./types";

import { PaginationDemo } from "../../demos/pagination-demo";
import PaginationDemoSource from "../../demos/pagination-demo.tsx?highlighted";
import PaginationDemoRaw from "../../demos/pagination-demo.tsx?raw";

export const paginationMeta: ComponentMeta = {
  name: "pagination",
  label: "Pagination",
  description:
    "Composable pagination with previous/next links, page numbers, and an ellipsis for skipped ranges.",
  category: "Navigation",
  examples: [
    {
      title: "Overview",
      description: "Pagination with prev/next, page links, and ellipsis.",
      code: PaginationDemoSource,
      rawCode: PaginationDemoRaw,
      render: () => <PaginationDemo />,
    },
  ],
  usageImport: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";`,
  usageCode: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  composition: [
    "Pagination",
    "└── PaginationContent",
    "    └── PaginationItem",
    "        ├── PaginationPrevious",
    "        ├── PaginationNext",
    "        ├── PaginationLink",
    "        └── PaginationEllipsis",
  ],
  props: [
    {
      name: "isActive",
      type: "boolean",
      description:
        "Whether the link is the current page (sets aria-current and outline variant).",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"',
      default: '"icon"',
      description: "Button size for the pagination link.",
    },
    {
      name: "text",
      type: "string",
      default: '"Previous" / "Next"',
      description: "Label text for PaginationPrevious / PaginationNext.",
    },
  ],
  accessibility: [
    'aria-label="pagination" on nav element',
    'aria-current="page" on active link',
    'aria-label="Go to previous page" / "Go to next page"',
    "sr-only text on ellipsis",
  ],
};
