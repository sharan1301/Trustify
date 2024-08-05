import { useState } from "react";

import { useInstituteContext } from "@/context/InstituteContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";
import CertificateFormatForm from "./components/CertificateFormatForm";
import PreviewCertificateFormat from "./components/PreviewCertificateFormat";

const AddCertificateFormat = () => {
  const {
    institute,
    handleInstituteAddCertificateFormat,
    handleInstituteDeleteCertificateFormat,
  } = useInstituteContext();
  const [certificateFormat, setCertificateFormat] = useState({
    name: "",
    title: "",
    description1: "",
    description2: "",
    templateUrl: "",
    signerName: "",
    signerDesignation: "",
    signatureUrl: "",
  });
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
    currentPage: "Add Certificate Format",
  };

  const handleSubmit = async () => {
    await handleInstituteAddCertificateFormat(certificateFormat);
  };

  const deleteCertificateFormat = async (certificateFormatId) =>
    await handleInstituteDeleteCertificateFormat({
      certificateFormatId,
    });
  return (
    <div className="flex flex-col gap-y-[5px] gap-x-4 mx-6 dark:bg-black">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <Card className="h-full bg-transparent border-none dark:border-none dark:bg-transparent">
        <CardContent className="flex lg:flex-row flex-col items-center lg:items-start justify-center lg:gap-x-12 max-md:p-0 h-full gap-y-4">
          <Card className="mt-2 h-full max-w-sm w-full">
            <CardHeader className="py-4 px-6">
              <CardTitle className="text-neutral-800 dark:text-neutral-200">
                Certificate Formats
              </CardTitle>
              <CardDescription>
                These are the formats that will be used to generate certificates
              </CardDescription>
            </CardHeader>
            <CardContent className="py-0 px-6 max-lg:mb-6">
              <PreviewCertificateFormat
                certificateFormats={institute.certificateFormats}
                deleteCertificateFormat={deleteCertificateFormat}
              />
            </CardContent>
          </Card>
          {institute.templates?.length === 0 ? (
            <div className="flex justify-center items-center h-40 md:h-60">
              <p className="text-neutral-900 dark:text-gray-400">
                You cannot add a certificate format unless you upload atleast a
                certificate template.
              </p>
            </div>
          ) : (
            <CertificateFormatForm
              templateList={
                institute.templates?.length === 0 ? [] : institute.templates
              }
              certificateFormat={certificateFormat}
              setCertificateFormat={setCertificateFormat}
              handleSubmit={handleSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCertificateFormat;
