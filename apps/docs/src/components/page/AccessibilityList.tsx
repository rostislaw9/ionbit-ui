export function AccessibilityList({ notes }: { notes: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {notes.map((note) => (
        <li
          key={note}
          className="flex items-start gap-2 text-base text-foreground-muted md:text-sm"
        >
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
          {note}
        </li>
      ))}
    </ul>
  );
}
