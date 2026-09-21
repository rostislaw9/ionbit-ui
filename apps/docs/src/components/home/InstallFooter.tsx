import { Scramble } from "@ionbit-ui/motion";

import { MOTION_COUNT, UI_COUNT } from "../../lib/library";
import { cliCmd } from "../../lib/package-managers";
import { CopyButton } from "../code/CopyButton";

const INSTALL = cliCmd("npm", "init");

/** Footer — the count says what's inside; the command is the call to
 * action. Hovering it re-decodes via Scramble. */
export function InstallFooter() {
  return (
    <section className="flex flex-col items-center gap-4 pb-8 text-center">
      <p className="text-sm text-foreground-muted">
        {UI_COUNT} components · {MOTION_COUNT} motion primitives — one command
        away.
      </p>
      <div className="flex w-xs items-center justify-between rounded-md border border-border bg-surface py-1.5 ps-4 pe-1.5">
        <span className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="font-mono text-sm text-accent">
            $
          </span>
          <Scramble
            trigger="hover"
            className="truncate font-mono text-sm text-foreground"
          >
            {INSTALL}
          </Scramble>
        </span>
        <CopyButton text={INSTALL} />
      </div>
    </section>
  );
}
