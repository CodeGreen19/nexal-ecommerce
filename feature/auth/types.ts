import { z } from "zod";
import { signInSchema, signUpSchema } from "./schemas";

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
