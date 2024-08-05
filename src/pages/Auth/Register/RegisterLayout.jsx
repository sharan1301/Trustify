import { z } from "zod";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { useInstituteContext } from "@/context/InstituteContext";

import { Institution } from "@/constants";

import InstituteRegister from "./components/InstituteRegister";

const RegisterLayout = () => {
  const { auth } = useInstituteContext();
  const [bgImage, setBgImage] = useState(Institution);
  const pathname = useLocation().pathname;
  const instituteSchema = z.object({
    name: z.string().min(1, "Institute name is required"),
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    phone: z.string().length(10, "Phone number must be 10 digits"),
    otp: z.string().optional(),
  });

  const instituteDefaultValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  };

  const handleBgImage = (image) => setBgImage(image);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  if (auth) {
    toast.success("You are already logged in");
    return <Navigate to="/institute" replace={true} />;
  }

  return (
    <div className="pt-24 lg:pt-0 max-lg:pb-10 h-[100dvh] flex items-center justify-center lg:grid lg:grid-cols-2 overflow-hidden">
      <img
        src={bgImage}
        alt="Register Image"
        className="hidden lg:block bg-fixed object-cover dark:brightness-[0.2] dark:grayscale h-full"
      />
      <div className="flex items-center justify-center w-full mx-4">
        {pathname === "/register/institute" && (
          <InstituteRegister
            schema={instituteSchema}
            defaultValues={instituteDefaultValues}
            handleBgImage={handleBgImage}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterLayout;
