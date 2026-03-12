"use client";

import { withForm } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import {
  emptydefaultValues,
  productSchema,
  ProductSchemaType,
} from "../schemas";

const sizes = ["Small", "Mediam", "Large", "Extra large"];

export const ChildFormForProductOptions = withForm({
  defaultValues: emptydefaultValues satisfies ProductSchemaType,
  render: function Render({ form }) {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
          }}
        >
          <DialogTrigger render={<Button>Add Options</Button>} />
          <DialogContent className={"md:min-w-150"}>
            <DialogHeader>
              <DialogTitle>Add Options</DialogTitle>
              <DialogDescription>
                You'll be able to manage pricing and inventory for this product
                option later on
              </DialogDescription>
            </DialogHeader>
            <div>
              <FieldGroup>
                <form.AppField
                  name="productOptions"
                  mode="array"
                  validators={{
                    onChange: productSchema.shape.productOptions,
                  }}
                  children={(field) => (
                    <>
                      {field.state.value.map((_, i) => (
                        <form.AppField
                          key={i}
                          name={`productOptions[${i}].name`}
                          children={(subField) => (
                            <subField.TextField
                              label="Option Name"
                              placeHolder="Enter a option name"
                            />
                          )}
                        />
                      ))}
                    </>
                  )}
                />

                <FieldGroup className="flex flex-col md:flex-row">
                  <Field className="flex-1">
                    <Label>Option type</Label>
                    <Select defaultValue={"list"}>
                      <SelectTrigger>
                        <SelectValue
                          className={"md:w-22"}
                          placeholder={"Select type"}
                        />
                      </SelectTrigger>
                      <SelectContent
                        alignItemWithTrigger={false}
                        className={"md:w-22!"}
                      >
                        <SelectItem value={"list"}>List</SelectItem>
                        <SelectItem value={"color"}>Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <Label>Option values</Label>
                    <ProductOptionVariantMultiselect />
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </div>
            <DialogFooter className=" flex-row justify-end">
              <DialogClose
                render={<Button variant={"secondary"}>Cancel</Button>}
              />
              <Button>Apply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div>
          <form.AppField
            name="productOptions"
            mode="array"
            children={(field) =>
              field.state.value.map((v, i) => <div key={i}>{v.name}</div>)
            }
          />
        </div>
        <ShowProductOptions />
      </div>
    );
  },
});

function ShowProductOptions() {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nesciunt
      saepe reprehenderit voluptatem cupiditate minus deleniti quos. Nihil
      corrupti totam labore aliquam magnam. Atque aperiam, deserunt quae
      distinctio repudiandae ea.
    </div>
  );
}

function ProductOptionVariantMultiselect() {
  const [value, setValue] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const anchor = useComboboxAnchor();

  const addCustomValue = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) return;
    if (value.includes(trimmed)) return;

    setValue((prev) => [...prev, trimmed]);
    setInputValue("");
  };
  return (
    <Combobox
      multiple
      value={value}
      onValueChange={setValue}
      items={[...sizes, ...value.filter((v) => !sizes.includes(v))]}
      autoHighlight
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add values"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomValue();
              setInputValue("");
            }
          }}
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
        {inputValue &&
          !sizes.find((s) => s.toLowerCase().startsWith(inputValue.trim())) &&
          !value.find((v) => v.toLowerCase().startsWith(inputValue.trim())) && (
            <div
              onClick={addCustomValue}
              className="text-primary cursor-pointer text-sm p-3"
            >
              Add "{inputValue}"
            </div>
          )}
        <Separator />
        {sizes.length > value.length && (
          <div
            onClick={() => setValue(sizes)}
            className="text-primary cursor-pointer text-sm p-3"
          >
            Add all
          </div>
        )}
      </ComboboxContent>
    </Combobox>
  );
}
