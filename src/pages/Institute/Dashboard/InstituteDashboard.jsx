import { LayoutTemplate, UserPlus2, Users2, Settings } from "lucide-react";
import { PiCertificate } from "react-icons/pi";
import { RiAiGenerate } from "react-icons/ri";

import { useInstituteContext } from "@/context/InstituteContext";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";
import CustomCard from "@/components/CustomCard/CustomCard";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Dashboard = () => {
  const {
    institute,
    isConnected,
    connectWallet,
    disconnectWallet,
    viewWallet,
  } = useInstituteContext();

  const breadcrumbItems = {
    previousPages: [
      {
        name: "Home",
        to: "/",
      },
    ],
    currentPage: "Dashboard",
  };

  const totalCertificates = institute?.certificateFormats.reduce(
    (acc, curr) => {
      return acc + curr.Certificates.length;
    },
    0
  );

  const cards = [
    {
      title: (
        <div className="flex items-center">
          <LayoutTemplate size={24} className="mr-2" />
          Templates
        </div>
      ),
      description: `Total Templates: ${institute.templates.length}`,
      link: "/institute/upload-template",
      btnText: "Upload Template",
    },
    {
      title: (
        <div className="flex items-center">
          <PiCertificate size={24} className="mr-2" />
          Certificate Formats
        </div>
      ),
      description: `Total Certificate Formats: ${institute.certificateFormats.length}`,
      link: "/institute/add-certificate-format",
      btnText: "Add Certificate Format",
    },
    {
      title: (
        <div className="flex items-center">
          <RiAiGenerate size={24} className="mr-2" />
          Certificates
        </div>
      ),
      description: `Total Certificates: ${totalCertificates}`,
      link: "/institute/generate-certificate",
      btnText: "Generate Certificate",
    },
    {
      title: (
        <div className="flex items-center">
          <UserPlus2 size={24} className="mr-2" />
          Users
        </div>
      ),
      description: `Total Students: ${institute.users.length}`,
      link: "/institute/add-user",
      btnText: "Add User",
    },
    {
      title: (
        <div className="flex items-center">
          <Users2 size={24} className="mr-2" />
          Users
        </div>
      ),
      description: "View all users in the institute.",
      link: "/institute/view-users",
      btnText: "View Users",
    },
    {
      title: (
        <div className="flex items-center">
          <Settings size={24} className="mr-2" />
          Settings
        </div>
      ),
      description: "Change institute settings.",
      link: "/institute/settings",
      btnText: "Change",
    },
  ];
  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl text-neutral-900 dark:text-neutral-100 font-medium">
          Welcome <span className="text-indigo-500">{institute.name}!!</span>
        </h1>
        <div className="flex gap-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="px-4 py-3 text-sm font-medium sm:uppercase rounded dark:bg-indigo-600/30 bg-transparent hover:bg-transparent dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
                  onClick={isConnected ? disconnectWallet : connectWallet}
                >
                  {isConnected ? "Disconnect" : "Connect Wallet"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={"bottom"}>
                {isConnected
                  ? "Click to disconnect your wallet."
                  : "Connect your wallet to generate certificates."}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isConnected && (
            <Button
              className="px-4 py-3 text-sm font-medium sm:uppercase rounded dark:bg-indigo-600/30 bg-transparent hover:bg-transparent dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
              onClick={viewWallet}
            >
              View Account
            </Button>
          )}
        </div>
      </div>
      <ScrollArea className="h-[90%]">
        <div className="flex flex-col w-full h-full items-start gap-y-4">
          <div className="flex flex-col items-start w-full">
            <span className="text-lg text-indigo-500 mb-2">Certificates</span>
            <div className="flex gap-x-4 w-3/4">
              {cards.slice(0, 3).map((card, index) => (
                <CustomCard key={index} {...card} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-lg text-indigo-500 mb-2">Users</span>
            <div className="flex gap-x-4 w-3/4">
              {cards.slice(3, 5).map((card, index) => (
                <CustomCard key={index} {...card} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <span className="text-lg text-indigo-500 mb-2">Settings</span>
            <div className="flex gap-x-4 w-3/4">
              {cards.slice(5).map((card, index) => (
                <CustomCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Dashboard;
