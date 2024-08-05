import { useState } from "react";

import { useInstituteContext } from "@/context/InstituteContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomBreadCrumbs from "@/components/CustomBreadCrumbs/CustomBreadCrumbs";
import UploadFile from "@/components/UploadFile/UploadFile";

import PreviewTemplates from "./components/PreviewTemplates";

import { cn } from "@/utils";

const UploadTemplate = () => {
  const {
    institute,
    handleInstituteUploadCertificateTemplate,
    handleInstituteDeleteCertificateTemplate,
  } = useInstituteContext();

  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [templateUrls, setTemplateUrls] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const openUploadDialog = (value) => setShowUploadDialog(value);

  const onUploadTemplates = () => {
    setIsPending(true);
    handleInstituteUploadCertificateTemplate(templateUrls);
    setTemplateUrls([]);
    setIsPending(false);
  };

  const deleteCertificateTemplate = async (templateUrl) => {
    setIsPending(true);
    await handleInstituteDeleteCertificateTemplate({
      templateUrl,
    });
    setIsPending(false);
  };

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
    currentPage: "Upload Template",
  };

  return (
    <div className="flex flex-col gap-y-2 mx-6">
      <CustomBreadCrumbs {...breadcrumbItems} />
      <Card className="h-full bg-transparent border-none dark:border-none dark:bg-transparent">
        <CardHeader className="py-4 px-2">
          <CardTitle>Upload Template</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center flex-col gap-y-12">
          <Card
            className={cn(
              "w-full",
              institute.templates ? "max-h-fit" : "h-[340px]"
            )}
          >
            <CardHeader className="p-4">
              <CardTitle>Your Templates</CardTitle>
              <CardDescription>
                Click on the template for preview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreviewTemplates
                templates={institute.templates || []}
                deleteCertificateTemplate={deleteCertificateTemplate}
              />
            </CardContent>
          </Card>
          <Button
            className="px-8 py-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-fit bg-transparent hover:bg-transparent"
            onClick={() => openUploadDialog(true)}
            disabled={isPending}
          >
            Upload Templates
          </Button>
          <Dialog open={showUploadDialog} onOpenChange={openUploadDialog}>
            <DialogContent className="sm:max-w-[425px] font-spaceGrotesk">
              <DialogHeader className="dark:text-neutral-100 text-neutral-900">
                <DialogTitle className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  Upload your templates
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 pt-4">
                <UploadFile
                  setUrls={setTemplateUrls}
                  tag={"Certificate Template"}
                  path={`${institute.name}/Templates`}
                />
              </div>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    onClick={() => {
                      if (templateUrls.length !== 0) {
                        onUploadTemplates();
                      } else {
                        toast.error("You haven't uploaded any proof yet");
                      }
                    }}
                    className="text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-indigo-300/60"
                  >
                    Done
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadTemplate;
