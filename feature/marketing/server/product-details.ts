"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getProductDetails(id: string) {
  const [product] = await db.select().from(products).where(eq(products.id, id));
  return product;
}
