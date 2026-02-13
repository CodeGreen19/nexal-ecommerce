import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt, id } from "../helpers";

export const products = pgTable("products", {
  id,
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
});
