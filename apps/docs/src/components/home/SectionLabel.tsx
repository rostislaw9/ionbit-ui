/** Shared terminal-flavored label for homepage sections — a shell
 * command on the left, a muted receipt on the right. */
export function SectionLabel({ cmd, note }: { cmd: string; note?: string }) {
  return (
    <p className="flex items-baseline justify-between gap-4 font-mono text-xs text-foreground-muted">
      <span className="truncate">
        ~/ionbit-ui $ <span className="text-foreground">{cmd}</span>
      </span>
      {note && (
        <span className="hidden shrink-0 text-foreground-subtle sm:block">
          {note}
        </span>
      )}
    </p>
  );
}
