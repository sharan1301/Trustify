import { Building2, Settings } from "lucide-react";
import { PiCertificate } from "react-icons/pi";

import { useUserContext } from "@/context/UserContext";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";
import CustomCard from "@/components/CustomCard/CustomCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserDashboard = () => {
  const { user } = useUserContext();

  const breadcrumbItems = {
    previousPages: [
      {
        name: "Home",
        to: "/",
      },
    ],
    currentPage: "Dashboard",
  };

  const cards = [
    {
      title: (
        <div className="flex items-center">
          <PiCertificate size={24} className="mr-2" />
          Certificates
        </div>
      ),
      description: `Total Certificates: ${user.Certificates.length}`,
      link: "/user/certificates",
      btnText: "View Certificates",
    },
    {
      title: (
        <div className="flex items-center">
          <Building2 size={24} className="mr-2" />
          Institutions
        </div>
      ),
      description: `Total Institutions: ${user.Institution.length}`,
      link: "/user/institutes",
      btnText: "View Institutions",
    },
    {
      title: (
        <div className="flex items-center">
          <Settings size={24} className="mr-2" />
          Settings
        </div>
      ),
      description: "Change user settings.",
      link: "/user/settings",
      btnText: "Change",
    },
  ];
  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <h1 className="text-2xl text-neutral-900 dark:text-neutral-100 font-medium">
        Welcome <span className="text-indigo-500">{user.name}!!</span>
      </h1>
      <ScrollArea className="h-[90%]">
        <div className="flex flex-col w-full h-full items-start gap-y-4">
          <div className="flex flex-col items-start w-full">
            <span className="text-lg text-indigo-500 mb-2">Quick Actions</span>
            <div className="flex gap-x-4 w-3/4">
              {cards.slice(0, 3).map((card, index) => (
                <CustomCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserDashboard;
