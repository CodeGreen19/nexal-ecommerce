import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { XIcon } from "@phosphor-icons/react";
import { ReactNode } from "react";
import { FilterOptionsBox } from "./filter-options-box";
export function FilterDrawerMobile({ children }: { children: ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-5/6 rounded-t-2xl px-4 ">
        <DrawerHeader className="hidden">
          <DrawerTitle className="sr-only"></DrawerTitle>
        </DrawerHeader>
        <div>
          <div className="flex items-center justify-between py-2">
            <h1 className="text-lg font-semibold">Filters</h1>
            <DrawerClose asChild>
              <Button variant={"secondary"} className={"rounded-full "}>
                <XIcon />
              </Button>
            </DrawerClose>
          </div>
          <main className="relative">
            <div className="h-[65vh] overflow-y-auto">
              <FilterOptionsBox />
            </div>
            <div className="h-10 absolute bottom-0 left-0 w-full bg-linear-to-t from-background to-transparent"></div>
          </main>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
