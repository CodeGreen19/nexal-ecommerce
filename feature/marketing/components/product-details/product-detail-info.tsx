"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";

export function ProductDetailInfo() {
  return (
    <div className=" px-4 py-4 lg:py-0 lg:px-5 space-y-5">
      <h1 className="text-2xl font-bold">
        Chiar for programmers to code everyday
      </h1>
      <h2 className="text-3xl font-black">250 $</h2>
      <QuantityPicker />
      <div className="flex gap-2">
        <Button>Add to cart</Button>
        <Button variant={"secondary"}>Buy now</Button>
      </div>
    </div>
  );
}

export function QuantityPicker() {
  const [count, setCount] = useState(5);

  return (
    <div className="flex items-center space-x-1 rounded-sm border bg-background p-1 w-fit">
      {/* Decrease Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setCount(Math.max(0, count - 1))}
        disabled={count === 0}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>

      {/* Number Display */}
      <div className="flex w-10 items-center justify-center">
        <span className="text-sm font-medium tabular-nums">{count}</span>
      </div>

      {/* Increase Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
}
