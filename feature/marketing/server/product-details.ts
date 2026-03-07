"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getProductDetails(id: string) {
  const product = await db.query.products.findFirst({
    with: { variants: { with: { inventory: true } } },
    where: eq(products.id, id),
  });
  if (!product) {
    throw new Error("Product Not found");
  }
  return product;
}
