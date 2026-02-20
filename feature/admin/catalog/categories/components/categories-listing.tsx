"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PenIcon, TrashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { use, useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteCategory } from "../actions";
import { CategoryType } from "../types";
import { UpdateCategoryForm } from "./update-category-form";

export function CategoriesListing({
  categories,
}: {
  categories: Promise<CategoryType[]>;
}) {
  const allCategories = use(categories);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-2">
      {allCategories.length === 0 ? (
        <div className="aspect-square min-h-32">
          <h1 className="p-4 text-center">No Categories</h1>
        </div>
      ) : (
        allCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))
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
      <CardFooter>
        <CardAction className="flex gap-1">
          <UpdateButton category={category} />
          <DeleteButton categoryId={category.id} />
        </CardAction>
      </CardFooter>
    </Card>
  );
}

function UpdateButton({ category }: { category: CategoryType }) {
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
          <UpdateCategoryForm
            category={category}
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
function DeleteButton({ categoryId }: { categoryId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await deleteCategory({ categoryId });
            toast.success(res.message);
            router.refresh();
          });
        }}
        variant={"destructive"}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}
