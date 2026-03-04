"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
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
import { Separator } from "@/components/ui/separator";

const sizes = ["Small", "Mediam", "Large", "Extra large"];

export function ProductOptionsDialog() {
  return (
    <Dialog>
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
            <Field>
              <Label>Variant name</Label>
              <Input placeholder="Enter a varient name" />
            </Field>
            <FieldGroup className="flex flex-col md:flex-row">
              <Field className="flex-1">
                <Label>Variant type</Label>
                <Select>
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
                <Label>Variant values</Label>
                <ProductOptionVariantMultiselect />
              </Field>
            </FieldGroup>
          </FieldGroup>
        </div>
        <DialogFooter className=" flex-row justify-end">
          <DialogClose render={<Button variant={"secondary"}>Cancel</Button>} />
          <Button>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
