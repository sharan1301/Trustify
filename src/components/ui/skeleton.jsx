import { cn } from "@/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-500",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
