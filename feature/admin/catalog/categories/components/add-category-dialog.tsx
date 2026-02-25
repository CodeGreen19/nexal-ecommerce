"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useState } from "react";
import { CategoryForm } from "./category-form";

export function AddCategoryDialog({
  children,
}: {
  children: ReactElement<typeof Button>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent>
        <CategoryForm type="add" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
