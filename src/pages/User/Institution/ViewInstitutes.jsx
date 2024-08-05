import { useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowUpDown, Trash } from "lucide-react";

import { useUserContext } from "@/context/UserContext";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";
import DataTable from "@/components/DataTable/DataTable";

import { Badge } from "@/components/ui/badge";

const ViewUserInstitutes = () => {
  const { user } = useUserContext();

  const breadcrumbItems = {
    previousPages: [
      {
        name: "Home",
        to: "/",
      },
      {
        name: "Dashboard",
        to: "/user",
      },
    ],
    currentPage: "View Institutes",
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
      accessorKey: "count",
      header: "Certificates",
      cell: ({ row }) => {
        const count = row.getValue("count");
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
  ];

  let certificates = user.Certificates.reduce((acc, certificate) => {
    const key = `${certificate.Institution.id}_${certificate.Institution.name}`;

    if (!acc[key]) {
      acc[key] = {
        name: certificate.Institution.name,
        email: certificate.Institution.email,
        phone: certificate.Institution.phone,
        count: 1,
      };
    } else {
      acc[key].count += 1;
    }

    return acc;
  }, {});

  certificates = Object.values(certificates);

  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <div className="flex w-full h-full items-start justify-center mt-3">
        <DataTable columns={columns} data={certificates || []} />
      </div>
    </div>
  );
};

export default ViewUserInstitutes;
