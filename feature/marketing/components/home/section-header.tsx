import { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl">{children}</h1>;
}
export function SectionDescription({ children }: { children: ReactNode }) {
  return <h3 className="text-base text-muted-foreground">{children}</h3>;
}

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center flex-col gap-2 py-4">
      {children}
    </div>
  );
}
