import { Plus } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarBadgeDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150?img=23" alt="Taylor Kim" />
      <AvatarFallback>TK</AvatarFallback>
      <AvatarBadge
        className="flex size-3 items-center justify-center bg-foreground text-background"
        aria-label="Add member"
      >
        <Plus />
      </AvatarBadge>
    </Avatar>
  );
}
