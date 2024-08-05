import { Maximize } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PreviewCertificates = ({ formats }) => {
  if (formats.length === 0)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-neutral-900 dark:text-gray-400">
          No certificates generated yet.
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
        {formats.map((format, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/4">
            <Card>
              <CardHeader className="px-3 pt-1 pb-2">
                <CardTitle className="text-lg p-0">{format.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center pb-3 px-3">
                <div className="relative cursor-pointer w-full">
                  <img
                    src={format.url}
                    alt={`Certificate ${index + 1}`}
                    className="object-fill h-40 w-full"
                  />
                  <Dialog>
                    <DialogTrigger className="absolute bottom-1 right-1">
                      <Maximize className="size-5 text-neutral-950" />
                    </DialogTrigger>
                    <DialogContent className={"sm:max-w-4xl p-2 sm:w-fit"}>
                      <img
                        src={format.url}
                        alt={`Certificate ${index + 1}`}
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

export default PreviewCertificates;
