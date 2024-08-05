import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useInstituteContext } from "@/context/InstituteContext";

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
import { Link } from "react-router-dom";

const InstituteForgotPassword = ({ schema }) => {
  const { handleInstituteForgotPassword } = useInstituteContext();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsPending(true);
      await handleInstituteForgotPassword(data);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  disabled={isPending || isSuccess}
                  className={cn(
                    isSuccess && "border-green-500 dark:border-green-900",
                    (isPending || isSuccess) && "cursor-not-allowed"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSuccess ? (
          <div className="flex flex-col items-center gap-y-2">
            <FormMessage className="!text-green-500 dark:!text-green-900">
              A password reset link has been sent to your email.
            </FormMessage>
            <Link
              to="/"
              className="text-sm hover:bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-transparent hover:bg-clip-text hover:underline decoration-indigo-600/50 hover:font-semibold transition-colors duration-300"
            >
              Explore Trustify
            </Link>
          </div>
        ) : (
          <Button
            type="submit"
            disabled={isPending || isSuccess}
            className={cn(
              "px-8 py-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-full bg-transparent hover:bg-transparent",
              isPending || (isSuccess && "cursor-not-allowed")
            )}
          >
            Send Reset Link
          </Button>
        )}
      </form>
    </Form>
  );
};

export default InstituteForgotPassword;
