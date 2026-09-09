import { Maximize, Minimize } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CollapsibleSettingsDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex items-start gap-2"
        >
          <div className="grid w-full grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="radius-x" className="sr-only">
                Radius X
              </Label>
              <Input id="radius-x" placeholder="0" defaultValue={0} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="radius-y" className="sr-only">
                Radius Y
              </Label>
              <Input id="radius-y" placeholder="0" defaultValue={0} />
            </div>
            <CollapsibleContent className="col-span-2 grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="radius-bl-x" className="sr-only">
                  Radius BL X
                </Label>
                <Input id="radius-bl-x" placeholder="0" defaultValue={0} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="radius-bl-y" className="sr-only">
                  Radius BL Y
                </Label>
                <Input id="radius-bl-y" placeholder="0" defaultValue={0} />
              </div>
            </CollapsibleContent>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="icon">
              {isOpen ? <Minimize /> : <Maximize />}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
