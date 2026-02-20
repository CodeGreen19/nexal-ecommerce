import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
