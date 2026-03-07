"use client";

import { getOrders } from "@/feature/marketing/server/orders";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrderListings() {
  const { data, isPending } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getOrders,
  });

  if (isPending) return <div>Loading orders...</div>;

  if (!data?.orders?.length) return <div>No orders found</div>;

  return (
    <div className="space-y-6">
      {data.orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">
            Order #{order.id.slice(0, 8)}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Badge variant="secondary">{order.status}</Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        {order.items.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between text-sm border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.productName}</p>
              <p className="text-muted-foreground">
                {item.quantity} × ${item.price}
              </p>
            </div>

            <p className="font-medium">${item.totalPrice}</p>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-between text-sm">
        <div className="space-y-1 text-muted-foreground">
          <p>Subtotal: ${order.subtotal}</p>
          <p>Shipping: ${order.shippingCost}</p>
          <p>Discount: ${order.discount}</p>
        </div>

        <p className="font-semibold text-base">Total: ${order.totalAmount}</p>
      </CardFooter>
    </Card>
  );
}
