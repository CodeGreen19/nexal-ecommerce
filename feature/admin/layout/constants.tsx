import {
  HouseIcon,
  Icon,
  InfinityIcon,
  ListBulletsIcon,
  StackIcon,
} from "@phosphor-icons/react";

export type NavItemType = {
  label: string;
  items: { title: string; icon: Icon; href: string }[];
};
export const navItems: NavItemType[] = [
  {
    label: "Home",
    items: [{ title: "Dashboard", href: "/admin/dashboard", icon: HouseIcon }],
  },
  {
    label: "Catalog",
    items: [
      {
        title: "Products",
        href: "/admin/catalog/products",
        icon: ListBulletsIcon,
      },
      {
        title: "Inventory",
        href: "/admin/catalog/inventory",
        icon: StackIcon,
      },
      {
        title: "Categories",
        href: "/admin/catalog/categories",
        icon: InfinityIcon,
      },
    ],
  },
];
