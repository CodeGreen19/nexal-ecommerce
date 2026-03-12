"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useAppForm } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import { showToast } from "@/helpers/ui/show-toast";
import { addProduct, updateProduct } from "../actions";
import {
  emptydefaultValues,
  productSchema,
  ProductSchemaType,
} from "../schemas";
import { ProductCoupon } from "./product-coupon";
import { ProductImages } from "./product-images";
import { ChildFormForProductOptions } from "./product-options";
import { SelectCategories } from "./select-categories";
import { Input } from "@/components/ui/input";
import { useStore } from "@tanstack/react-form";

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
  const defaultValues: ProductSchemaType = existedValues ?? emptydefaultValues;

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: productSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      // if (type === "add") {
      //   const res = await addProduct({ value });
      //   showToast(res);
      //   if (res.success) {
      //     form.reset();
      //   }
      //   onSuccess && onSuccess();
      // }

      // if (type === "update" && existedValues) {
      //   const res = await updateProduct({
      //     value,
      //     productId: existedValues.productId,
      //   });
      //   showToast(res);
      //   onSuccess && onSuccess();
      // }
    },
  });

  const formStore = useStore(form.store, (store) => store.values);

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
            <CardContent className="py-2">
              <FieldGroup>
                <form.Field
                  name="images"
                  children={(field) => (
                    <Field>
                      <ProductImages
                        onInsert={(v) => form.setFieldValue("images", v)}
                        onDelete={(fileId) => {
                          const updatedInserts = field.state.value.filter(
                            (prev) => prev.fileId !== fileId,
                          );
                          form.setFieldValue("images", updatedInserts);
                        }}
                        inserts={field.state.value}
                      />
                    </Field>
                  )}
                />
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
              <FieldGroup className="flex-none grid grid-cols-2">
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
                <Field>
                  <FieldLabel>Profit</FieldLabel>
                  <Input
                    disabled
                    value={formStore.price - (formStore.costOfGoods || 0)}
                    className="disabled:opacity-90"
                  />
                </Field>
                <Field>
                  <FieldLabel>Margin (in percent)</FieldLabel>
                  <Input
                    disabled
                    className="disabled:opacity-90"
                    value={`${(((formStore.price - (formStore.costOfGoods || 0)) / formStore.price) * 100 || 0).toFixed(0)} %`}
                  />
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
                  {/* <p>
                    Does your product come in different options, like size,
                    color or material? Add them here.
                  </p> */}
                  <ChildFormForProductOptions form={form} />
                </Field>
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
