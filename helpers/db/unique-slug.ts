import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";
import "server-only";
import slugify from "slugify";

export async function generateUniqueSlug<TColumn extends PgColumn>(
  slugColumn: TColumn,
  name: string,
): Promise<string> {
  const baseSlug = slugify(name, { lower: true });
  const rows = await db
    .select({ slug: slugColumn })
    .from(slugColumn.table)
    .where(sql`${slugColumn} LIKE ${baseSlug + "%"}`);
  if (rows.length === 0) return baseSlug;

  const existedSlugs = new Set(rows.map((r) => r.slug as string));

  let slug = baseSlug;
  let counter = 1;

  while (existedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}
