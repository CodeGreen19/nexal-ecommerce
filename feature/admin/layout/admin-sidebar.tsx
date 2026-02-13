"use client";
import { Logo } from "@/components/shared/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { navItems } from "./constants";

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="pl-4 h-16 flex items-start justify-start">
        <Logo href="/admin/dashboard" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {navItems.map((navItem) => (
            <Fragment key={navItem.label}>
              <SidebarGroupLabel>{navItem.label}</SidebarGroupLabel>
              <SidebarMenu>
                {navItem.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={cn(
                        "hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground",
                        pathname === item.href &&
                          "bg-muted text-primary hover:text-primary active:text-primary",
                      )}
                      render={
                        <Link href={item.href}>
                          <item.icon /> <span>{item.title}</span>
                        </Link>
                      }
                    ></SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </Fragment>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
