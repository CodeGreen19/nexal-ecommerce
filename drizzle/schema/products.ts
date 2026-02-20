import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export const products = pgTable("products", {
  id,
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
});
