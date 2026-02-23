import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters.")
    .max(120, "Name must be at most 120 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters.")
    .max(1000, "Description must be at most 1000 characters."),

  price: z.number().min(0.01, "Price must be greater than 0"),

  stock: z
    .number()

    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

export type AddProductSchemaType = z.infer<typeof addProductSchema>;

// database insert type
type T = {
  name: string;
  description: string;
  price: number;
  id?: string | undefined;
  stock?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | null | undefined;
};
