import { useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowUpDown, Trash } from "lucide-react";

import { useInstituteContext } from "@/context/InstituteContext";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";
import DataTable from "@/components/DataTable/DataTable";

import { Badge } from "@/components/ui/badge";

const ViewUsers = () => {
  const { institute, handleInstituteRemoveUser } = useInstituteContext();
  const [isRemoving, startRemoving] = useTransition();

  const breadcrumbItems = {
    previousPages: [
      {
        name: "Home",
        to: "/",
      },
      {
        name: "Dashboard",
        to: "/institute",
      },
    ],
    currentPage: "View Users",
  };

  const columns = [
    {
      id: "sno",
      header: "S.No",
      cell: ({ row }) => {
        return <div>{row.index + 1}.</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "Certificates",
      header: "Certificates",
      cell: ({ row }) => {
        const certificates = row.getValue("Certificates");
        const count = certificates.length;
        return (
          <Badge
            className={
              "border-2 border-indigo-700/45 bg-indigo-500/50 dark:border-indigo-700/45 dark:bg-indigo-900/50 dark:text-neutral-100 font-normal dark:hover:bg-indigo-900/50 hover:bg-indigo-500/50"
            }
          >
            {count} {count > 1 ? "Certificates" : "Certificate"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        if (isRemoving)
          return (
            <ReloadIcon className="size-5 text-blue-900 animate-spin cursor-not-allowed" />
          );
        return (
          <Trash
            className="size-5 text-red-900 cursor-pointer"
            onClick={() => {
              startRemoving(async () => {
                await handleInstituteRemoveUser({
                  userId: row.original.id,
                });
              });
            }}
          />
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <div className="flex w-full h-full items-start justify-center mt-3">
        <DataTable columns={columns} data={institute?.users || []} />
      </div>
    </div>
  );
};

export default ViewUsers;
