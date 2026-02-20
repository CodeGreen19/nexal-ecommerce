"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthBox } from "@/feature/auth/components/auth-box";
import { authClient } from "@/lib/auth-client";
import { CircleNotchIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { ReactNode, useTransition } from "react";
export function UserButton(props: { children: ReactNode }) {
  const { isPending, error, data: isSignedUp } = authClient.useSession();
  if (isPending) {
    return <CircleNotchIcon className="size-6 animate-spin" />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return isSignedUp ? (
    <SignedUpDropdown {...props} />
  ) : (
    <LetSignInDialog {...props} />
  );
}

function SignedUpDropdown({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <Link href={"/account/profile"}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Orders</DropdownMenuItem>
          <DropdownMenuItem>Wishlists</DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await authClient.signOut();
              });
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LetSignInDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <AuthBox />
      </DialogContent>
    </Dialog>
  );
}
