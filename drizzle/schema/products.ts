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

//========= images ===========//
export const productImages = pgTable("product_images", {
  id,
  fileId: text("file_id").notNull(),
  url: text("url").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt,
});
//========= variants ===========//
export const productVariants = pgTable("product_variants", {
  id,
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  price: integer("price").notNull(),
  costsOfGoods: integer("costs_of_goods").notNull().default(0),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});
export const productOptions = pgTable("product_options", {
  id,
  name: varchar("name", { length: 100 }).notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const productOptionValues = pgTable("product_option_values", {
  id,
  value: varchar("value", { length: 100 }).notNull(),
  optionId: uuid("option_id")
    .notNull()
    .references(() => productOptions.id, { onDelete: "cascade" }),
});

export const productVariantOptionValues = pgTable(
  "product_variant_option_values",
  {
    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),

    optionValueId: uuid("option_value_id")
      .notNull()
      .references(() => productOptionValues.id, { onDelete: "cascade" }),
  },
);

//========= inventory ===========//
export const productInventory = pgTable("product_inventory", {
  id,
  quantity: integer("quantity").notNull().default(0),
  reservedQty: integer("reserved_qty").notNull().default(0),
  variantId: uuid("varient_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
});

//============== relations ===============//
export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
  images: many(productImages),
  options: many(productOptions),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productOptionsRelations = relations(
  productOptions,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productOptions.productId],
      references: [products.id],
    }),

    values: many(productOptionValues),
  }),
);

export const productOptionValuesRelations = relations(
  productOptionValues,
  ({ one, many }) => ({
    option: one(productOptions, {
      fields: [productOptionValues.optionId],
      references: [productOptions.id],
    }),

    variants: many(productVariantOptionValues),
  }),
);

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),

    optionValues: many(productVariantOptionValues),
    inventory: one(productInventory),
  }),
);
export const productVariantOptionValuesRelations = relations(
  productVariantOptionValues,
  ({ one }) => ({
    variant: one(productVariants, {
      fields: [productVariantOptionValues.variantId],
      references: [productVariants.id],
    }),

    optionValue: one(productOptionValues, {
      fields: [productVariantOptionValues.optionValueId],
      references: [productOptionValues.id],
    }),
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
