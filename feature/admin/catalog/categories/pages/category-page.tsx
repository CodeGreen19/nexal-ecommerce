import { DataTableSkeleton } from "@/feature/admin/shared-components/table/data-table-skeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CategoriesListing } from "../components/categories-listing";
import { CategoryHeader } from "../components/category-header";
import { getCategories } from "../queries";

export function CategoriesPage() {
  return (
    <div className="space-y-3">
      <CategoryHeader />
      <Categories />
    </div>
  );
}

export function Categories() {
  const categories = getCategories();
  return (
    <div>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<DataTableSkeleton column={2} />}>
          <CategoriesListing categories={categories} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
