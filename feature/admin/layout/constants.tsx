import {
  ControlIcon,
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
  items: { title: string; icon: Icon; href: string }[];
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
