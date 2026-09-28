import { Typewriter } from "@/components/motion";

export function TypewriterDemo() {
  return (
    <div className="flex w-xs flex-col gap-1.5 font-mono text-sm">
      <Typewriter as="p" className="text-foreground">
        $ ionbit-ui add motion
      </Typewriter>
      <Typewriter as="p" delay={1100} className="text-foreground-muted">
        resolving registry… 54 items
      </Typewriter>
      <Typewriter as="p" delay={2300} className="text-accent">
        done — primitives installed
      </Typewriter>
    </div>
  );
}
