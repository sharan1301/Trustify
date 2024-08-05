import { useMediaQuery } from "react-responsive";

import Navbar from "./components/Navbar";
import NavSheet from "./components/NavSheet";
import { Separator } from "../ui/separator";
import { cn } from "@/utils";

const Header = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 820px)" });

  return (
    <header className={cn("fixed w-full backdrop-blur-md flex flex-col z-10")}>
      {isDesktop ? <Navbar /> : <NavSheet />}
      <Separator />
    </header>
  );
};

export default Header;
