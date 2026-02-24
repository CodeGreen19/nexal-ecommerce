import { Button } from "@/components/ui/button";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import { ProductForm } from "../components/product-form";

export function AddNewProductPage() {
  return (
    <div className="space-y-3">
      <Header />
      <ProductForm type="add" />
    </div>
  );
}

function Header() {
  return (
    <Top>
      <TopTitle backToUrl="/admin/catalog/products">Add new product</TopTitle>
    </Top>
  );
}
