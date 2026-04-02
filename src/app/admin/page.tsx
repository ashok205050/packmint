import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLogin } from "@/components/AdminLogin";
import { hasAdminSessionServer } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuthorized = await hasAdminSessionServer();

  if (!isAuthorized) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
