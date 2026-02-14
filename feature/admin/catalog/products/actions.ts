"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { addProductSchema, AddProductSchemaType } from "./schemas";

export async function createProduct({
  value,
}: {
  value: AddProductSchemaType;
}) {
  const { success, data } = addProductSchema.safeParse(value);
  if (!success) {
    return { error: "Invalid data !" };
  }
  await db.insert(products).values(data);
  revalidateTag("products", "max");
  return { message: "New proudct added" };
}

//---------------------------------update product----------------------------------//
export async function updateProduct({
  value,
  productId,
}: {
  value: AddProductSchemaType;
  productId: string;
}) {
  const { success, data } = addProductSchema.safeParse(value);
  if (!success) {
    return { error: "Invalid data !" };
  }
  await db.update(products).set(data).where(eq(products.id, productId));
  revalidateTag("products", "max");
  return { message: "Updated proudct added" };
}
//---------------------------------delete product----------------------------------//
export async function deleteProduct({ productId }: { productId: string }) {
  await db.delete(products).where(eq(products.id, productId));
  revalidateTag("products", "max");
  return { message: " Proudct deleted" };
}
