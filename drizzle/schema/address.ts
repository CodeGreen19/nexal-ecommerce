import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const userAddress = pgTable("user_address", {
  id,
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  address: text("address").notNull(),
  createdAt,
  updatedAt,
});

export const userAddressRelations = relations(userAddress, ({ one }) => ({
  user: one(user, {
    fields: [userAddress.userId],
    references: [user.id],
  }),
}));
