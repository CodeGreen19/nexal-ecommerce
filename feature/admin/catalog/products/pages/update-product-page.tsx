import { Suspense } from "react";
import { getSingleProducts } from "../queries";
import { ProductForm } from "../components/product-form";

export function UpdateProductPage({ productId }: { productId: string }) {
  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <UpdateProduct productId={productId} />
    </Suspense>
  );
}

async function UpdateProduct({ productId }: { productId: string }) {
  const productData = await getSingleProducts({ productId });
  console.log("safs=>", productData);

  return (
    <ProductForm
      type="update"
      existedValues={{
        productId: productData?.id ?? "",
        name: productData?.name ? productData.name : "",
        description: productData?.description ?? "",
        price: productData?.variants[0].price ?? 0,
        costOfGoods: 0,
        shippingWeightInKg: 0,
        sku: productData?.variants[0].sku ?? "sku-",
        stock: productData?.variants[0].inventory?.quantity ?? 0,
      }}
    />
  );
}
