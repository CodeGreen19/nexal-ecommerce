import Image from "next/image";

export function ProductImages() {
  return (
    <div>
      <div className="bg-muted lg:rounded-2xl">
        <Image
          height={500}
          width={500}
          alt="product-img"
          src={"/products/chair-1.0.webp"}
        />
      </div>
      <div className="flex items-center justify-start gap-2 overflow-x-auto py-3 pl-3 lg:pl-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="size-20 flex-none bg-muted rounded-xl" key={i}>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}
