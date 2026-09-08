import { Badge } from "@/components/ui/badge";

export function BadgeSoftDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Badge variant="accent-soft">Accent</Badge>
      <Badge variant="success-soft">Success</Badge>
      <Badge variant="warning-soft">Warning</Badge>
      <Badge variant="error-soft">Error</Badge>
      <Badge variant="info-soft">Info</Badge>
    </div>
  );
}
