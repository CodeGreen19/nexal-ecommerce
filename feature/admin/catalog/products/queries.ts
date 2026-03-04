import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

export async function getProducts() {
  "use cache";
  cacheTag("products");
  cacheLife("max");
  return await db.query.products.findMany({
    columns: { id: true, name: true },
    with: {
      variants: {
        with: { inventory: { columns: { quantity: true } } },
        columns: { price: true },
      },
    },
  });
}
export async function getSingleProducts({ productId }: { productId: string }) {
  return await db.query.products.findFirst({
    with: {
      variants: {
        with: { inventory: true },
      },
    },
    where: eq(products.id, productId),
  });
}
