import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { useFieldContext } from "./form-context";

export function TextareaField({
  label,
  placeHolder,
  descriptions,
}: {
  label: string;
  placeHolder?: string;
  descriptions?: string;
}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeHolder}
        rows={6}
        className="min-h-24 resize-none"
        aria-invalid={isInvalid}
      />
      <FieldDescription>{descriptions}</FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
