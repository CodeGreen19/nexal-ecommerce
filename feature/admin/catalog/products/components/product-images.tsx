"use client";

import { ImageKitWidgetButton } from "@/components/shared/image-kit-widget-button";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import Image from "next/image";

export function ProductImages({
  inserts,
  onInsert,
  onDelete,
}: {
  inserts: { fileId: string; url: string }[];
  onInsert: (info: { fileId: string; url: string }[]) => void;
  onDelete: (fileId: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
      {inserts &&
        inserts.length !== 0 &&
        inserts.map((v) => (
          <div
            key={v.fileId}
            className="group relative aspect-video border rounded-lg overflow-hidden"
          >
            <Image
              className="w-full h-full object-cover"
              src={v.url}
              height={400}
              width={400}
              alt="selected-img"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition z-10">
              <Button
                variant={"destructive"}
                onClick={() => onDelete(v.fileId)}
                className="flex items-center gap-2 size-10 rounded-full hover:bg-destructive  text-white bg-destructive"
              >
                <TrashIcon size={18} />
              </Button>
            </div>
          </div>
        ))}

      {/* Add Image Card */}
      <div className="aspect-video hover:bg-muted cursor-pointer border rounded-lg">
        <ImageKitWidgetButton
          onInsert={(v) => onInsert(v.data)}
          className="h-full w-full"
        >
          <div className="h-full w-full gap-1 flex items-center justify-center">
            <span>Add Image</span>
            <PlusIcon />
          </div>
        </ImageKitWidgetButton>
      </div>
    </div>
  );
}
