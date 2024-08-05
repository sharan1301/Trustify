import { Maximize, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PreviewTemplates = ({ templates, deleteCertificateTemplate }) => {
  if (templates.length === 0)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-neutral-900 dark:text-gray-400">
          No templates uploaded yet.
        </p>
      </div>
    );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-mt-1 gap-y-4">
        {templates.map((template, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/4">
            <Card>
              <CardHeader className="px-4 pt-3 pb-2">
                <CardTitle className="text-lg p-0">
                  Template {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="relative cursor-pointer w-full">
                  <img
                    src={template}
                    alt={`Template ${index + 1}`}
                    className="object-cover h-40 w-full"
                  />
                  <AlertDialog>
                    <AlertDialogTrigger className="absolute top-1 right-1 text-red-900">
                      <Trash className="size-5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="py-4 px-6 font-spaceGrotesk bg-neutral-50">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You cannot undo this action. This will permanently
                          delete the template.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-base rounded dark:bg-slate-600/30 dark:border-slate-800/70 border-slate-800/30 border-2 dark:text-gray-50 text-slate-600 dark:hover:bg-slate-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-slate-300/60">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="text-base rounded dark:bg-red-600/30 dark:border-red-800/40 border-red-800/40 border-2 dark:text-gray-50 text-red-600 dark:hover:bg-red-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-red-300/60"
                          onClick={() => deleteCertificateTemplate(template)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Dialog>
                    <DialogTrigger className="absolute bottom-1 right-1">
                      <Maximize className="size-5" />
                    </DialogTrigger>
                    <DialogContent className={"sm:max-w-4xl p-2 sm:w-fit"}>
                      <img
                        src={template}
                        alt={`Template ${index + 1}`}
                        className="my-4 px-4 rounded-md"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PreviewTemplates;
