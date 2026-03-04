import AdminDashboardLayout from "@/feature/admin/layout";
import { Suspense } from "react";

export default function layout(props: LayoutProps<"/admin">) {
  return (
    <Suspense>
      <AdminDashboardLayout {...props} />
    </Suspense>
  );
}
