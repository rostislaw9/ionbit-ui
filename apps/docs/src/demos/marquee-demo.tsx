import { Marquee } from "@/components/motion";
import { Badge } from "@/components/ui/badge";

const ITEMS = [
  "release v0.2.3",
  "registry: 59 items",
  "ci: passing",
  "docs: deployed",
  "npm: live",
  "themes: 20",
];

export function MarqueeDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Marquee className="rounded-md border border-border py-2.5">
        {ITEMS.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </Marquee>
      <p className="text-center font-mono text-xs text-foreground-muted">
        hover to pause — the loop never jumps
      </p>
    </div>
  );
}
