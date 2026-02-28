import { Top, TopTitle } from "@/feature/admin/shared-components/top";
import { ProductForm } from "../components/product-form";

export function AddNewProductPage() {
  return (
    <div className="space-y-3">
      <NewProductHeader />
      <ProductForm type="add" />
    </div>
  );
}

function NewProductHeader() {
  return (
    <Top>
      <TopTitle backToUrl="/admin/catalog/products">Add new product</TopTitle>
    </Top>
  );
}
