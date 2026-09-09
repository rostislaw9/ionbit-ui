import type { ComponentMeta } from "./types";

import { TableBasicDemo } from "../../demos/table-basic-demo";
import TableBasicDemoSource from "../../demos/table-basic-demo.tsx?highlighted";
import TableBasicDemoRaw from "../../demos/table-basic-demo.tsx?raw";

export const tableMeta: ComponentMeta = {
  name: "table",
  label: "Table",
  description:
    "Responsive table with header, body, footer, rows, cells, and caption.",
  category: "Data",
  examples: [
    {
      title: "Overview",
      description: "A simple table with header and body rows.",
      code: TableBasicDemoSource,
      rawCode: TableBasicDemoRaw,
      render: () => <TableBasicDemo />,
    },
  ],
  usageImport: `import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";`,
  usageCode: `<Table>
  <TableCaption>Users</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice</TableCell>
      <TableCell>alice@example.com</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total: 1 user</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
  composition: [
    "Table",
    "├── TableCaption",
    "├── TableHeader",
    "│   └── TableRow",
    "│       └── TableHead",
    "├── TableBody",
    "│   └── TableRow",
    "│       └── TableCell",
    "└── TableFooter",
    "    └── TableRow",
    "        └── TableCell",
  ],
  props: [
    {
      name: "...props",
      type: "HTML attributes",
      description:
        "All native HTML attributes of the underlying element for each part (table, thead, tbody, tfoot, tr, th, td, caption).",
    },
  ],
  accessibility: [
    "Uses native HTML table elements, so screen readers announce it as a table.",
    "Provide a TableCaption or aria-label to give the table a descriptive name.",
    'Use scope="col" or scope="row" on TableHead for complex tables to improve screen reader navigation.',
  ],
  isNew: false,
};
