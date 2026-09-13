import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function ToastSoftDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        className="text-accent"
        variant="secondary"
        onClick={() =>
          toast.accent.soft("Accent", {
            description: "Soft highlighted message",
          })
        }
      >
        Accent
      </Button>
      <Button
        className="text-info"
        variant="secondary"
        onClick={() =>
          toast.info.soft("Info", {
            description: "Something to know",
          })
        }
      >
        Info
      </Button>
      <Button
        className="text-success"
        variant="secondary"
        onClick={() =>
          toast.success.soft("Success!", {
            description: "Operation completed",
          })
        }
      >
        Success
      </Button>
      <Button
        className="text-warning"
        variant="secondary"
        onClick={() =>
          toast.warning.soft("Warning", {
            description: "Check before proceeding",
          })
        }
      >
        Warning
      </Button>
      <Button
        className="text-error"
        variant="secondary"
        onClick={() =>
          toast.error.soft("Error", {
            description: "Something went wrong",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}
