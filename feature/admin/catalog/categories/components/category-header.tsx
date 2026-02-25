"use client";
import { Button } from "@/components/ui/button";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import { AddCategoryDialog } from "./add-category-dialog";

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
