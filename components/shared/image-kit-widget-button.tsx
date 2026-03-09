import dynamic from "next/dynamic";

export const ImageKitWidgetButton = dynamic(
  () => import("@/components/shared/image-kit-widget"),
  { ssr: false },
);
