import { LayoutTemplate, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogTitle } from "@radix-ui/react-dialog";

const PreviewCertificateFormat = ({
  certificateFormats,
  deleteCertificateFormat,
}) => {
  if (certificateFormats.length === 0)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-neutral-900 dark:text-gray-400">
          No certificate formats added yet.
        </p>
      </div>
    );

  return (
    <ScrollArea className="h-[62dvh]">
      {certificateFormats.map((certificateFormat, index) => (
        <Dialog>
          <DialogTrigger className="w-full">
            <Card
              key={index}
              className="group max-w-[334px] w-full flex items-center justify-between mb-2"
            >
              <CardHeader className="py-2 pl-4 pr-2 flex items-start">
                <CardTitle className="text-lg flex items-center gap-x-1 text-neutral-900 dark:text-neutral-200">
                  <LayoutTemplate size={20} />
                  Certificate Format {index + 1}
                </CardTitle>
                <CardDescription>{certificateFormat.name}</CardDescription>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent className="p-4 font-spaceGrotesk">
            <DialogHeader>
              <DialogTitle className="text-indigo-500 text-lg flex items-center gap-x-2">
                <span className="flex items-center justify-center gap-x-1">
                  <LayoutTemplate size={20} />
                  {certificateFormat.name}
                </span>
                <Trash
                  size={20}
                  className="dark:text-red-600/50 text-red-600 cursor-pointer"
                  onClick={() => deleteCertificateFormat(certificateFormat.id)}
                />
              </DialogTitle>
              <DialogDescription>
                <div className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-col gap-y-1 items-start">
                    <label className="dark:text-indigo-300 text-indigo-500">
                      Title
                    </label>
                    <p className="dark:text-neutral-200 text-neutral-900">
                      {certificateFormat.title}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-1 items-start">
                    <label className="dark:text-indigo-300 text-indigo-500">
                      Description 1
                    </label>
                    <p className="dark:text-neutral-200 text-neutral-900">
                      {certificateFormat.description1}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-1 items-start">
                    <label className="dark:text-indigo-300 text-indigo-500">
                      Description 2
                    </label>
                    <p className="dark:text-neutral-200 text-neutral-900">
                      {certificateFormat.description2}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-1 items-start">
                    <label className="dark:text-indigo-300 text-indigo-500">
                      Signer Name
                    </label>
                    <p className="dark:text-neutral-200 text-neutral-900">
                      {certificateFormat.signerName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-1 items-start">
                    <label className="dark:text-indigo-300 text-indigo-500">
                      Signer Designation
                    </label>
                    <p className="dark:text-neutral-200 text-neutral-900">
                      {certificateFormat.signerDesignation}
                    </p>
                  </div>
                  <div className="flex gap-x-4">
                    <Button
                      className="text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-500/60 transition-colors duration-300 bg-transparent hover:bg-indigo-300/60 w-fit-content"
                      onClick={() => {
                        window.open(certificateFormat.templateUrl, "_blank");
                      }}
                    >
                      View Template
                    </Button>
                    <Button
                      className="text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-500/60 transition-colors duration-300 bg-transparent hover:bg-indigo-300/60 w-fit-content"
                      onClick={() => {
                        window.open(certificateFormat.signatureUrl, "_blank");
                      }}
                    >
                      View Signature
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </ScrollArea>
  );
};

export default PreviewCertificateFormat;
