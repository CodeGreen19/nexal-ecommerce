"use server";

import { db } from "@/drizzle/db";
import { carts } from "@/drizzle/schema";
import { getUserId } from "@/lib/dal";
import { eq } from "drizzle-orm";

export async function orderSummery() {
  const id = await getUserId();
  const res = await db.query.carts.findFirst({
    where: eq(carts.userId, id),
    with: {
      cartItems: {
        with: {
          productVariant: { with: { product: { columns: { name: true } } } },
        },
      },
    },
  });
  if (!res) {
    throw new Error("Cart not found");
  }
  return res.cartItems;
}
