import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useInstituteContext } from "@/context/InstituteContext";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/utils";

const InstituteRegister = ({ schema, defaultValues, handleBgImage }) => {
  const { handleInstituteRegister, handleInstituteVerifyEmail } =
    useInstituteContext();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setIsPending(true);
    if (!showOTP) {
      await handleInstituteRegister(data, setShowOTP, handleBgImage);
    } else {
      await handleInstituteVerifyEmail({
        email: data.email,
        otp: data.otp,
      });
    }
    setIsPending(false);
  };

  return (
    <Card className="w-full md:max-w-sm">
      <CardHeader className="py-4">
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
          Register As Institute
        </CardTitle>
        <CardDescription>Register to issue certificates.</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {showOTP ? (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="flex items-center justify-between gap-x-2">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            value={field.value ?? ""}
                            disabled={isPending}
                          />
                        </FormControl>
                        {showPassword ? (
                          <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            <EyeOpenIcon />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            <EyeClosedIcon />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "px-8 py-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-full bg-transparent hover:bg-transparent",
                isPending && "cursor-not-allowed"
              )}
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="pb-2">
        <span className="text-center text-sm w-full">
          Already have an account?{" "}
          <Link
            to="/login/institute"
            className="hover:bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-transparent hover:bg-clip-text hover:underline decoration-indigo-600/50 hover:font-semibold transition-colors duration-300"
          >
            Login
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};

export default InstituteRegister;
