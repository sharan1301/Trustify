import { useInstituteContext } from "@/context/InstituteContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";

import GenerateCertificateForm from "./components/GenerateCertificateForm";

import { cn } from "@/utils";

const GenerateCertificate = () => {
  const { institute, handleInstituteGenerateCertificate } =
    useInstituteContext();
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
    currentPage: "Generate Certificate",
  };

  const generateCertificate = async (data) =>
    await handleInstituteGenerateCertificate(data);

  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <div className="flex w-full h-full items-center justify-center">
        <Card className={cn("max-w-sm w-full")}>
          <CardHeader className="p-4">
            <CardTitle>Generate Certificate</CardTitle>
            <CardDescription>
              Select the certificate format and the user to generate the
              certificate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenerateCertificateForm
              certificateFormats={institute?.certificateFormats || []}
              users={institute?.users || []}
              generateCertificate={generateCertificate}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateCertificate;
