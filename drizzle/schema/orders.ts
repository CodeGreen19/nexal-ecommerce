import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { productVariants } from "./products";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const orders = pgTable("orders", {
  id,
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  status: text("status").notNull(),
  subtotal: integer("subtotal").notNull(),
  totalAmount: integer("total_amount").notNull(),
  discount: integer("discount").notNull().default(0),
  shippingCost: integer("shipping_cost").notNull().default(0),
  createdAt,
  updatedAt,
});

export const orderItems = pgTable("order_items", {
  id,
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productVariantId: uuid("product_variant_id")
    .notNull()
    .references(() => productVariants.id),
  productName: varchar("product_name").notNull(),
  sku: varchar("sku").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  totalPrice: integer("total_price").notNull(),
});

export const orderAddresses = pgTable("order_addresses", {
  id,
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address").notNull(),
});

export const payments = pgTable("payments", {
  id,
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  provider: varchar("provider", { length: 50 }).notNull(),
  transactionId: varchar("transaction_id", { length: 255 }),
  amount: integer("amount").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt,
});

// .....................relations ..........................

export const ordersRelations = relations(orders, ({ many, one }) => ({
  items: many(orderItems),
  address: one(orderAddresses),
  payments: many(payments),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
export const orderAddressesRelations = relations(orderAddresses, ({ one }) => ({
  order: one(orders, {
    fields: [orderAddresses.orderId],
    references: [orders.id],
  }),
}));
export const orderPaymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));
