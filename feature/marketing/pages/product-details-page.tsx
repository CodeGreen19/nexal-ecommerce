import { ProductDetailInfo } from "../components/product-details/product-detail-info";
import { ProductImages } from "../components/product-details/product-images";

export async function ProductDetailsPage(props: PageProps<"/products/[slug]">) {
  const productSlug = (await props.params).slug;
  return (
    <div className="">
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:py-2">
        <ProductImages />
        <ProductDetailInfo />
      </section>
    </div>
  );
}
