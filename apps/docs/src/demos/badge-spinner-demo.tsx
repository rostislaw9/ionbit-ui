import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export function BadgeSpinnerDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Badge variant="error">
        <Spinner size="xs" data-icon="inline-start" />
        Deleting
      </Badge>
      <Badge>
        Generating
        <Spinner size="xs" data-icon="inline-end" />
      </Badge>
    </div>
  );
}
