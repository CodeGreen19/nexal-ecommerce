"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "@phosphor-icons/react";
import { FilterDrawerMobile } from "./filter-drawer-mobile";
import { ProductSortingSelect } from "./product-sorting-select";

export function ProductsPageHeading() {
  return (
    <div className="pb-4 flex items-center justify-between">
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
