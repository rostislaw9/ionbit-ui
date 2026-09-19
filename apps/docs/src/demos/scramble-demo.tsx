import { Scramble } from "@/components/motion";

export function ScrambleDemo() {
  return (
    <div className="flex flex-col items-start gap-3 font-mono text-sm">
      <Scramble className="text-lg text-foreground">SYSTEM ONLINE</Scramble>
      <Scramble className="text-foreground-muted">v2.4.1 deployed</Scramble>
      <Scramble className="text-accent">integrity: verified</Scramble>
    </div>
  );
}
