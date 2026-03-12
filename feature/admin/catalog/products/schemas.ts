import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters.")
    .max(255, "Name must be at most 255 characters."),

  description: z.string().nullable(),
  images: z.array(
    z.object({
      fileId: z.string().min(1, "file id is required"),
      url: z.string().min(1, "Url is required"),
    }),
  ),
  productOptions: z
    .array(
      z.object({
        name: z.string().trim().min(1, "name is required"),
        optionValues: z.array(z.string()),
      }),
    )
    .superRefine((options, ctx) => {
      const seen = new Map<string, number>();

      options.forEach((option, index) => {
        const normalized = option.name.toLowerCase();

        if (seen.has(normalized)) {
          ctx.addIssue({
            code: "custom",
            message: "Option name already exists",
            path: [index, "name"],
          });
        } else {
          seen.set(normalized, index);
        }
      });
    }),

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

export const emptydefaultValues: ProductSchemaType = {
  name: "",
  description: "",
  sku: "",
  images: [],
  productOptions: [{ name: "", optionValues: [] }],
  price: 0,
  costOfGoods: 0,
  stock: 0,
  shippingWeightInKg: 0,
};
