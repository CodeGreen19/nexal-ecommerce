"use server";

import { db } from "@/drizzle/db";
import { addProductSchema, AddProductSchemaType } from "./schemas";
import { products } from "@/drizzle/schema";

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
  return { message: "New proudct added" };
}
