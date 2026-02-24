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
import { addProduct, updateProduct } from "../actions";
import { productSchema, ProductSchemaType } from "../schemas";
import { ProductType } from "../types";

export function ProductForm({
  type,
  existedValues,
  onSuccess,
}: {
  type: "add" | "update";
  existedValues?: Pick<ProductType, "id" | "name" | "description">;
  onSuccess?: () => void;
}) {
  const router = useRouter();

  const defaultValues: ProductSchemaType = existedValues || {
    name: "",
    description: "",
  };
  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: productSchema,
    },
    onSubmit: async ({ value }) => {
      if (type === "add") {
        const res = await addProduct({ value });
        showToast(res);
        if (res.success) {
          form.reset();
        }
      }

      if (type === "update" && existedValues) {
        const res = await updateProduct({ value, productId: existedValues.id });
        showToast(res);
        onSuccess && onSuccess();
      }
    },
  });

  return (
    <Card className="w-full rounded-sm">
      <CardHeader>
        <CardTitle>Product info</CardTitle>
        <CardDescription>Describe as much as you can.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={`product-form-${type}`}
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
                  placeHolder="Enter a full product name."
                />
              )}
            />
            <form.AppField
              name="description"
              children={(field) => (
                <field.TextareaField
                  label="Description"
                  placeHolder="Enter product descriptions what's fits the product most."
                  descriptions="These are the public facing description which will be shown to the customer."
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.AppForm>
          <form.SubscribeButton type={type} />
        </form.AppForm>
      </CardFooter>
    </Card>
  );
}
