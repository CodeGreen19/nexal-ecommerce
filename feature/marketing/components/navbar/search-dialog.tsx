import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { ReactNode } from "react";

export function SearchDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger className={"cursor-pointer"}>{children}</DialogTrigger>
      <DialogContent className={"top-10 translate-y-0 gap-0"}>
        <DialogHeader>
          <DialogTitle className={"sr-only h-0"}></DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <form>
            <Field>
              <FieldLabel>Search here...</FieldLabel>
              <div className="relative">
                <Input className="pl-8" />

                <MagnifyingGlassIcon
                  size={20}
                  className="absolute top-2 left-2"
                />
              </div>
            </Field>
          </form>
          <Separator />
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim quo
            suscipit, quisquam vitae beatae aliquid repudiandae ipsa, fugit
            aliquam earum doloremque ducimus magni veniam? Ipsam omnis unde odio
            cupiditate ut.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
