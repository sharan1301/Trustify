import { Skeleton } from "@/components/ui/skeleton";

export const NavbarLinkLoader = () => (
  <>
    <div className="w-full">
      <a className="flex items-center gap-x-2 pl-4 pr-2 py-2 transition-colors">
        <svg className="size-5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
        <span className="w-full">
          <Skeleton className="h-[24px] max-w-full" />
        </span>
      </a>
    </div>
  </>
);

export const BreadcrumbLoader = () => (
  <nav>
    <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
      <li className="inline-flex items-center gap-1.5">
        <Skeleton className="h-5 w-[72px] max-w-full" />
      </li>
      <li className="[&amp;>svg]:size-3.5">
        <svg className="size-5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Skeleton className="h-5 w-[72px] max-w-full" />
      </li>
      <li className="[&amp;>svg]:size-3.5">
        <svg className="size-5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-500" />
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Skeleton className="h-5 w-[72px] max-w-full" />
      </li>
    </ol>
  </nav>
);

export const CardLoader = () => (
  <div className="flex flex-col items-center space-y-3">
    <div className="border-t-transparent border-solid animate-spin  rounded-full border-indigo-500 border-2 size-10"></div>
    <p className="text-neutral-900 dark:text-neutral-100">Loading...</p>
  </div>
);
