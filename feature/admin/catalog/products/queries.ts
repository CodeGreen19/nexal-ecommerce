"use cache";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { waitInSecond } from "@/lib/utils";
import { asc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

export async function getProducts() {
  cacheTag("products");
  cacheLife("max");
  console.log("server triggered");

  await waitInSecond();
  return await db.select().from(products).orderBy(asc(products.createdAt));
}
