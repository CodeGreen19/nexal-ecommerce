"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";

import { useAppForm } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import { showToast } from "@/helpers/ui/show-toast";
import { addProduct, updateProduct } from "../actions";
import { productSchema, ProductSchemaType } from "../schemas";
import { ProductType } from "../types";
import { ProductCoupon } from "./product-coupon";
import { ProductImages } from "./product-images";
import { ProductOptionsDialog } from "./product-options";
import { SelectCategories } from "./select-categories";

export function ProductForm({
  type,
  existedValues,
  onSuccess,
  backToUrl,
}: {
  type: "add" | "update";
  existedValues?: ProductSchemaType & { productId: string };
  onSuccess?: () => void;
  backToUrl?: string;
}) {
  const defaultValues: ProductSchemaType = existedValues ?? {
    name: "",
    description: "",
    sku: "",
    price: 0,
    costOfGoods: 0,
    stock: 0,
    shippingWeightInKg: 0,
  };
  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: productSchema,
      onChange: productSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      if (type === "add") {
        const res = await addProduct({ value });
        showToast(res);
        if (res.success) {
          form.reset();
        }
        onSuccess && onSuccess();
      }

      if (type === "update" && existedValues) {
        const res = await updateProduct({
          value,
          productId: existedValues.productId,
        });
        showToast(res);
        onSuccess && onSuccess();
      }
    },
  });

  return (
    <form
      id={`product-form-${type}`}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Top>
        <TopTitle backToUrl={backToUrl || "/admin/catalog/products"}>
          {type === "add" ? "Add new" : "Update"} product
        </TopTitle>
        <TopActions>
          <form.AppForm>
            <form.SubscribeButton formId={`product-form-${type}`} type={type} />
          </form.AppForm>
        </TopActions>
      </Top>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-5">
        <section className="grid grid-cols-1 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <ProductImages />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Info</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <FieldGroup className="flex-row items-start">
                  <form.AppField
                    name="price"
                    children={(field) => <field.NumberField label="Price" />}
                  />
                  <form.AppField
                    name="costOfGoods"
                    children={(field) => (
                      <field.NumberField label="Costs of goods" />
                    )}
                  />
                </FieldGroup>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inventory & Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <FieldGroup>
                  <form.AppField
                    name="stock"
                    children={(field) => <field.NumberField label="Stock" />}
                  />
                </FieldGroup>
                <FieldGroup className="flex-row items-start">
                  <form.AppField
                    name="sku"
                    children={(field) => (
                      <field.TextField label="SKU (stock keeping unit)" />
                    )}
                  />
                  <form.AppField
                    name="shippingWeightInKg"
                    children={(field) => (
                      <field.NumberField label="Shopping weight in KG" />
                    )}
                  />
                </FieldGroup>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Options</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation={"horizontal"}>
                  <p>
                    Does your product come in different options, like size,
                    color or material? Add them here.
                  </p>
                  <ProductOptionsDialog />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Options</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation={"horizontal"}>
                  <p>Track Inventory</p>
                  <Button variant={"secondary"}>Inventory</Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </section>
        <section className="grid grid-cols-1 gap-5 self-start">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <SelectCategories />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Coupon & Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductCoupon />
            </CardContent>
          </Card>
        </section>
      </div>
    </form>
  );
}
