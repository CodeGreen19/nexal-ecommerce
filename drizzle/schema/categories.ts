import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export const categories = pgTable("categories", {
  id,
  name: varchar({ length: 255 }).notNull(),
  createdAt,
  updatedAt,
});
