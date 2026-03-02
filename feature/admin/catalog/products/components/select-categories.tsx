import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export function SelectCategories() {
  return (
    <FieldGroup>
      <Field orientation={"horizontal"}>
        <p>Track Inventory</p>
        <Button variant={"secondary"}>Categories</Button>
      </Field>
    </FieldGroup>
  );
}
