import { Button } from "@/components/ui/button";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import Link from "next/link";

export function ProductsHeader() {
  return (
    <Top>
      <TopTitle>Products</TopTitle>
      <TopActions>
        <Link href={"/admin/catalog/products/add-new"}>
          <Button>Add product</Button>
        </Link>
      </TopActions>
    </Top>
  );
}
