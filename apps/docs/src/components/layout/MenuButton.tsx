import { cn } from "@ionbit-ui/ui";

/** Burger menu button that animates from "=" to "X" using two lines.
 * shadcn-inspired. */
export function MenuButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="flex items-center justify-start gap-2.5 p-0 text-lg font-medium text-foreground"
    >
      <div className="relative flex h-8 w-4 items-center justify-center">
        <div className="relative size-4">
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
              open ? "top-2 rotate-45" : "top-1",
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
              open ? "top-2 -rotate-45" : "top-2.5",
            )}
          />
        </div>
      </div>
      <span className="flex h-8 items-center leading-none">Menu</span>
    </button>
  );
}
