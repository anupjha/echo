import { AuthGuard } from "@/modules/auth/ui/components/AuthGuard"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-gurard"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { cookies } from "next/headers";
import { DashboardSidebar } from "../components/dashboard-sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState === undefined ? true : sidebarState === "true";

  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col">
            {children}
          </main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  )
}
export default DashboardLayout;