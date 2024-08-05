import { Link } from "react-router-dom";

import { Trustify } from "@/constants";

const Hero = () => {
  return (
    <section className="dark:text-neutral-100">
      <div className="sm:px-24 flex flex-col justify-center p-6 mx-auto py-12 lg:py-20 lg:pb-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-4xl font-bold leading-none sm:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Tamper&nbsp;Proof
            </span>
            <span className="dark:text-neutral-100"> Certificates</span>
          </h1>
          <p className="mt-6 mb-4 text-sm sm:text-base">
            A Decentralized Certificate Issuance and Verification System to
            create certificates that are Immutable, Cryptographically Secured,
            and have Zero Downtime.
            <br />
            <p className="mt-8 sm:mt-14 text-base">What are you looking for</p>
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link className="px-8 py-3 text-lg font-medium sm:uppercase rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300">
              Issue Certificates
            </Link>
            <Link className="px-8 py-3 text-lg font-medium sm:uppercase rounded dark:border-gray-800 border-2 border-black/20 dark:hover:bg-neutral-900/70 transition-colors duration-300">
              Verify
            </Link>
          </div>
        </div>
        <div className="max-lg:hidden flex items-center justify-center pt-2 p-6 sm:mt-8 lg:mt-0 absolute top-0 right-0 w-[70%]">
          <img src={Trustify} alt="Hero Image" className="object-contain" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
