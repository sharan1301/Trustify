import { Outlet, Navigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  UploadIcon,
  UploadCloud,
  LayoutDashboard,
  UserPlus2,
  Users2,
  Settings,
} from "lucide-react";
import { PiCertificate } from "react-icons/pi";
import { RiAiGenerate } from "react-icons/ri";

import { useInstituteContext } from "@/context/InstituteContext";
import { useAppContext } from "@/context/AppContext";

import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardLoader from "@/components/SkeletonLoader/DashboardLoader";

import { Separator } from "@/components/ui/separator";

const InstituteDashboardLayout = () => {
  const { isLoading } = useAppContext();
  const { auth, institute } = useInstituteContext();

  const links = [
    {
      name: "Dashboard",
      path: "/institute",
      icon: LayoutDashboard,
    },
    {
      name: "Add User",
      path: "/institute/add-user",
      icon: UserPlus2,
    },
    {
      name: "Certificate Format",
      path: "/institute/add-certificate-format",
      icon: UploadIcon,
    },
    {
      name: "Upload Template",
      path: "/institute/upload-template",
      icon: UploadCloud,
    },
    {
      name: "Generate Certificate",
      path: "/institute/generate-certificate",
      icon: RiAiGenerate,
    },
    {
      name: "View Certificates",
      path: "/institute/view-certificates",
      icon: PiCertificate,
    },
    {
      name: "View Users",
      path: "/institute/view-users",
      icon: Users2,
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

  if (institute.isApproved === "REJECTED") {
    return (
      <div className="h-[100dvh] flex flex-col items-center justify-center gap-y-4 mx-6">
        <h2 className="text-neutral-900 dark:text-neutral-100 max-sm:text-center">
          The Admin has rejected your{" "}
          <span className="text-indigo-500">institution.</span> We will delete
          your account in two to four days. Try again after deletion of your
          account.
        </h2>
        <Link
          to="/"
          className="px-3 py-1 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
        >
          Home
        </Link>
      </div>
    );
  }

  if (institute.isApproved === "PENDING") {
    return (
      <div className="h-[100dvh] flex flex-col items-center justify-center gap-y-4 mx-6">
        <h2 className="text-neutral-900 dark:text-neutral-100 max-sm:text-center">
          The Admin is yet to approve your{" "}
          <span className="text-indigo-500">institution.</span> Please wait for
          the approval.
        </h2>
        <Link
          to="/"
          className="px-3 py-1 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
        >
          Home
        </Link>
      </div>
    );
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

export default InstituteDashboardLayout;
