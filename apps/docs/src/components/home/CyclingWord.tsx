import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Glow, Scramble } from "@ionbit-ui/motion";

const WORDS = ["alive", "tactile", "precise", "deliberate"];
const CYCLE_MS = 2600;

/** Cycles WORDS; the box animates to each word's measured width so
 * the centered heading glides instead of jumping. */
export function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>();
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % WORDS.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, []);

  const word = WORDS[index]!;
  useLayoutEffect(() => {
    setWidth(textRef.current?.offsetWidth);
  }, [word]);

  return (
    <span
      className="inline-block transition-[width] duration-500 ease-out"
      style={{ width }}
    >
      <span ref={textRef} className="inline-block whitespace-nowrap">
        <Glow always variant="text" intensity={0.7}>
          <Scramble className="text-accent">{word}</Scramble>
        </Glow>
      </span>
    </span>
  );
}
