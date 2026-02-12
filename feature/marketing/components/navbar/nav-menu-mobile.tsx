import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
export function NavMenuMobile({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden block">{children}</SheetTrigger>
      <SheetContent
        side="left"
        className={" data-[side=left]:w-full sm:rounded-r-2xl"}
      >
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
