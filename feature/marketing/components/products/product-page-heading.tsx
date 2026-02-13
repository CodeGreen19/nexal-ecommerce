"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "@phosphor-icons/react";
import { FilterDrawerMobile } from "./filter-drawer-mobile";
import { ProductSortingSelect } from "./product-sorting-select";

export function ProductsPageHeading() {
  return (
    <div className="py-4 flex items-center justify-between z-20 sticky top-0 left-0 bg-background">
      <h1 className="text-xl font-semibold">Heading</h1>
      <span className="lg:hidden">
        <FilterDrawerMobile>
          <Button variant={"secondary"}>
            Filters <SlidersHorizontalIcon />
          </Button>
        </FilterDrawerMobile>
      </span>
      <span className="hidden lg:block">
        <ProductSortingSelect />
      </span>
    </div>
  );
}
