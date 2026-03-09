"use client";
import {
  ImagekitMediaLibraryWidget,
  FileTypeValue,
} from "imagekit-media-library-widget";
import { Button } from "../ui/button";
import { ReactNode, useEffect, useRef } from "react";

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
}: {
  children: ReactNode;
  onInsert?: (data: InsertType) => void;
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
        view: "modal",
        mlSettings: {
          multiple: true,
          maxFiles: 5,
          initialView: { fileType: "images" as FileTypeValue },
        },
      },

      insertCallBack,
    );
    widgetRef.current = ikMediaLibraryWidget;
    return () => ikMediaLibraryWidget.destroy();
  }, []);

  return (
    <div>
      <div id="ml-container" className="z-100" />
      <Button
        onClick={() => {
          if (widgetRef.current) {
            widgetRef.current.open();
          }
        }}
      >
        {children}
      </Button>
    </div>
  );
}
