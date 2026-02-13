import { Button } from "@/components/ui/button";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import { AddProductForm } from "../components/add-product-form";

export function AddNewProductPage() {
  return (
    <div className="space-y-3">
      <Header />
      <AddProductForm />
    </div>
  );
}

function Header() {
  return (
    <Top>
      <TopTitle backToUrl="/admin/catalog/products">Add new product</TopTitle>
      <TopActions>
        <Button variant={"secondary"}>Save draft</Button>
        <Button>Publish</Button>
      </TopActions>
    </Top>
  );
}
