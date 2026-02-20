"use server";

import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { categorySchema, CategorySchemaType } from "./schemas";

export async function createCategory({ value }: { value: CategorySchemaType }) {
  const { success, data } = categorySchema.safeParse(value);
  if (!success) {
    return { error: "Invalid data !" };
  }
  await db.insert(categories).values(data);
  revalidateTag("categories", "max");
  return { message: "New category added" };
}

//---------------------------------update product----------------------------------//
export async function updateCategory({
  value,
  categoryId,
}: {
  value: CategorySchemaType;
  categoryId: string;
}) {
  const { success, data } = categorySchema.safeParse(value);
  if (!success) {
    return { error: "Invalid data !" };
  }
  await db.update(categories).set(data).where(eq(categories.id, categoryId));
  revalidateTag("categories", "max");
  return { message: "Updated category added" };
}
//---------------------------------delete product----------------------------------//
export async function deleteCategory({ categoryId }: { categoryId: string }) {
  await db.delete(categories).where(eq(categories.id, categoryId));
  revalidateTag("categories", "max");
  return { message: " Category deleted" };
}
