import { HomeProductCard } from "./home-product-card";

export function FeatureProducts() {
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 px-4 xl:px-0 mb-5">
      {Array.from({ length: 20 }).map((_, i) => (
        <HomeProductCard key={i} />
      ))}
    </div>
  );
}
