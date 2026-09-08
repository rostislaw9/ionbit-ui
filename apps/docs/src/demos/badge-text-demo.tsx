import { Badge } from "@/components/ui/badge";

export function BadgeTextDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Badge variant="accent-text">Accent</Badge>
      <Badge variant="success-text">Success</Badge>
      <Badge variant="warning-text">Warning</Badge>
      <Badge variant="error-text">Error</Badge>
      <Badge variant="info-text">Info</Badge>
    </div>
  );
}
