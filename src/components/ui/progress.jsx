import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-neutral-900 transition-all dark:bg-neutral-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

const ProgressBar = ({ progress, className }) => {
  return (
    <div className="h-1 relative">
      <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-gray-200 rounded-full"></div>
      <div
        style={{
          width: `${progress}%`,
        }}
        className={cn(
          "absolute top-0 bottom-0 left-0 h-full transition-all duration-150 bg-purple-500 rounded-full",
          className
        )}
      ></div>
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-full h-full"></div>
    </div>
  );
};

export default ProgressBar;

export { Progress };
