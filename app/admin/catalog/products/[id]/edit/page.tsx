import { UpdateProductPage } from "@/feature/admin/catalog/products/pages/update-product-page";

export default async function page(
  props: PageProps<"/admin/catalog/products/[id]/edit">,
) {
  const productId = (await props.params).id;
  return <UpdateProductPage productId={productId} />;
}
