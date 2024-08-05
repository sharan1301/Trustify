import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";

import { ResetPassword } from "@/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import InstituteResetPassword from "./components/InstituteResetPassword";

const ResetPasswordLayout = () => {
  const pathname = useLocation().pathname;
  const InstituteResetPasswordSchema = z
    .object({
      password: z.string().min(8, {
        message: "Password must be at least 8 characters",
      }),
      confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <div className="pt-24 lg:pt-0 max-lg:pb-10 h-[100dvh] flex items-center justify-center lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="flex items-center justify-center w-full mx-4">
        <Card className="w-full md:max-w-sm">
          <CardHeader className="py-4">
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Reset Password
            </CardTitle>
            <CardDescription>Enter your new password.</CardDescription>
          </CardHeader>
          <CardContent>
            {pathname === "/institute/reset-password" && (
              <InstituteResetPassword schema={InstituteResetPasswordSchema} />
            )}
          </CardContent>
        </Card>
      </div>
      <img
        src={ResetPassword}
        alt="Reset Password Image"
        className="hidden lg:block object-cover dark:brightness-[0.2] dark:grayscale h-full"
      />
    </div>
  );
};

export default ResetPasswordLayout;
