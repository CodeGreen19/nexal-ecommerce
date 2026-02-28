"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryType } from "../types";
import { PenIcon } from "@phosphor-icons/react";
import { CategoryForm } from "./category-form";

export function UpdateCategoryDialog({ category }: { category: CategoryType }) {
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
        <DialogContent className={"p-1"}>
          <CategoryForm
            type="update"
            existedValues={category}
            onSuccess={() => {
              setOpen(false);
              router.refresh();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
