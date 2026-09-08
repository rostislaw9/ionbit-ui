import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function BadgeLinkDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Badge asChild>
        <a href="#link">
          Open Link <ArrowUpRight data-icon="inline-end" />
        </a>
      </Badge>
      <Badge variant="accent" asChild>
        <a href="#docs">
          Read docs <ArrowUpRight data-icon="inline-end" />
        </a>
      </Badge>
    </div>
  );
}
