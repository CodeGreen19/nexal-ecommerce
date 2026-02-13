import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

export default function AdminDashboardLayout(props: LayoutProps<"/admin">) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <AdminHeader />
        <div className="px-4">{props.children}</div>
      </main>
    </SidebarProvider>
  );
}
