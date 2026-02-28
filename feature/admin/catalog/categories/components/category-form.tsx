"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

import { useAppForm } from "@/components/form/form-context";
import { showToast } from "@/helpers/ui/show-toast";
import { useRouter } from "next/navigation";
import { categorySchema, CategorySchemaType } from "../schemas";
import { CategoryType } from "../types";
import { addCategory, updateCategory } from "../actions";
import { useMutation } from "@tanstack/react-query";

export function CategoryForm({
  type,
  existedValues,
  onSuccess,
}: {
  type: "add" | "update";
  existedValues?: Pick<CategoryType, "id" | "name">;
  onSuccess?: () => void;
}) {
  const router = useRouter();

  const defaultValues: CategorySchemaType = existedValues || {
    name: "",
  };

  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (res) => {
      showToast(res);
      if (res.success) {
        form.reset();
        onSuccess && onSuccess();
      }
    },
  });

  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      if (type === "add") {
        const res = await addCategory({ value });
        showToast(res);
        if (res.success) {
          form.reset();
          onSuccess && onSuccess();
        }
      }

      if (type === "update" && existedValues) {
        const res = await updateCategory({
          value,
          categoryId: existedValues.id,
        });
        showToast(res);
        onSuccess && onSuccess();
      }
    },
  });

  return (
    <Card className="w-full rounded-sm ring-0 shadow-none">
      <CardHeader>
        <CardTitle>Category info</CardTitle>
        <CardDescription>
          Give a category by which you products will be organized.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={`category-form-${type}`}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="name"
              children={(field) => (
                <field.TextField
                  label="Name"
                  placeHolder="Enter a full category name."
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.AppForm>
          <form.SubscribeButton formId={`category-form-${type}`} type={type} />
        </form.AppForm>
      </CardFooter>
    </Card>
  );
}
