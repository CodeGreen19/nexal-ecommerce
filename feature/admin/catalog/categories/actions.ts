"use server";

import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { categorySchema, CategorySchemaType } from "./schemas";
import {
  customError,
  customSuccess,
  MutationResult,
} from "@/helpers/db/return";
import { generateUniqueSlug } from "@/helpers/db/unique-slug";

export async function addCategory({
  value,
}: {
  value: CategorySchemaType;
}): Promise<MutationResult> {
  const { success, data } = categorySchema.safeParse(value);
  if (!success) {
    return customError("Invalid data !");
  }
  const slug = await generateUniqueSlug(categories.slug, data.name);
  await db.insert(categories).values({ ...data, slug });
  revalidateTag("categories", "max");
  return customSuccess("New category added");
}

//---------------------------------update product----------------------------------//
export async function updateCategory({
  value,
  categoryId,
}: {
  value: CategorySchemaType;
  categoryId: string;
}): Promise<MutationResult> {
  const { success, data } = categorySchema.safeParse(value);
  if (!success) {
    return customError("Invalid data !");
  }
  await db.update(categories).set(data).where(eq(categories.id, categoryId));
  revalidateTag("categories", "max");
  return customSuccess("Category name updated");
}
//---------------------------------delete product----------------------------------//
export async function deleteCategory({
  categoryId,
}: {
  categoryId: string;
}): Promise<MutationResult> {
  await db.delete(categories).where(eq(categories.id, categoryId));
  revalidateTag("categories", "max");
  return customSuccess("Category deleted");
}
