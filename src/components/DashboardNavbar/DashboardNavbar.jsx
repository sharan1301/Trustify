import { Link } from "react-router-dom";

import { useAppContext } from "@/context/AppContext";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/utils";

const DashboardNavbar = ({ links }) => {
  const { currentPage } = useAppContext();
  return (
    <div className="pt-16 md:pt-20 pb-10 max-w-56 w-full flex flex-col items-start gap-y-4 pl-2">
      {links.map((link, index) => (
        <TooltipProvider delayDuration={300} key={index}>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Link
                to={link.path}
                className={cn(
                  "flex items-center gap-x-2 pl-4 pr-2 py-2 rounded-md transition-colors duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-800",
                  "dark:text-neutral-100 text-neutral-950",
                  currentPage === link.path &&
                    "dark:text-indigo-500 text-indigo-500"
                )}
              >
                <link.icon className="size-5" />
                <span>{link.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side={"bottom"}>
              <p className={cn("dark:text-neutral-100 text-neutral-950")}>
                {link.name}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default DashboardNavbar;
