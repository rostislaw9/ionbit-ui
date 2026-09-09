import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold text-foreground">Order #4189</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle details</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border px-4 py-2 text-sm">
        <span className="text-foreground-muted">Status</span>
        <span className="font-medium text-foreground">Shipped</span>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border border-border px-4 py-2 text-sm">
          <p className="font-medium text-foreground">Shipping address</p>
          <p className="text-foreground-muted">100 Market St, San Francisco</p>
        </div>
        <div className="rounded-md border border-border px-4 py-2 text-sm">
          <p className="font-medium text-foreground">Items</p>
          <p className="text-foreground-muted">2x Studio Headphones</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
