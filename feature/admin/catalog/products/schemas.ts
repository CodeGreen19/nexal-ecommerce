import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters.")
    .max(255, "Name must be at most 255 characters."),

  description: z.string().nullable(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
