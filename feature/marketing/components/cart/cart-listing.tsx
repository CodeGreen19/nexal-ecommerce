"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  decreaseQuantity,
  getCart,
  increaseQuantity,
  removeFromCart,
} from "../../server/carts";
import { Button } from "@/components/ui/button";
import { CaretRightIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { SheetFooter } from "@/components/ui/sheet";
import { Fragment } from "react";

export function CartListing() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isLoading) {
    return <div className="px-4">Loading cart...</div>;
  }

  if (isError) {
    return <div className="px-4">Failed to load cart</div>;
  }

  if (!data || !data.items.cartItems.length) {
    return <div className="px-4">Your cart is empty</div>;
  }

  const totalPrice = data.items.cartItems.reduce(
    (prev, curr) => prev + curr.productVariant.price * curr.quantity,
    0,
  );
  return (
    <Fragment>
      <div className="px-4 space-y-4 max-h-[75vh] overflow-y-auto">
        {data.items.cartItems.map((item) => (
          <div key={item.id} className="border p-4 w-full rounded-lg space-y-2">
            <p>Name: {item.productVariant.product.name}</p>
            <p>Price: {item.productVariant.price}</p>
            <p>Quantity: {item.quantity}</p>

            <p>
              Total Price:{" "}
              {` ${item.quantity} * ${item.productVariant.price} = `}{" "}
              <Badge>{item.quantity * item.productVariant.price}</Badge>
            </p>

            <CartListingActions item={item} />
          </div>
        ))}
      </div>

      <SheetFooter className="flex-row justify-between">
        <h1 className="text-xl font-black">{totalPrice} $</h1>
        <Button>
          Procced <CaretRightIcon />
        </Button>
      </SheetFooter>
    </Fragment>
  );
}

function CartListingActions({
  item,
}: {
  item: NonNullable<
    Awaited<ReturnType<typeof getCart>>
  >["items"]["cartItems"][number];
}) {
  const qc = useQueryClient();
  const increase = useMutation({
    mutationFn: increaseQuantity,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const decrease = useMutation({
    mutationFn: decreaseQuantity,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const remove = useMutation({
    mutationFn: removeFromCart,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex items-center">
        <Button
          disabled={decrease.isPending}
          onClick={() => decrease.mutate(item.id)}
          variant={"secondary"}
        >
          <MinusIcon />
        </Button>
        <Button variant={"secondary"}>{item.quantity}</Button>
        <Button
          disabled={increase.isPending}
          onClick={() => increase.mutate(item.id)}
          variant={"secondary"}
        >
          <PlusIcon />
        </Button>
      </div>
      <Button
        disabled={remove.isPending}
        onClick={() => remove.mutate(item.id)}
      >
        Remove
      </Button>
    </div>
  );
}
