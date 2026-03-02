import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { useFormContext } from "./form-context";

export function SubscribeButton({
  type,
  formId,
}: {
  type: "add" | "update";
  formId: string;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => [state.isSubmitting]}
      children={([isPending]) => (
        <Field className="justify-end" orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button disabled={isPending} type="submit" form={formId}>
            {type === "update" ? "Update" : "Submit"}
          </Button>
        </Field>
      )}
    />
  );
}
