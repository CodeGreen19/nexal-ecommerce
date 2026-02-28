"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PenIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductType } from "../types";
import { ProductForm } from "./product-form";

export function UpdateProductDialog({ info }: { info: ProductType }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button variant={"secondary"}>
              <PenIcon />
            </Button>
          }
        />
        <DialogContent>
          <ProductForm
            type="update"
            existedValues={info}
            onSuccess={() => {
              router.refresh();
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
