import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export function CheckboxInvalidDemo() {
  const [checked, setChecked] = useState(false);
  const invalid = !checked;

  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-invalid={invalid}>
        <Checkbox
          id="terms-checkbox-invalid"
          name="terms-checkbox-invalid"
          aria-invalid={invalid}
          checked={checked}
          onCheckedChange={(v) => setChecked(!!v)}
        />
        <FieldLabel htmlFor="terms-checkbox-invalid">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}
