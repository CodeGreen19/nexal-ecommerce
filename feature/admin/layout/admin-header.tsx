"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { getBreadcrumbArr } from "./helpers";
export function AdminHeader() {
  const pathname = usePathname();
  return (
    <header className="flex h-16 shrink-0 sticky top-0 bg-muted backdrop-blur-lg  border-border items-center gap-2  px-4 w-full">
      <SidebarTrigger className="-ml-1" />
      <Breadcrumb>
        <BreadcrumbList>
          {getBreadcrumbArr(pathname).map((item, i) => (
            <Fragment key={item}>
              {i !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem key={item}>
                <BreadcrumbPage>{item}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
