"use client";

import { WarningIcon } from "@phosphor-icons/react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export function DefaultErrorComp() {
  return (
    <Empty className="border border-dashed border-destructive/30 ">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <WarningIcon className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle className="text-destructive">Error Occurs</EmptyTitle>
        <EmptyDescription>
          Look at your internet connection or refresh.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
