import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { LogOut } from "lucide-react";

import { Logo, navItems } from "@/constants";

import { useAppContext } from "@/context/AppContext";
import { useAdminContext } from "@/context/AdminContext";
import { useInstituteContext } from "@/context/InstituteContext";
import { useUserContext } from "@/context/UserContext";

import ThemeSwitcher from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";

import { cn } from "@/utils";

const Navbar = () => {
  const { userType, currentPage } = useAppContext();
  const { handleAdminLogout } = useAdminContext();
  const { handleInstituteLogout } = useInstituteContext();
  const { handleUserLogout } = useUserContext();
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

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
    <div className="mx-4 my-3 flex justify-between">
      <Link to="/" className="flex gap-x-2 items-center">
        <img src={Logo} alt="Trustify Logo" className="size-9" />
        <p className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-semibold text-xl">
          Trustify
        </p>
      </Link>
      <div className="flex items-center gap-x-2">
        <div className="flex gap-x-2 items-center border border-neutral-300 rounded-md text-neutral-900 bg-neutral-100 py-0.5 space-x-2 px-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
          {navItems.slice(0, 4).map((item) => {
            return (
              <HashLink
                key={item.title}
                smooth
                to={item.path}
                className={cn(
                  "py-[4.5px] hover:text-indigo-500 dark:hover:text-indigo-500"
                )}
              >
                {item.title}
              </HashLink>
            );
          })}
        </div>
        {navItems.slice(4).map((item) => {
          if (userType !== "" && item.title === "Login") return;
          return (
            <HashLink
              key={item.title}
              smooth
              to={item.path}
              className={
                "px-4 py-[5px] font-medium rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/50 transition-colors duration-300"
              }
            >
              {item.title}
            </HashLink>
          );
        })}
        {userType !== "" &&
          ((userType === "institute" && currentPage !== "/institute") ||
            (userType === "user" && currentPage !== "/user") ||
            (userType === "admin" && currentPage !== "/admin")) && (
            <Button
              className="px-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/50 transition-colors duration-300 bg-transparent hover:bg-transparent"
              variant="outline"
              onClick={navigateToDashboard}
            >
              Dashboard
            </Button>
          )}
        <ThemeSwitcher />
        {userType !== "" && (
          <Button
            className="px-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/50 transition-colors duration-300 bg-transparent hover:bg-transparent"
            variant="outline"
            onClick={handleLogout}
          >
            <LogOut size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
