import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { productVariants } from "./products";

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
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),
  productVariantId: uuid("product_variant_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
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
  productVariant: one(productVariants, {
    fields: [cartItems.productVariantId],
    references: [productVariants.id],
  }),
}));
