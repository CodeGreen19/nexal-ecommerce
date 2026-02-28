"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CloudWarningIcon } from "@phosphor-icons/react";
import { use } from "react";
import { CategoryType } from "../types";
import { AddCategoryDialog } from "./add-category-dialog";
import { DeleteCategoryDialog } from "./delete-category-dialog";
import { UpdateCategoryDialog } from "./update-category-dialog";

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
    <Card className="min-h-32">
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <CardAction className="flex gap-1">
          <DeleteCategoryDialog {...category} />
          <UpdateCategoryDialog category={category} />
        </CardAction>
      </CardFooter>
    </Card>
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
