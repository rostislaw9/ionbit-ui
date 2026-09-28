import { Counter } from "@/components/motion";

export function CounterDemo() {
  return (
    <div className="flex items-end gap-8">
      <div>
        <Counter
          value={99.98}
          decimals={2}
          className="font-mono text-3xl text-foreground tabular-nums"
        />
        <p className="mt-1 font-mono text-xs text-foreground-muted">uptime %</p>
      </div>
      <div>
        <Counter
          value={48210}
          className="font-mono text-3xl text-foreground tabular-nums"
        />
        <p className="mt-1 font-mono text-xs text-foreground-muted">installs</p>
      </div>
      <div>
        <Counter
          value={1248}
          from={900}
          className="font-mono text-3xl text-foreground tabular-nums"
        />
        <p className="mt-1 font-mono text-xs text-foreground-muted">stars</p>
      </div>
    </div>
  );
}
