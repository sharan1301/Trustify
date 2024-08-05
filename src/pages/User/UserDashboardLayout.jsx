import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Building2, LayoutDashboard, Settings } from "lucide-react";
import { PiCertificate } from "react-icons/pi";

import { useAppContext } from "@/context/AppContext";
import { useUserContext } from "@/context/UserContext";

import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardLoader from "@/components/SkeletonLoader/DashboardLoader";

import { Separator } from "@/components/ui/separator";

const UserDashboardLayout = () => {
  const { isLoading } = useAppContext();
  const { auth } = useUserContext();

  const links = [
    {
      name: "Dashboard",
      path: "/user",
      icon: LayoutDashboard,
    },
    {
      name: "Certificates",
      path: "/user/certificates",
      icon: PiCertificate,
    },
    {
      name: "Institution",
      path: "/user/institutes",
      icon: Building2,
    },
    {
      name: "Settings",
      path: "/institute/settings",
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

export default UserDashboardLayout;
