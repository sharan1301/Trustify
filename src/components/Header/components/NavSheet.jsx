import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useMediaQuery } from "react-responsive";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  LogOut,
  LucideChevronRight,
  Paintbrush,
  LayoutDashboard,
} from "lucide-react";

import { useAppContext } from "@/context/AppContext";
import { useAdminContext } from "@/context/AdminContext";
import { useInstituteContext } from "@/context/InstituteContext";
import { useUserContext } from "@/context/UserContext";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import ThemeSwitcher from "./ThemeSwitcher";

import { Logo, navItems } from "@/constants";
import { cn } from "@/utils";

const NavSheet = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 820px)" });
  const { userType, currentPage } = useAppContext();
  const { handleAdminLogout } = useAdminContext();
  const { handleInstituteLogout } = useInstituteContext();
  const { handleUserLogout } = useUserContext();
  const [isOpened, setIsOpened] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navigateToDashboard = () => {
    if (userType === "institute") navigate("/institute");
    if (userType === "user") navigate("/user");
    if (userType === "admin") navigate("/admin");
  };

  const handleLogout = () => {
    if (userType === "institute") handleInstituteLogout();
    if (userType === "admin") handleAdminLogout();
    if (userType === "user") handleUserLogout();
  };

  if (!mounted) return null;
  return (
    <div className="flex items-center m-3 justify-between">
      <div className="flex flex-1 gap-x-2 items-center">
        <img src={Logo} alt="Trustify Logo" className="size-9" />
        <p className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-semibold text-xl">
          Trustify
        </p>
      </div>
      {isMobile && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="mr-4 !bg-transparent"
            >
              <Paintbrush
                height={20}
                width={20}
                className="dark:text-indigo-500 text-indigo-500"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={15} asChild>
            <ThemeSwitcher />
          </PopoverContent>
        </Popover>
      )}
      <Sheet open={isOpened} onOpenChange={setIsOpened}>
        <SheetTrigger>
          <HamburgerMenuIcon className="text-indigo-500 dark:text-indigo-500 size-10 p-2 rounded-md border dark:border-neutral-800" />
        </SheetTrigger>
        <SheetContent side="top" className="h-[70%] p-0 flex flex-col gap-y-0">
          <SheetHeader className="px-2 py-3 font-spaceGrotesk">
            <SheetTitle>
              <div className="flex gap-x-2 items-center">
                <img src={Logo} alt="Trustify Logo" className="size-9" />
                <p className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-semibold text-xl">
                  Trustify
                </p>
              </div>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="flex-1">
            <Separator />
            <ul className="mb-1 mt-2 flex flex-col gap-y-3 pl-2 pr-4 pb-3">
              {navItems.slice(0, 4).map((item) => {
                return (
                  <li
                    key={item.id}
                    className={cn(
                      "w-full rounded-md text-start transition-all duration-300 ease-in-out dark:hover:bg-white/10 hover:bg-indigo-500/65",
                      currentPage === item.path &&
                        "bg-indigo-500/65 dark:bg-white/10 text-neutral-100"
                    )}
                    onClick={() => setIsOpened(false)}
                  >
                    <HashLink
                      smooth
                      to={item.path}
                      className="group flex items-center justify-between py-1 pr-2 hover:text-neutral-100 font-spaceGrotesk"
                    >
                      <div className="group flex gap-x-2 justify-center items-center px-3 py-1 lg:px-4 xl:px-5 xl:py-1.5">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                      <LucideChevronRight className="-translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                    </HashLink>
                  </li>
                );
              })}
              {navItems.slice(4).map((item) => {
                if (userType !== "" && item.title === "Login") return;
                return (
                  <HashLink
                    key={item.title}
                    smooth
                    to={item.path}
                    onClick={() => setIsOpened(false)}
                    className={
                      "px-4 py-[5px] font-medium rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/50 transition-colors duration-300"
                    }
                  >
                    <div className="flex gap-x-2 justify-center items-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </HashLink>
                );
              })}
              {userType !== "" &&
                ((userType === "institute" && currentPage !== "/institute") ||
                  (userType === "user" && currentPage !== "/user") ||
                  (userType === "admin" && currentPage !== "/admin")) && (
                  <div
                    className="px-4 py-[5px] font-medium rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/50 transition-colors duration-300 font-spaceGrotesk"
                    onClick={navigateToDashboard}
                  >
                    <div className="flex gap-x-2 justify-center items-center">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </div>
                  </div>
                )}
            </ul>
            <Separator />
            {userType !== "" && (
              <SheetClose>
                <div
                  className="rounded-md text-start transition-all duration-300 ease-in-out dark:hover:bg-white/10 hover:bg-indigo-500/65 ml-2 mr-4 mt-3"
                  onClick={handleLogout}
                >
                  <div className="group flex items-center justify-between py-1 pr-2 hover:text-neutral-100 font-spaceGrotesk">
                    <div className="group flex gap-x-2 justify-center items-center px-3 py-1 lg:px-4 xl:px-5 xl:py-1.5">
                      <LogOut size={20} />
                      <span>Logout</span>
                    </div>
                    <LucideChevronRight className="-translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </div>
              </SheetClose>
            )}
          </SheetDescription>
          <SheetFooter>
            <span className="text-center text-neutral-500 dark:text-neutral-500 font-spaceGrotesk text-xs">
              Trustify &copy; {new Date().getFullYear()}
            </span>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavSheet;
