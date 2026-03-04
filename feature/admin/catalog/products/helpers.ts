import { db } from "@/drizzle/db";
import { randomBytes, createHash } from "crypto";

export function generateSku(input: {
  productId: string;
  variantSeed?: string; // e.g. "M-BLACK"
}) {
  // 1️⃣ Create deterministic product segment (4 chars)
  const productHash = createHash("sha256")
    .update(input.productId)
    .digest("hex")
    .slice(0, 4)
    .toUpperCase();

  // 2️⃣ Variant segment (4 chars)
  const variantHash = createHash("sha256")
    .update(input.variantSeed ?? "")
    .digest("hex")
    .slice(0, 4)
    .toUpperCase();

  // 3️⃣ Secure random segment (4 chars)
  const randomSegment = randomBytes(2).toString("hex").toUpperCase(); // 4 chars

  return `${productHash}-${variantHash}-${randomSegment}`;
}

export async function generateUniqueSku(
  tx: typeof db,
  input: {
    productId: string;
    variantSeed?: string;
  },
): Promise<string> {
  for (let i = 0; i < 5; i++) {
    const sku = generateSku(input);

    const existing = await tx.query.productVariants.findFirst({
      where: (v, { eq }) => eq(v.sku, sku),
    });

    if (!existing) {
      return sku;
    }
  }

  throw new Error("Failed to generate unique SKU after multiple attempts");
}
