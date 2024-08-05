import { Link } from "react-router-dom";

const NotFound = () => {
  return <main class="h-screen w-full flex flex-col justify-center items-center dark:bg-black">
    <h1 class="text-9xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-widest">404</h1>
    <div class="bg-indigo-500 text-neutral-900 dark:text-neutral-100 px-2 py-1 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <Link to="/" className="mt-5 px-3 py-1 text-lg rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300">
      Home
    </Link>
  </main>
};

export default NotFound;
