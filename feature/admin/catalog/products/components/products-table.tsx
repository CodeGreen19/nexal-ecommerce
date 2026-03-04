"use client";

import { DataTable } from "@/feature/admin/shared-components/table/data-table";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CloudWarningIcon, PenIcon } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { use } from "react";
import { ProductType } from "../types";
import { DeleteProductDialog } from "./delete-product-dialog";
import { useRouter } from "next/navigation";

export function ProductTable({
  products,
}: {
  products: Promise<ProductType[]>;
}) {
  const allProducts = use(products);
  const router = useRouter();

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      header: "Price",
      cell: ({ row }) => <div>{row.original.variants[0].price}</div>,
    },
    {
      header: "Inventory",
      cell: ({ row }) => (
        <div>{row.original.variants[0].inventory?.quantity}</div>
      ),
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center place-self-end  w-fit gap-2">
          <Button
            variant={"secondary"}
            onClick={() =>
              router.push(`/admin/catalog/products/${row.original.id}/edit`)
            }
          >
            <PenIcon />
          </Button>
          <DeleteProductDialog
            id={row.original.id}
            productName={row.original.name}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {allProducts.length === 0 ? (
        <EmptyProduct />
      ) : (
        <DataTable columns={columns} data={allProducts} />
      )}
    </div>
  );
}

function EmptyProduct() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <CloudWarningIcon />
        </EmptyMedia>
        <EmptyTitle>No Products</EmptyTitle>
        <EmptyDescription>Add your first product now.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href={"/admin/catalog/products/add-new"}>
          <Button>Add First Product</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
