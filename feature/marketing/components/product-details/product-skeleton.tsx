"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";

export function ProductDetailSkeleton() {
  return (
    <div className="p-4 flex items-center justify-center">
      <CircleNotchIcon className="animate-spin" />
    </div>
  );
}
