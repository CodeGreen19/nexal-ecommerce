import Image from "next/image";

export function HomeProductCard() {
  return (
    <div className=" p-2 border rounded-2xl">
      <Image
        src={"/products/laptop-1.0.webp"}
        height={200}
        width={200}
        alt="product-cart"
      />
    </div>
  );
}
