"use client";

import { InsertType } from "@/components/shared/image-kit-widget";
import { Top, TopTitle } from "@/feature/admin/shared-components/top";
import { useState } from "react";

export function InventoryPage() {
  const [inserts, setInserts] = useState<InsertType | null>(null);
  return (
    <div>
      <Top>
        <TopTitle>Inventory</TopTitle>
      </Top>
    </div>
  );
}
