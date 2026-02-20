"use client";
import { Logo } from "@/components/shared/logo";
import {
  ListIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { CartSheet } from "../components/navbar/cart-sheet";
import { NavMenuMobile } from "../components/navbar/nav-menu-mobile";
import { SearchDialog } from "../components/navbar/search-dialog";
import { UserButton } from "../components/navbar/user-button";

const items = [
  "New arrived",
  "Man",
  "Woman",
  "Kids",
  "Collections",
  "Terms",
  "Contact us",
];
export function Navbar() {
  return (
    <nav className="border-b xl:border-none">
      <div className="max-w-7xl m-auto h-20  flex items-center justify-between px-4 xl:px-0">
        <section className="flex items-center justify-start gap-3 md:gap-6">
          <NavMenuMobile>
            <ListIcon className="md:hidden block size-6" />
          </NavMenuMobile>
          <Logo />
          <ul className="md:flex items-center hidden  gap-3 translate-y-1">
            {items.map((item) => (
              <li key={item} className="hover:text-primary cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex items-center gap-4">
          <SearchDialog>
            <MagnifyingGlassIcon size={24} />
          </SearchDialog>
          <UserButton>
            <UserIcon size={24} />
          </UserButton>
          <CartSheet>
            <ShoppingCartIcon size={24} />
          </CartSheet>
        </section>
      </div>
    </nav>
  );
}
