import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useInstituteContext } from "@/context/InstituteContext";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/utils";

const InstituteForgotPassword = ({ schema }) => {
  const { handleInstituteResetPassword } = useInstituteContext();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const token = urlSearchParams.get("token");
  const email = urlSearchParams.get("email");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsPending(true);
    await handleInstituteResetPassword({
      data: {
        email,
        password: data.password,
      },
      token,
    });
    setIsPending(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  value={field.value}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className="flex items-center justify-between gap-x-2">
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    value={field.value}
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
        <Button
          type="submit"
          className={cn(
            "px-8 py-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-full bg-transparent hover:bg-transparent",
            isPending && "cursor-not-allowed"
          )}
        >
          Update Password
        </Button>
      </form>
    </Form>
  );
};

export default InstituteForgotPassword;
