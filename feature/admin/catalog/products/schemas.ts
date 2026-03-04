import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters.")
    .max(255, "Name must be at most 255 characters."),

  description: z.string().nullable(),
  price: z
    .number()
    .int("Value must be a whole number")
    .positive("Price must be greater than 0"),
  costOfGoods: z.number().nullable(),

  stock: z
    .number()
    .int("Value must be a whole number")
    .nonnegative("Stock can't be negetive"),
  shippingWeightInKg: z.number().nonnegative("Weight must be greater that 0"),
  sku: z.string().min(10, "SKU must be at lest 10 char"),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
