import { Glow } from "@/components/motion";
import { Badge } from "@/components/ui/badge";

export function BadgeGlowDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Glow always>
        <Badge variant="accent">Live</Badge>
      </Glow>
      <Glow always color="var(--success)">
        <Badge variant="success">Online</Badge>
      </Glow>
      <Glow always color="var(--error)">
        <Badge variant="error">Down</Badge>
      </Glow>
      <Glow always color="var(--warning)">
        <Badge variant="warning">Degraded</Badge>
      </Glow>
      <Glow always color="var(--info)">
        <Badge variant="info">Syncing</Badge>
      </Glow>
    </div>
  );
}
