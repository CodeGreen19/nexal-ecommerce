import { FilterOptionsBox } from "../components/products/filter-options-box";
import ProductListings from "../components/products/product-listings";
import { ProductsPageHeading } from "../components/products/product-page-heading";

export function ProductsPage() {
  return (
    <div className="p-4 xl:px-0">
      <ProductsPageHeading />
      <div className="flex items-start gap-2">
        <span className="hidden lg:block">
          <FilterOptionsBox />
        </span>
        <ProductListings />
      </div>
    </div>
  );
}
