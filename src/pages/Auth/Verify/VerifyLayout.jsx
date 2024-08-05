import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

import { useInstituteContext } from "@/context/InstituteContext";

import { Upload } from "@/constants";

import InstituteVerify from "./components/InstituteVerify";

const VerifyLayout = () => {
  const { auth } = useInstituteContext();

  if (!auth) {
    toast.error("Login to access this page");
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="pt-24 lg:pt-0 max-lg:pb-10 h-[100dvh] flex items-center justify-center lg:grid lg:grid-cols-2 overflow-hidden">
      <img
        src={Upload}
        alt="Upload File Image"
        className="hidden lg:block bg-fixed object-cover dark:brightness-[0.2] dark:grayscale h-full"
      />
      <div className="flex items-center justify-center w-full mx-4">
        <InstituteVerify />
      </div>
    </div>
  );
};

export default VerifyLayout;
