import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export function ProductCoupon() {
  return (
    <FieldGroup>
      <Field orientation={"horizontal"}>
        <p>Copon</p>
        <Button variant={"secondary"}>Coupon</Button>
      </Field>
    </FieldGroup>
  );
}
