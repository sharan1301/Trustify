import { useLocation } from "react-router-dom";
import { z } from "zod";

import { ForgotPassword } from "@/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import InstituteForgotPassword from "./components/InstituteForgotPassword";

const ForgotPasswordLayout = () => {
  const pathname = useLocation().pathname;
  const InstituteForgotPasswordSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
  });

  return (
    <div className="pt-24 lg:pt-0 max-lg:pb-10 h-[100dvh] flex items-center justify-center lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="flex items-center justify-center w-full mx-4">
        <Card className="w-full md:max-w-sm">
          <CardHeader className="py-4">
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Forgot Password
            </CardTitle>
            <CardDescription>
              Enter your email to receive the password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            {pathname === "/institute/forgot-password" && (
              <InstituteForgotPassword schema={InstituteForgotPasswordSchema} />
            )}
          </CardContent>
        </Card>
      </div>
      <img
        src={ForgotPassword}
        alt="Forgot Password Image"
        className="hidden lg:block object-cover dark:brightness-[0.2] dark:grayscale h-full"
      />
    </div>
  );
};

export default ForgotPasswordLayout;
