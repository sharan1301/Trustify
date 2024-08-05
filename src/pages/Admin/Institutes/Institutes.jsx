import { Building2, Ban, CircleCheckBig, CircleEllipsis } from "lucide-react";

import { useAdminContext } from "@/context/AdminContext";
import { useAppContext } from "@/context/AppContext";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Institutes = () => {
  const { isLoading } = useAppContext();
  const { institutions, handleAdminApproveInstitutes } = useAdminContext();

  const breadcrumbItems = {
    previousPages: [
      {
        name: "Home",
        to: "/",
      },
      {
        name: "Dashboard",
        to: "/admin",
      },
    ],
    currentPage: "Institutes",
  };

  const tabsList = [
    {
      name: "Pending",
      icon: CircleEllipsis,
    },
    {
      name: "Approved",
      icon: CircleCheckBig,
    },
    {
      name: "Rejected",
      icon: Ban,
    },
  ];

  const [pending, approved, rejected] = institutions.reduce(
    (acc, curr) => {
      if (curr.isApproved === "PENDING") {
        acc[0].push(curr);
      } else if (curr.isApproved === "APPROVED") {
        acc[1].push(curr);
      } else if (curr.isApproved === "REJECTED") {
        acc[2].push(curr);
      }
      return acc;
    },
    [[], [], []]
  );

  const tabsContent = [
    {
      name: "Pending",
      icon: CircleEllipsis,
      description:
        "Pending institutes are those that have submitted their application but have not been approved yet.",
      institutions: pending,
    },
    {
      name: "Approved",
      icon: CircleCheckBig,
      description:
        "Approved institutes are those that have been approved by the admin.",
      institutions: approved,
    },
    {
      name: "Rejected",
      icon: Ban,
      description:
        "Rejected institutes are those that have been rejected by the admin.",
      institutions: rejected,
    },
  ];

  const handleApproveInstitute = (instituteId, isApproved) =>
    handleAdminApproveInstitutes({ instituteId, isApproved });

  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <ScrollArea className="h-[90%]">
        <div className="flex flex-col w-full h-full items-start gap-y-4">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList>
              {tabsList.map((tab, index) => (
                <TabsTrigger key={index} value={tab.name.toLowerCase()}>
                  <tab.icon size={18} className="mr-2" />
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabsContent.map((tab, index) => (
              <TabsContent
                key={index}
                value={tab.name.toLowerCase()}
                className="w-3/4"
              >
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <tab.icon size={18} className="mr-2" />
                      {tab.name === "Pending"
                        ? "Pending Institutes"
                        : tab.name === "Approved"
                        ? "Approved Institutes"
                        : "Rejected Institutes"}
                    </CardTitle>
                    <CardDescription className="flex flex-col items-start">
                      {tab.description}
                      {tab.name === "Pending" && (
                        <span className="text-xs text-gray-500">
                          {tab.institutions.length} pending institutes
                        </span>
                      )}
                      {tab.name === "Approved" && (
                        <span className="text-xs text-gray-500">
                          {tab.institutions.length} approved institutes
                        </span>
                      )}
                      {tab.name === "Rejected" && (
                        <span className="text-xs text-gray-500">
                          {tab.institutions.length} rejected institutes
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap">
                    {tab.institutions.map((institution, index) => (
                      <Card key={index} className="">
                        <CardHeader className="p-4">
                          <CardTitle className="flex items-center">
                            <Building2 size={18} className="mr-2" />
                            {institution.name}
                          </CardTitle>
                          <CardDescription>{institution.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-4 pb-2">
                          <CardDescription>{institution.phone}</CardDescription>
                        </CardContent>
                        {tab.name === "Pending" && (
                          <CardFooter className="w-full grid grid-cols-2 px-4 pb-4 gap-2">
                            <Dialog>
                              <DialogTrigger className="col-span-2 w-full">
                                <Button className="px-4 py-2 text-sm rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-full">
                                  View Proofs
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="p-6">
                                <DialogHeader>
                                  <DialogTitle className="text-indigo-500 dark:text-indigo-500 font-spaceGrotesk">
                                    Institute Proofs
                                  </DialogTitle>
                                  <DialogDescription className="flex flex-col items-start gap-y-2 font-spaceGrotesk">
                                    These are the proofs submitted by the
                                    institute.
                                    {institution.proof.map((proof, index) => {
                                      return (
                                        <a
                                          key={index}
                                          href={proof}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="px-4 py-2 text-sm rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
                                          disabled={isLoading}
                                        >
                                          View Proof {index + 1}
                                        </a>
                                      );
                                    })}
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>

                            <Button
                              className="px-4 py-2 text-sm rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
                              disabled={isLoading}
                              onClick={() =>
                                handleApproveInstitute(institution.id, "true")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              className="px-4 py-2 text-sm rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
                              disabled={isLoading}
                              onClick={() =>
                                handleApproveInstitute(institution.id, "false")
                              }
                            >
                              Reject
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Institutes;
