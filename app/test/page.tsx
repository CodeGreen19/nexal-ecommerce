"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldGroup } from "@/components/ui/field";

import { useAppForm } from "@/components/form/form-context";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { productSchema } from "@/feature/admin/catalog/products/schemas";
import React, { useState } from "react";
import { z } from "zod";
import { PenIcon, TrashIcon } from "@phosphor-icons/react";
import { useStore } from "@tanstack/react-form";
import { HexColorPicker } from "react-colorful";

const schema = z.object({ productOptions: productSchema.shape.productOptions });
type schemaType = z.infer<typeof schema>;

export default function ProductOptionForm() {
  const [open, setOpen] = useState(false);
  const [optionOpenIndex, setOptonOpenIndex] = useState<number>(-1);
  const [optionType, setOptionType] = useState<"List" | "Color">("List");
  const defaultValues: schemaType = {
    productOptions: [],
  };

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      setOpen(false);
    },
  });

  const addEmptyField = () => {
    form.setFieldValue("productOptions", [
      ...form.state.values.productOptions,
      { name: "", optionValues: [] },
    ]);
    const lastIndex = form.getFieldValue("productOptions").length - 1;
    setOptonOpenIndex(lastIndex);
  };

  const removeEmptyField = () => {
    form.setFieldValue("productOptions", [
      ...form.state.values.productOptions.filter((v) => v.name !== ""),
    ]);
    setOptonOpenIndex(-1);
  };

  const formStore = useStore(form.store, (store) => store.values);
  return (
    <div>
      <ShowProductOptions
        data={{ productOptions: formStore.productOptions }}
        onDelete={(name) => {
          const newValues = form.state.values.productOptions.filter(
            (item) => item.name !== name,
          );

          form.setFieldValue("productOptions", newValues);
        }}
        onEdit={(valueIndex) => {
          setOptonOpenIndex(valueIndex);
          setOpen(true);
        }}
      />
      <form
        id={`product-options-form`}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div>
          <Dialog
            open={open}
            onOpenChange={(v) => {
              if (v) {
                addEmptyField();
              } else {
                removeEmptyField();
              }
              setOpen(v);
            }}
          >
            <DialogTrigger render={<Button>Add Options</Button>} />
            <DialogContent className={"md:min-w-150"}>
              <DialogHeader>
                <DialogTitle>Add Options</DialogTitle>
                <DialogDescription>
                  You'll be able to manage pricing and inventory for this
                  product option later on
                </DialogDescription>
              </DialogHeader>
              <div>
                <FieldGroup>
                  <form.AppField
                    name="productOptions"
                    mode="array"
                    children={() => {
                      if (optionOpenIndex === -1) {
                        return null;
                      }
                      return (
                        <form.AppField
                          name={`productOptions[${optionOpenIndex}].name`}
                          children={(subField) => (
                            <subField.TextField
                              label="Option Name"
                              placeHolder="Enter a option name"
                            />
                          )}
                        />
                      );
                    }}
                  />

                  <FieldGroup className="flex flex-col md:flex-row">
                    <Field className="flex-1">
                      <Label>Option type</Label>
                      <Select
                        value={optionType}
                        onValueChange={(v) =>
                          setOptionType(v as "List" | "Color")
                        }
                      >
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
                          <SelectItem value={"List"}>List</SelectItem>
                          <SelectItem value={"Color"}>Color</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <form.AppField
                      name="productOptions"
                      mode="array"
                      children={() => {
                        if (optionOpenIndex === -1) {
                          return null;
                        }
                        return (
                          <form.AppField
                            name={`productOptions[${optionOpenIndex}].optionValues`}
                            children={(subField) => (
                              <Field>
                                <Label>Option values</Label>
                                <ProductOptionVariantMultiselect
                                  value={
                                    formStore.productOptions[optionOpenIndex]
                                      .optionValues
                                  }
                                  setValue={(v) => {
                                    subField.setValue(v);
                                  }}
                                  optionType={optionType}
                                />
                              </Field>
                            )}
                          />
                        );
                      }}
                    />
                  </FieldGroup>
                </FieldGroup>
              </div>
              <DialogFooter className=" flex-row justify-end">
                <DialogClose
                  render={<Button variant={"secondary"}>Cancel</Button>}
                />
                <form.AppForm>
                  <form.SubscribeButton
                    formId={`product-options-form`}
                    type="general"
                    buttonText="Apply"
                  />
                </form.AppForm>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
}

