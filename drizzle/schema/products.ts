import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export const products = pgTable("products", {
  id,
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull().default(0),
  createdAt,
  updatedAt,
});
