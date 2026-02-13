import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function ProductsTable() {
  return (
    <div className="p-4 border rounded-sm">
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDataFetching />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

async function ProductDataFetching() {
  const allProducts = await db.select().from(products);
  return (
    <div>
      {allProducts.length === 0 ? (
        <div>No Products</div>
      ) : (
        allProducts.map((product) => <div key={product.id}>{product.name}</div>)
      )}
    </div>
  );
}
