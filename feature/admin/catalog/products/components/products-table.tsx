"use client";

import { DataTable } from "@/feature/admin/shared-components/table/data-table";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PenIcon, TrashIcon } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { use, useState, useTransition } from "react";
import { ProductType } from "../types";
import { UpdateProductForm } from "./update-product-form";
import { deleteProduct } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
        <div className="flex items-center gap-2">
          <UpdateButton info={row.original} />
          <DeleteButton productId={row.original.id} />
        </div>
      ),
    },
  ];

  return (
    <div>
      {allProducts.length === 0 ? (
        <div>No Products</div>
      ) : (
        <DataTable columns={columns} data={allProducts} />
      )}
    </div>
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
          <UpdateProductForm
            info={info}
            onSuccess={() => {
              setOpen(false);
              router.refresh();
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
            toast.success(res.message);
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
