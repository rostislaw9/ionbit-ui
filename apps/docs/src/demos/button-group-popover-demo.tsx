import { ChevronDown, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

export function ButtonGroupPopoverDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <Sparkles />
        Generate
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Prompt options">
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              Custom prompt
            </span>
            <span className="text-xs text-foreground-muted">
              Describe what you want to generate.
            </span>
            <Textarea
              placeholder="e.g. a short summary of today's meeting notes..."
              className="resize-none"
            />
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
}
