import { Building2, CreditCard, Wallet } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuRadioIconsDemo() {
  const [method, setMethod] = useState("card");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        Payment Method
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select method</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={method} onValueChange={setMethod}>
            <DropdownMenuRadioItem value="card">
              <CreditCard />
              Credit card
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paypal">
              <Wallet />
              PayPal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bank">
              <Building2 />
              Bank transfer
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
