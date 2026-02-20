import { db } from "@/drizzle/db";
import { HomeProductCard } from "./home-product-card";
import { products } from "@/drizzle/schema";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

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
  const featureProducts = await db.select().from(products).limit(10);
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 px-4 xl:px-0 mb-5">
      {featureProducts.map((product) => (
        <HomeProductCard key={product.id} id={product.id} name={product.name} />
      ))}
    </div>
  );
}
