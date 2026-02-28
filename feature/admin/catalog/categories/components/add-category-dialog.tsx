"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useState } from "react";
import { CategoryForm } from "./category-form";
import { useRouter } from "next/navigation";

export function AddCategoryDialog({
  children,
}: {
  children: ReactElement<typeof Button>;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className={"p-1"}>
        <CategoryForm
          type="add"
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
