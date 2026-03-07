import * as z from "zod";

export const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
});
export type AddressSchemaType = z.infer<typeof addressSchema>;
