import { useState } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./form-context";

export function NumberField({
  label,
  placeHolder,
}: {
  label: string;
  placeHolder?: string;
}) {
  const [rawValue, setRawValue] = useState("");
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const value =
    rawValue === "" && field.state.meta.isDirty ? "" : field.state.value;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <Input
        type="number"
        id={field.name}
        name={field.name}
        value={value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          const raw = e.target.value;
          setRawValue(raw);
          field.handleChange(Number(raw));
        }}
        aria-invalid={isInvalid}
        placeholder={placeHolder}
        autoComplete="off"
        onFocus={(e) => e.target.select()}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
