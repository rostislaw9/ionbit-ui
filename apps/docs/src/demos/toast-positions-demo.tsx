import { Button } from "@/components/ui/button";
import {
  Toaster,
  createToastManager,
  type ToastPosition,
} from "@/components/ui/toast";

const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const labels: Record<ToastPosition, string> = {
  "top-left": "Top Left",
  "top-center": "Top Center",
  "top-right": "Top Right",
  "bottom-left": "Bottom Left",
  "bottom-center": "Bottom Center",
  "bottom-right": "Bottom Right",
};

// Each position gets its own manager + Toaster so they don't interfere.
const managers = Object.fromEntries(
  positions.map((pos) => [pos, createToastManager()]),
) as Record<ToastPosition, ReturnType<typeof createToastManager>>;

export function ToastPositionsDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {positions.map((pos) => (
        <Button
          key={pos}
          variant="secondary"
          size="xs"
          onClick={() =>
            managers[pos].add({
              title: labels[pos],
              description: `Positioned ${pos}`,
              type: "info",
            })
          }
        >
          {labels[pos]}
        </Button>
      ))}
      {positions.map((pos) => (
        <Toaster key={pos} toastManager={managers[pos]} position={pos} />
      ))}
    </div>
  );
}
