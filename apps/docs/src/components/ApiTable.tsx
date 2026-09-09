import type { PropMeta } from "../registry/components/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ionbit-ui/ui";

const headClass =
  "h-auto px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground-subtle";
const cellBase = "px-4 py-2 font-mono text-xs leading-loose whitespace-normal";

export function ApiTable({ props }: { props: PropMeta[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table className="text-sm">
        <TableHeader>
          <TableRow className="border-border bg-surface hover:bg-surface">
            <TableHead className={headClass}>Prop</TableHead>
            <TableHead className={headClass}>Type</TableHead>
            <TableHead className={headClass}>Default</TableHead>
            <TableHead className={headClass}>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow
              key={prop.name}
              className="border-border hover:bg-surface"
            >
              <TableCell className={`${cellBase} text-accent`}>
                {prop.name}
              </TableCell>
              <TableCell className={`${cellBase} max-w-md text-foreground`}>
                {prop.type}
              </TableCell>
              <TableCell className={`${cellBase} text-foreground-muted`}>
                {prop.default ?? "—"}
              </TableCell>
              <TableCell className={`${cellBase} max-w-md text-foreground`}>
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
