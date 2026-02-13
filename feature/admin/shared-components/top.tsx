"use client";

import { cn } from "@/lib/utils";
import { ArrowLeftIcon, CaretLeftIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

function Top({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
}
function TopTitle({
  children,
  className,
  backToUrl,
}: {
  children: ReactNode;
  className?: string;
  backToUrl?: string;
}) {
  const router = useRouter();
  return (
    <h1
      onClick={() => backToUrl && router.push(backToUrl)}
      className={cn(
        "text-xl md:text-xl font-semibold md:font-bold flex items-center justify-center gap-2",
        backToUrl && "hover:text-muted-foreground cursor-pointer",
        className,
      )}
    >
      {backToUrl && <CaretLeftIcon className="size-4 " />}{" "}
      <span>{children}</span>
    </h1>
  );
}
function TopActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {children}
    </div>
  );
}

export { Top, TopTitle, TopActions };
