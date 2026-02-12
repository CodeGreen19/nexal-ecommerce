import React from "react";
import { ProductCard } from "./product-card";

export default function ProductListings() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 grow">
      {Array.from({ length: 20 }).map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
