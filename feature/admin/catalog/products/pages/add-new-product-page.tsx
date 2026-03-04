"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "../components/product-form";

export function AddNewProductPage() {
  const router = useRouter();
  return (
    <ProductForm
      type="add"
      onSuccess={() => router.push("/admin/catalog/products")}
    />
  );
}
