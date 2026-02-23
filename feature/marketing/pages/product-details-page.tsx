import { Suspense } from "react";
import { ProductDetailInfo } from "../components/product-details/product-detail-info";
import { ProductImages } from "../components/product-details/product-images";

import { getProductDetails } from "../server/product-details";
import { ProductDetailSkeleton } from "../components/product-details/product-skeleton";

export async function ProductDetailsPage(props: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetails {...props} />
    </Suspense>
  );
}

async function ProductDetails(props: PageProps<"/products/[slug]">) {
  const productSlug = (await props.params).slug;
  const product = await getProductDetails(productSlug);
  return (
    <div className="">
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:py-2">
        <ProductImages />
        <ProductDetailInfo product={product} />
      </section>
    </div>
  );
}
