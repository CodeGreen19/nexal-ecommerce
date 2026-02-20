"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import { ReactElement, useState } from "react";
import { AddCategoryForm } from "./add-category-form";

export function CategoryHeader() {
  return (
    <Top>
      <TopTitle>Categories</TopTitle>
      <TopActions>
        <AddCategoryDialog>
          <Button>Add Category</Button>
        </AddCategoryDialog>
      </TopActions>
    </Top>
  );
}

function AddCategoryDialog({
  children,
}: {
  children: ReactElement<typeof Button>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent>
        <AddCategoryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
