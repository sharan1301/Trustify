import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Building2, LayoutDashboard, Settings } from "lucide-react";

import { useAppContext } from "@/context/AppContext";
import { useAdminContext } from "@/context/AdminContext";

import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardLoader from "@/components/SkeletonLoader/DashboardLoader";

import { Separator } from "@/components/ui/separator";

const AdminDashboardLayout = () => {
  const { isLoading } = useAppContext();
  const { auth, institutions } = useAdminContext();

  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Institution",
      path: "/admin/institutes",
      icon: Building2,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  if (isLoading) return <DashboardLoader />;

  if (!auth) {
    toast.error("Login to access this page");
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="h-[100dvh] flex items-start justify-start gap-x-2">
      <DashboardNavbar links={links} />
      <Separator orientation="vertical" />
      <div className="pt-16 sm:pt-20 h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
