"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createCategory } from "../actions";
import { categorySchema } from "../schemas";

export function AddCategoryForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const res = await createCategory({ value });
      if (res.error) {
        toast.error(res.error);
      }
      if (res.message) {
        toast.success(res.message);
        form.reset();
        onSuccess && onSuccess();
        router.refresh();
      }
    },
  });

  return (
    <Card className="w-full rounded-sm">
      <CardHeader>
        <CardTitle>Category info</CardTitle>
        <CardDescription>Describe as much as you can.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="add-category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter full product name."
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isPending]) => (
            <Field orientation="horizontal">
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
              <Button
                disabled={isPending}
                type="submit"
                form="add-category-form"
              >
                Submit
              </Button>
            </Field>
          )}
        />
      </CardFooter>
    </Card>
  );
}
