"use client";

import { DataTable } from "@/feature/admin/shared-components/table/data-table";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { showToast } from "@/helpers/ui/show-toast";
import { CloudWarningIcon, PenIcon, TrashIcon } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState, useTransition } from "react";
import { deleteProduct } from "../actions";
import { ProductType } from "../types";
import { ProductForm } from "./product-form";

export function ProductTable({
  products,
}: {
  products: Promise<ProductType[]>;
}) {
  const allProducts = use(products);
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Descriptions",
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center place-self-end  w-fit gap-2">
          <UpdateButton info={row.original} />
          <DeleteButton productId={row.original.id} />
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

function UpdateButton({ info }: { info: ProductType }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button variant={"secondary"}>
              <PenIcon />
            </Button>
          }
        />
        <DialogContent>
          <ProductForm
            type="update"
            existedValues={info}
            onSuccess={() => {
              router.refresh();
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
function DeleteButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await deleteProduct({ productId });
            showToast(res);
            router.refresh();
          });
        }}
        variant={"destructive"}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}