function ShowProductOptions({
  data,
  onDelete,
  onEdit,
}: {
  data: schemaType;
  onDelete: (name: string) => void;
  onEdit: (valueIndex: number) => void;
}) {
  return (
    <div>
      {data.productOptions.length !== 0 &&
        data.productOptions
          .filter((d) => d.name !== "")
          .map((proOpt, i) => (
            <div key={i} className="flex items-center justify-between p-3">
              <span>{proOpt.name}</span>
              <div className="space-x-2">
                <Button
                  onClick={() => onDelete(proOpt.name)}
                  variant={"destructive"}
                >
                  <TrashIcon />
                </Button>
                <Button onClick={() => onEdit(i)} variant={"secondary"}>
                  <PenIcon />
                </Button>
              </div>
            </div>
          ))}
    </div>
  );
}

const sizes = ["Small", "Mediam", "Large", "Extra large"];
const colors = ["Red;#FF0000", "Blue;#0000FF", "Purple;#800080"];
function ProductOptionVariantMultiselect({
  setValue,
  value,
  optionType,
}: {
  value: string[];
  setValue: (v: string[]) => void;
  optionType: "List" | "Color";
}) {
  const [inputValue, setInputValue] = React.useState("");
  const anchor = useComboboxAnchor();

  const addCustomValue = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) return;
    if (value.includes(trimmed)) return;

    setValue([...value, trimmed]);
    setInputValue("");
  };
  const definedValues = optionType === "Color" ? colors : sizes;
  return (
    <Combobox
      multiple
      value={value}
      onValueChange={setValue}
      items={[
        ...definedValues,
        ...value.filter((v) => !definedValues.includes(v)),
      ]}
      autoHighlight
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {value.map((v, i) => (
            <ComboboxChip key={v}>
              <ComboBoxChipCustomValue
                setEditValue={(newVal) => {
                  const newValues = value.map((oldV, oldIndex) =>
                    oldIndex === i ? `${oldV.split(";")[0]};${newVal}` : oldV,
                  );
                  setValue(newValues);
                }}
                type={optionType}
                value={v}
              />
            </ComboboxChip>
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
          !definedValues.find((s) =>
            s.toLowerCase().startsWith(inputValue.trim()),
          ) &&
          !value.find((v) => v.toLowerCase().startsWith(inputValue.trim())) && (
            <div
              onClick={addCustomValue}
              className="text-primary cursor-pointer text-sm p-3"
            >
              Add "{inputValue}"
            </div>
          )}
        <Separator />
        {definedValues.length > value.length && (
          <div
            onClick={() => setValue(definedValues)}
            className="text-primary cursor-pointer text-sm p-3"
          >
            Add all
          </div>
        )}
      </ComboboxContent>
    </Combobox>
  );
}

function ComboBoxChipCustomValue({
  type,
  value,
  setEditValue,
}: {
  type: "List" | "Color";
  value: string;
  setEditValue: (v: string) => void;
}) {
  //hex color code
  const [name, colorCode] = value.split(";");
  return (
    <span className="flex gap-1 items-center">
      {name}
      {type === "Color" && (
        <Popover>
          <PopoverTrigger
            render={
              <Button
                style={{ backgroundColor: colorCode }}
                className={"size-4 rounded-full"}
              ></Button>
            }
          />

          <PopoverContent className={"w-auto px-6"}>
            <PopoverHeader>
              <PopoverTitle>Select Color</PopoverTitle>
              <PopoverDescription>
                Adapt as you like you color to be
              </PopoverDescription>
            </PopoverHeader>
            <HexColorPicker color={colorCode} onChange={setEditValue} />
          </PopoverContent>
        </Popover>
      )}
    </span>
  );
}
