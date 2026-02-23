"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Profile",
    href: "/account/profile",
  },
  {
    title: "Orders",
    href: "/account/orders",
  },
  {
    title: "Wishlists",
    href: "/account/wishlists",
  },
];

export function AccountLayout(props: LayoutProps<"/account">) {
  const pathname = usePathname();
  return (
    <div>
      <nav className="p-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={item.href === pathname ? "secondary" : "ghost"}
              className={""}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
      {props.children}
    </div>
  );
}
