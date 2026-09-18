import { Bell, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuCheckboxesIconsDemo() {
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        Notifications
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Channels</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={channels.email}
            onCheckedChange={(checked) =>
              setChannels({ ...channels, email: checked === true })
            }
          >
            <Mail />
            Email
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={channels.sms}
            onCheckedChange={(checked) =>
              setChannels({ ...channels, sms: checked === true })
            }
          >
            <MessageSquare />
            SMS
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={channels.push}
            onCheckedChange={(checked) =>
              setChannels({ ...channels, push: checked === true })
            }
          >
            <Bell />
            Push
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
