import { SunIcon, MoonIcon, DesktopIcon } from "@radix-ui/react-icons";

import { Tabs, TabsTrigger, TabsList } from "../../ui/tabs";

import { useTheme } from "@/providers/ThemeProvider";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  return (
    <Tabs defaultValue={theme} className="w-full">
      <TabsList className="border dark:border-neutral-800 dark:bg-[#030303] bg-neutral-100">
        <TabsTrigger value="light" onClick={() => handleThemeChange("light")}>
          <SunIcon className="size-[1.2rem] rotate-0 dark:rotate-180 transition-all duration-300" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => handleThemeChange("dark")}>
          <MoonIcon className="size-[1.2rem] rotate-90 dark:rotate-0 transition-all duration-300" />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => handleThemeChange("system")}>
          <DesktopIcon className="size-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
