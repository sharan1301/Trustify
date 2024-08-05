import { Separator } from "@/components/ui/separator";
import {
  BreadcrumbLoader,
  CardLoader,
  NavbarLinkLoader,
} from "./components/SkeletonLoaders";

const DashboardLoader = () => {
  return (
    <div className="h-[100dvh] flex items-start justify-start gap-x-2">
      <div className="pt-16 md:pt-20 pb-10 max-w-56 w-full flex flex-col items-start gap-y-4 pl-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <NavbarLinkLoader key={i} />
        ))}
      </div>
      <Separator orientation="vertical" />
      <div className="pt-16 sm:pt-20 h-full flex-1">
        <div className="flex flex-col h-full gap-y-2 mx-6">
          <BreadcrumbLoader />
          <div className="flex w-full h-full items-center justify-center">
            <CardLoader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
