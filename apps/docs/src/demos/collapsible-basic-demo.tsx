import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function CollapsibleBasicDemo() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="pt-5">
        <Collapsible className="rounded-md data-[open]:bg-surface-hover">
          <CollapsibleTrigger
            render={
              <Button variant="ghost" className="group w-full">
                Product details
                <ChevronDown className="ms-auto group-data-[open]:rotate-180" />
              </Button>
            }
          />
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 text-sm">
            <div>
              This panel can be expanded or collapsed to reveal additional
              content.
            </div>
            <Button size="xs">Learn More</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
