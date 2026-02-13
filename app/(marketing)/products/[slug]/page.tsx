import { ProductDetailsPage } from "@/feature/marketing/pages/product-details-page";
import { Suspense } from "react";

export default function page(props: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<div className="text-center">Slug is loading...</div>}>
      <ProductDetailsPage {...props} />
    </Suspense>
  );
}
