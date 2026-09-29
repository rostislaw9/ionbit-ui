import { Caret } from "@/components/motion";

export function CaretDemo() {
  return (
    <div className="flex w-xs flex-col gap-1.5 font-mono text-sm">
      <p className="text-foreground-muted">
        &gt; awaiting input
        <Caret className="ml-1" />
      </p>
      <p className="text-foreground">
        &gt; deploy --prod
        <Caret interval={500} className="ml-1" />
      </p>
      <p className="text-foreground-subtle">
        &gt; connection closed
        <Caret blink={false} className="ml-1" />
      </p>
    </div>
  );
}
