"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { createRipple } from "@/lib/hooks/use-ripple";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<typeof Button>;
export function RippleButton({ className, onClick, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={cn("ripple-container", className)}
      onClick={(e) => {
        createRipple(e);
        onClick?.(e);
      }}
    />
  );
}
