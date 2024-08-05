import { cn } from "@/utils";

export const BentoGrid = ({ className, children, id }) => {
  return (
    <div
      id={`${id}`}
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/10 hover:border-black/20 bg-neutral-50 border border-transparent justify-between flex flex-col gap-y-2 cursor-pointer",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-spaceGrotesk bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-bold">
          {title}
        </div>
        <div className="font-spaceGrotesk font-normal text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
