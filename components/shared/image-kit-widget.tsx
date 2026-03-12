"use client";
import {
  ImagekitMediaLibraryWidget,
  FileTypeValue,
} from "imagekit-media-library-widget";
import { Button } from "../ui/button";
import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type InsertType = {
  eventType: "INSERT";
  data: {
    fileId: string;
    thumbnail: string;
    type: string;
    url: string;
  }[];
};

export default function ImageKitWidgetButtonWrapper({
  children,
  onInsert,
  className,
}: {
  children: ReactNode;
  onInsert?: (data: InsertType) => void;
  className?: string;
}) {
  const widgetRef = useRef<ImagekitMediaLibraryWidget | null>(null);
  useEffect(() => {
    const insertCallBack = (data: InsertType) => {
      onInsert && onInsert(data);
    };
    const ikMediaLibraryWidget = new ImagekitMediaLibraryWidget(
      {
        container: "#ml-container",

        renderOpenButton: false,
      },

      insertCallBack,
    );
    widgetRef.current = ikMediaLibraryWidget;
    return () => ikMediaLibraryWidget.destroy();
  }, []);

  return (
    <>
      <div
        className={cn("z-100", className)}
        onClick={() => {
          if (widgetRef.current) {
            widgetRef.current.open();
          }
        }}
      >
        {children}
      </div>
    </>
  );
}
