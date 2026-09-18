import { ChevronDown, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ButtonGroupDropdownDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Publish</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="secondary"
              size="icon"
              aria-label="Publish options"
            />
          }
        >
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem>Schedule for later</DropdownMenuItem>
          <DropdownMenuItem>Save as draft</DropdownMenuItem>
          <DropdownMenuItem>Share link</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-error hover:bg-error-muted! hover:text-error! focus:bg-error-muted! focus:text-error!">
            <Trash2 />
            Discard post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
