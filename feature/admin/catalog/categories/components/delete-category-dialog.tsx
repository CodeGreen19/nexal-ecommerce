"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showToast } from "@/helpers/ui/show-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteCategory } from "../actions";
import { useState } from "react";
import { TrashIcon } from "@phosphor-icons/react";

type Props = {
  id: string;
  categoryName?: string;
};

export function DeleteCategoryDialog({ id, categoryName }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      showToast(res);
      setOpen(false);
      router.refresh();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={"destructive"}>
            <TrashIcon />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>

          <DialogDescription className="space-y-2 pt-2">
            Are you sure you want to delete this category
            {categoryName && (
              <span className="font-semibold"> “{categoryName}”</span>
            )}
            ?
            <span className="text-sm text-muted-foreground">
              This action cannot be undone. All related data may be affected
              depending on your system configuration.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:justify-end">
          <DialogTrigger render={<Button variant="outline">Cancel</Button>} />

          <Button
            variant="destructive"
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate({ categoryId: id })}
          >
            {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
