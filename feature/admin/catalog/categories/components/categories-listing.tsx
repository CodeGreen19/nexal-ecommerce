"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { showToast } from "@/helpers/ui/show-toast";
import { CloudWarningIcon, PenIcon, TrashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { use, useState, useTransition } from "react";
import { deleteCategory } from "../actions";
import { CategoryType } from "../types";
import { CategoryForm } from "./category-form";
import { AddCategoryDialog } from "./add-category-dialog";

export function CategoriesListing({
  categories,
}: {
  categories: Promise<CategoryType[]>;
}) {
  const allCategories = use(categories);

  return (
    <div>
      {allCategories.length === 0 ? (
        <EmptyCategory />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-2">
          {allCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <Card className="aspect-square min-h-32">
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <CardAction className="flex gap-1">
          <DeleteCategoryDialog categoryId={category.id} />
          <UpdateCategoryDialog category={category} />
        </CardAction>
      </CardFooter>
    </Card>
  );
}

function UpdateCategoryDialog({ category }: { category: CategoryType }) {
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

type Props = {
  categoryId: string;
  categoryName?: string;
};

function DeleteCategoryDialog({ categoryId, categoryName }: Props) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCategory({ categoryId });
      showToast(res);
      router.refresh();
    });
  };

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
          <DialogTrigger>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>

          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EmptyCategory() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <CloudWarningIcon />
        </EmptyMedia>
        <EmptyTitle>No Categories</EmptyTitle>
        <EmptyDescription>Add your first category</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddCategoryDialog>
          <Button>Add First Category</Button>
        </AddCategoryDialog>
      </EmptyContent>
    </Empty>
  );
}
