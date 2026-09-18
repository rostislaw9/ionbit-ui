import {
  Archive,
  ArrowLeft,
  BellOff,
  Flag,
  Forward,
  MailCheck,
  MoreHorizontal,
  Printer,
  Reply,
  Save,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="secondary" size="icon" aria-label="Go back">
          <ArrowLeft />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="icon" aria-label="Mark as read">
          <MailCheck className="text-success" />
        </Button>
        <Button variant="secondary" size="icon" aria-label="Snooze">
          <BellOff className="text-error" />
        </Button>
        <Button variant="secondary" size="icon" aria-label="Flag">
          <Flag className="text-warning" />
        </Button>
        <Button variant="secondary" size="icon" aria-label="Archive">
          <Archive className="text-info" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">
          <Reply />
          Reply
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                aria-label="More options"
              />
            }
          >
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Forward />
              Forward
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Save />
              Save as PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error hover:bg-error-muted! hover:text-error! focus:bg-error-muted! focus:text-error!">
              <Trash2 />
              Delete forever
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  );
}
