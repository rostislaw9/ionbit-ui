import { Typewriter } from "@/components/motion";

export function TypewriterDemo() {
  return (
    <div className="flex w-xs flex-col gap-1.5 font-mono text-sm">
      {/* caret="whileTyping" — the cursor leaves when the line settles,
          so it appears to travel down to the next line. Only the last
          Typewriter keeps its caret blinking. */}
      <Typewriter as="p" caret="whileTyping" className="text-foreground">
        $ ionbit-ui add motion
      </Typewriter>
      <Typewriter
        as="p"
        delay={1100}
        caret="whileTyping"
        className="text-foreground-muted"
      >
        resolving registry… 59 items
      </Typewriter>
      <Typewriter as="p" delay={2300} className="text-accent">
        done — primitives installed
      </Typewriter>
    </div>
  );
}
