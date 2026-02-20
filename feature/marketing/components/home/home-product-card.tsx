"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HomeProductCard({ id, name }: { name: string; id: string }) {
  return (
    <div className=" p-2 border rounded-2xl">
      <Image
        src={"/products/laptop-1.0.webp"}
        height={200}
        width={200}
        alt="product-cart"
      />
      <h1>{name}</h1>
      <Button onClick={() => {}}>Add to cart</Button>
    </div>
  );
}
