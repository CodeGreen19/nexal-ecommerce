import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";
import { SubscribeButton } from "./subscribe-button";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
  },
  formComponents: {
    SubscribeButton,
  },
});
