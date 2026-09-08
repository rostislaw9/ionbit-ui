import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function ToastDescriptionDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 3 at 9:00 AM",
          })
        }
      >
        With description
      </Button>
      <Button
        className="text-success"
        variant="secondary"
        onClick={() =>
          toast.success("Deploy complete", {
            description: "Your site is live at my-app.vercel.app",
          })
        }
      >
        Success with description
      </Button>
      <Button
        className="text-error"
        variant="secondary"
        onClick={() =>
          toast.error("Deploy failed", {
            description: "Check the build logs and try again",
          })
        }
      >
        Error with description
      </Button>
    </div>
  );
}
