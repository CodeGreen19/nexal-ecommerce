import { DataTableSkeleton } from "@/feature/admin/shared-components/table/data-table-skeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductsHeader } from "../components/products-header";
import { ProductTable } from "../components/products-table";
import { getProducts } from "../queries";

export function ProductsPage() {
  return (
    <div className="space-y-3">
      <ProductsHeader />
      <Products />
    </div>
  );
}

export function Products() {
  const products = getProducts();
  return (
    <div>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<DataTableSkeleton column={2} />}>
          <ProductTable products={products} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
