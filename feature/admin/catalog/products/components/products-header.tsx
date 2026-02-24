"use client";

import { Button } from "@/components/ui/button";
import {
  Top,
  TopActions,
  TopTitle,
} from "@/feature/admin/shared-components/top";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function ProductsHeader() {
  const canAddProduct = authClient.admin.checkRolePermission({
    role: "manager",
    permission: {
      product: ["create"],
    },
  });
  return (
    <Top>
      <TopTitle>Products</TopTitle>
      <TopActions>
        {canAddProduct && (
          <Link href={"/admin/catalog/products/add-new"}>
            <Button>Add product</Button>
          </Link>
        )}
      </TopActions>
    </Top>
  );
}
