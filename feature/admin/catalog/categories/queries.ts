"use cache";

import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { waitInSecond } from "@/lib/utils";
import { asc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

export async function getCategories() {
  cacheTag("categories");
  cacheLife("max");
  console.log("server triggered, cat");

  await waitInSecond();
  return await db.select().from(categories).orderBy(asc(categories.createdAt));
}
