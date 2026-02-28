"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useState, useTransition } from "react";
import { getProductDetails } from "../../server/product-details";
import { addToCart } from "../../server/carts";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function ProductDetailInfo({
  product,
}: {
  product: Awaited<ReturnType<typeof getProductDetails>>;
}) {
  const [count, setCount] = useState(1);
  const [isPending, startTransition] = useTransition();
  const qc = useQueryClient();
  return (
    <div className=" px-4 py-4 lg:py-0 lg:px-5 space-y-5">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <h2 className="text-3xl font-black">{5} $</h2>
      <QuantityPicker count={count} setCount={setCount} />
      <div className="flex gap-2">
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await addToCart({
                price: 5,
                productId: product.id,
                quantity: count,
              });
              await qc.invalidateQueries({ queryKey: ["cart"] });
              toast.info("Product added to cart");
            });
          }}
        >
          Add to cart
        </Button>
        <Button variant={"secondary"}>Buy now</Button>
      </div>
    </div>
  );
}

export function QuantityPicker({
  count,
  setCount,
}: {
  count: number;
  setCount: (count: number) => void;
}) {
  return (
    <div className="flex items-center space-x-1 rounded-sm border bg-background p-1 w-fit">
      {/* Decrease Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setCount(Math.max(1, count - 1))}
        disabled={count === 1}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>

      {/* Number Display */}
      <div className="flex w-10 items-center justify-center">
        <span className="text-sm font-medium tabular-nums">{count}</span>
      </div>

      {/* Increase Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
}
