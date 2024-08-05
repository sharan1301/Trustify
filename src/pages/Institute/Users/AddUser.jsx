import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";

import AddUserForm from "./components/AddUserForm";

import { cn } from "@/utils";

const AddUser = () => {
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
    currentPage: "Add User",
  };
  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <div className="flex w-full h-full items-center justify-center">
        <Card className={cn("max-w-sm w-full")}>
          <CardHeader className="p-4">
            <CardTitle>Add User</CardTitle>
            <CardDescription>
              To generate certificates for the users, you need to add them in
              your institute.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddUserForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddUser;
