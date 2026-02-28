"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HomeProductCard({
  id,
  name,
  price,
}: {
  name: string;
  id: string;
  price?: number;
}) {
  return (
    <Link href={`/products/${id}`}>
      <div className=" p-2 border rounded-2xl">
        <Image
          src={"/products/laptop-1.0.webp"}
          height={200}
          width={200}
          alt="product-cart"
        />
        <h1>{name}</h1>
        <Button variant={"secondary"}> $ {price}</Button>
      </div>
    </Link>
  );
}
