import { z } from "zod";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { useInstituteContext } from "@/context/InstituteContext";

import { User, Institution, Admin } from "@/constants";

import AdminLogin from "./components/AdminLogin";
import InstituteLogin from "./components/InstituteLogin";
import UserLogin from "./components/UserLogin";

const LoginLayout = () => {
  const { auth } = useInstituteContext();
  const pathname = useLocation().pathname;
  const [bgImage, setBgImage] = useState(Institution);

  const adminSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  });

  const adminDefaultValues = {
    username: "",
    password: "",
  };

  const userSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const userDefaultValues = {
    email: "",
    password: "",
  };

  const instituteSchema = z.object({
    name: z.string().min(1, "Institute name is required"),
    code: z.string().min(1, "Institute code is required"),
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    otp: z.string().optional(),
  });

  const instituteDefaultValues = {
    name: "",
    code: "",
    email: "",
    password: "",
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
      <div className="flex items-center justify-center w-full mx-4">
        {pathname === "/login/user" && (
          <UserLogin schema={userSchema} defaultValues={userDefaultValues} />
        )}
        {pathname === "/login/institute" && (
          <InstituteLogin
            schema={instituteSchema}
            defaultValues={instituteDefaultValues}
            handleBgImage={handleBgImage}
          />
        )}
        {pathname === "/login/admin" && (
          <AdminLogin schema={adminSchema} defaultValues={adminDefaultValues} />
        )}
      </div>
      <img
        src={
          pathname === "/login/user"
            ? User
            : pathname === "/login/institute"
            ? bgImage
            : Admin
        }
        alt="Login Image"
        className="hidden lg:block object-cover dark:brightness-[0.2] dark:grayscale h-full"
      />
    </div>
  );
};

export default LoginLayout;
