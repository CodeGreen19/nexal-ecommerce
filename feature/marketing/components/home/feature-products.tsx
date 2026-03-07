import { db } from "@/drizzle/db";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HomeProductCard } from "./home-product-card";

export function FeatureProducts() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    </ErrorBoundary>
  );
}

async function Products() {
  const featureProducts = await db.query.products.findMany({
    limit: 10,
    with: { variants: { columns: { price: true, productId: true } } },
  });

  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 px-4 xl:px-0 mb-5">
      {featureProducts.map((product) => (
        <HomeProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.variants[0].price}
        />
      ))}
    </div>
  );
}
