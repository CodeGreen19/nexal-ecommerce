"use client";
import { Spinner } from "../ui/spinner";

export function DefaultLoading() {
  return (
    <div className="p-20 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
