import { navItems } from "./constants";

export function getBreadcrumbArr(pathname: string): string[] {
  const exactPathname = pathname.split("?")[0];

  for (const navitem of navItems) {
    for (const item of navitem.items) {
      if (item.href === exactPathname) {
        return [navitem.label, item.title];
      }
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.href === exactPathname) {
            return [navitem.label, item.title, subItem.title];
          }
        }
      }
    }
  }

  return [];
}
