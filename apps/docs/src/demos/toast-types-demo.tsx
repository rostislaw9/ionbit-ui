import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function ToastTypesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          toast("Default", {
            description: "A simple notification",
          })
        }
      >
        Default
      </Button>
      <Button
        className="text-info"
        variant="secondary"
        onClick={() =>
          toast.info("Info", {
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
          toast.success("Success!", {
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
          toast.warning("Warning", {
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
          toast.error("Error", {
            description: "Something went wrong",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          const id = toast.loading("Creating event...");
          setTimeout(() => {
            toast.success("Event created", {
              id,
              description: "Sunday, December 3 at 9:00 AM",
            });
          }, 1500);
        }}
      >
        Promise
      </Button>
    </div>
  );
}
