import { useState } from "react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export function SwitchInvalidDemo() {
  const [checked, setChecked] = useState(false);
  const invalid = !checked;

  return (
    <Field orientation="horizontal" className="max-w-sm" data-invalid={invalid}>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch
        id="switch-terms"
        aria-invalid={invalid}
        checked={checked}
        onCheckedChange={(v) => setChecked(!!v)}
      />
    </Field>
  );
}
