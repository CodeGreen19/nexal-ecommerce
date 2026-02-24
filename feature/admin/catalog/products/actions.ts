"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import {
  customError,
  customSuccess,
  MutationResult,
} from "@/helpers/db/return";
import { generateUniqueSlug } from "@/helpers/db/unique-slug";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { productSchema, ProductSchemaType } from "./schemas";

export async function addProduct({
  value,
}: {
  value: ProductSchemaType;
}): Promise<MutationResult> {
  const { success, data } = productSchema.safeParse(value);
  if (!success) {
    return customError();
  }
  const slug = await generateUniqueSlug(products.slug, data.name);
  await db.insert(products).values({ ...data, slug });
  revalidateTag("products", "max");
  return customSuccess();
}

// -------------------------------------------------------------//
export async function updateProduct({
  value,
  productId,
}: {
  value: ProductSchemaType;
  productId: string;
}): Promise<MutationResult> {
  const { success, data } = productSchema.safeParse(value);
  if (!success) {
    return customError("Invalid Data");
  }

  // update slug
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));

  if (!product) {
    return customError("product not found");
  }

  let slug = undefined;
  if (product.name !== data.name) {
    const newSlug = await generateUniqueSlug(products.slug, data.name);
    slug = newSlug;
  }

  await db
    .update(products)
    .set({ ...data, slug })
    .where(eq(products.id, productId));
  revalidateTag("products", "max");
  return customSuccess("Product Updated");
}
//-------------------------------------------------------------//
export async function deleteProduct({
  productId,
}: {
  productId: string;
}): Promise<MutationResult> {
  await db.delete(products).where(eq(products.id, productId));
  revalidateTag("products", "max");
  return customSuccess(" Proudct deleted");
}
