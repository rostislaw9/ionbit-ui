import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

export function ButtonGroupInputDemo() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="secondary" aria-label="Search">
        <Search />
      </Button>
    </ButtonGroup>
  );
}
