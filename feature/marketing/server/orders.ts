"use server";

import { db } from "@/drizzle/db";
import {
  carts,
  orderAddresses,
  orderItems,
  orders,
  payments,
  productInventory,
  userAddress,
} from "@/drizzle/schema";
import { getUserId } from "@/lib/dal";
import { eq } from "drizzle-orm";

export async function createOrder({
  provider,
  shippingCost,
}: {
  provider: string;
  shippingCost: number;
}) {
  const id = await getUserId();
  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, id),
    with: {
      cartItems: {
        with: {
          productVariant: { with: { product: { columns: { name: true } } } },
        },
      },
    },
  });
  if (!cart) {
    throw new Error("Cart doesn't exists");
  }

  const subtotal = cart.cartItems.reduce(
    (prev, curr) => prev + curr.quantity * curr.productVariant.price,
    0,
  );

  const [newOrder] = await db
    .insert(orders)
    .values({
      status: "pending",
      userId: id,
      shippingCost,
      subtotal,
      totalAmount: subtotal,
    })
    .returning();

  const orderItemsValue: (typeof orderItems.$inferInsert)[] =
    cart.cartItems.map((c) => ({
      orderId: newOrder.id,
      price: c.productVariant.price,
      productName: c.productVariant.product.name,
      productVariantId: c.productVariant.id,
      quantity: c.quantity,
      sku: c.productVariant.sku,
      totalPrice: c.productVariant.price * c.quantity,
    }));
  await db.insert(orderItems).values(orderItemsValue);

  const currentAddress = await db.query.userAddress.findFirst({
    where: eq(userAddress.userId, id),
  });

  if (!currentAddress) {
    throw new Error("current address not available");
  }
  await db.insert(orderAddresses).values({
    address: currentAddress.address,
    fullName: "Abdul Karim",
    orderId: newOrder.id,
    phone: "000xxxxx888",
  });

  await db.insert(payments).values({
    amount: subtotal,
    orderId: newOrder.id,
    provider,
    status: "success",
  });

  // update stock

  for (const item of cart.cartItems) {
    const res = await db.query.productInventory.findFirst({
      where: eq(productInventory.variantId, item.productVariantId),
    });
    if (!res) {
      throw new Error("inventory not exists");
    }
    await db
      .update(productInventory)
      .set({ quantity: res.quantity - item.quantity });
  }

  // clean ups

  await db.delete(carts).where(eq(carts.id, cart.id));

  return { message: "order successfull" };
}

export async function getOrders() {
  const id = await getUserId();
  const res = await db.query.orders.findMany({
    where: eq(orders.userId, id),
    with: { items: true, address: true, payments: true },
  });
  return { orders: res };
}

//===================== helpers =================//
