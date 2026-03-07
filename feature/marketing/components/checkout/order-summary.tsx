"use client";

import { useQuery } from "@tanstack/react-query";
import { orderSummery } from "../../server/checkout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OrderSummery() {
  const { isPending, error, data } = useQuery({
    queryKey: ["orderItems"],
    queryFn: orderSummery,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  const total = data.reduce(
    (sum, item) => sum + item.quantity * item.productVariant.price,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {data.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}

        <div className="border-t pt-3 flex justify-between font-medium">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderItem({ item }: { item: any }) {
  const price = item.quantity * item.productVariant.price;

  return (
    <div className="flex justify-between text-sm">
      <div>
        <p className="font-medium">{item.productVariant.product.name}</p>

        <p className="text-muted-foreground">
          {item.productVariant.color ?? ""} {item.productVariant.size ?? ""} ×{" "}
          {item.quantity}
        </p>
      </div>

      <p>${price}</p>
    </div>
  );
}
