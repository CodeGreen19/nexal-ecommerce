import {
  GameControllerIcon,
  HouseIcon,
  Icon,
  InfinityIcon,
  ListBulletsIcon,
  StackIcon,
  UsersIcon,
} from "@phosphor-icons/react";

export type NavItemType = {
  label: string;
  items: {
    title: string;
    icon: Icon;
    href: string;
    subItems?: { title: string; href: string }[];
  }[];
};
export const navItems: NavItemType[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", href: "/admin/home/dashboard", icon: HouseIcon },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        title: "Products",
        href: "/admin/catalog/products",
        icon: ListBulletsIcon,
        subItems: [{ title: "New ", href: "/admin/catalog/products/add-new" }],
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
  {
    label: "Manage",
    items: [
      {
        title: "Users",
        href: "/admin/manage/users",
        icon: UsersIcon,
      },
      {
        title: "Access Control",
        href: "/admin/manage/access-control",
        icon: GameControllerIcon,
      },
    ],
  },
];
