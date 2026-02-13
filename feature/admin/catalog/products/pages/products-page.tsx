import { ProductsHeader } from "../components/products-header";
import { ProductsTable } from "../components/products-table";

export function ProductsPage() {
  return (
    <div className="space-y-3">
      <ProductsHeader />
      <ProductsTable />
    </div>
  );
}
