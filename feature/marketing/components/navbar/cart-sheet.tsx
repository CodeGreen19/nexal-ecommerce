"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { parseAsBoolean, useQueryState } from "nuqs";
import { ReactNode } from "react";
import { getCart } from "../../server/carts";
import { CartListing } from "../cart/cart-listing";

export function CartSheet({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useQueryState(
    "open-cart",
    parseAsBoolean.withDefault(false),
  );

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open ? true : null)}>
      <SheetTrigger className={"relative"}>
        {children}{" "}
        <span className="absolute -top-4 right-1">{data?.items.length}</span>
      </SheetTrigger>
      <SheetContent className={"sm:rounded-l-2xl  data-[side=right]:w-full "}>
        <CartSheetHeader />
        <CartListing />
      </SheetContent>
    </Sheet>
  );
}

function CartSheetHeader() {
  const isRefetching = useIsFetching({ queryKey: ["cart"] });
  return (
    <SheetHeader>
      <SheetTitle className={"flex justify-between"}>
        <span>Carts</span> <span>{isRefetching ? <Spinner /> : null}</span>
      </SheetTitle>
    </SheetHeader>
  );
}
