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
import {
  addressSchema,
  AddressSchemaType,
} from "@/feature/marketing/schema/account-profile";
import {
  addOrUpdateAddress,
  getAddress,
} from "@/feature/marketing/server/account-profile";
import { showToast } from "@/helpers/ui/show-toast";
import { useRouter } from "next/navigation";

type AddressType = NonNullable<
  Awaited<ReturnType<typeof getAddress>>
>["address"];

export function ProfileAddressForm({
  type,
  existedValues,
  onSuccess,
}: {
  type: "add" | "update";
  existedValues?: Pick<AddressType, "id" | "address">;
  onSuccess?: () => void;
}) {
  const router = useRouter();

  const defaultValues: AddressSchemaType = existedValues || {
    address: "",
  };

  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: addressSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await addOrUpdateAddress({ value });
      showToast(res);
      if (res.success) {
        form.reset();
        onSuccess && onSuccess();
      }
    },
  });

  return (
    <Card className="w-full rounded-sm  shadow-none">
      <CardHeader>
        <CardTitle>Address </CardTitle>
        <CardDescription>
          Give a you full address here or update.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={`address-form-${type}`}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="address"
              children={(field) => (
                <field.TextareaField
                  label="Full address"
                  placeHolder="Enter a full category name."
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.AppForm>
          <form.SubscribeButton formId={`address-form-${type}`} type={type} />
        </form.AppForm>
      </CardFooter>
    </Card>
  );
}
