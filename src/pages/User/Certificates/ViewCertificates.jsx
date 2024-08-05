import { useUserContext } from "@/context/UserContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";

import { cn } from "@/utils";
import PreviewCertificates from "./components/PreviewCertificates";

const ViewUserCertificates = () => {
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
    currentPage: "View Certificates",
  };

  let certificates = user?.Certificates.reduce((acc, certificate) => {
    const instituteName = certificate.Institution.name;
    const certificateFormatName = certificate.CertificateFormat.name;
    const certificateUrl = certificate.certificateUrl;

    if (!acc[instituteName]) {
      acc[instituteName] = {};
    }

    if (!acc[instituteName][certificateFormatName]) {
      acc[instituteName][certificateFormatName] = "";
    }

    acc[instituteName][certificateFormatName] = certificateUrl;

    return acc;
  }, {});

  certificates = Object.entries(certificates).map(
    ([instituteName, formats]) => ({
      name: instituteName,
      formats: Object.entries(formats).map(([name, url]) => ({
        name,
        url,
      })),
    })
  );

  console.log(certificates);

  return (
    <div className="flex flex-col h-full gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <div className="w-full h-full">
        <Card className={cn("w-full")}>
          <CardHeader className="p-4">
            <CardTitle>Your Certificate</CardTitle>
            <CardDescription>
              These are the certificates generated by the following institutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4 px-4 ">
            {(certificates || []).map((institute, index) => (
              <Card
                key={index}
                className={cn(
                  "w-full bg-transparent border-none dark:border-none dark:bg-transparent"
                )}
              >
                <CardHeader className="p-0">
                  <CardTitle>
                    {index + 1}. {institute.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <PreviewCertificates formats={institute.formats ?? []} />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewUserCertificates;
