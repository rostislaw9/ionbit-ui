import { Plus } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarGroupIconDemo() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Alex Rivera" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=33" alt="Jordan Lee" />
        <AvatarFallback>JL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Sam Chen" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>
        <Plus />
      </AvatarGroupCount>
    </AvatarGroup>
  );
}
