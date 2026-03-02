import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { relations } from "drizzle-orm";

export const products = pgTable("products", {
  id,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt,
  updatedAt,
});

export const productVariants = pgTable("product_variants", {
  id,
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  color: varchar("color", { length: 50 }),
  size: varchar("size", { length: 50 }),
  price: integer("price").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const productInventory = pgTable("product_inventory", {
  id,
  quantity: integer("quantity").notNull().default(0),
  reservedQty: integer("reserved_qty").notNull().default(0),
  variantId: uuid("varient_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
});

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    inventory: one(productInventory),
  }),
);

export const productInventoryRelations = relations(
  productInventory,
  ({ one }) => ({
    variant: one(productVariants, {
      fields: [productInventory.variantId],
      references: [productVariants.id],
    }),
  }),
);
