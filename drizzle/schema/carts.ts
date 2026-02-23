import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export const carts = pgTable("carts", {
  id,
  userId: text("user_id"),
  status: text("status").default("active"),
  createdAt,
  updatedAt,
});

export const cartItems = pgTable("cart_items", {
  id,
  cartId: uuid("cart_id")
    .references(() => carts.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  priceSnapshot: integer("price_snapshot").notNull(), // optional
  createdAt,
});

export const cartsRelations = relations(carts, ({ many }) => ({
  cartItems: many(cartItems),
}));
export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  carts: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
}));
