import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export const categories = pgTable("categories", {
  id,
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt,
  updatedAt,
});
