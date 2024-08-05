import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/utils";

const GenerateCertificateForm = ({
  certificateFormats,
  users,
  generateCertificate,
}) => {
  const [isCertificateFormatBoxOpen, setIsCertificateFormatBoxOpen] =
    useState(false);
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const schema = z.object({
    certificateFormatId: z.string({
      required_error: "Please select a certificate format.",
    }),
    userId: z.string({
      required_error: "Please select a user.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  certificateFormats = certificateFormats.map((certificateFormat) => {
    return {
      label: certificateFormat.name,
      value: certificateFormat.id,
    };
  });

  users = users.map((user) => {
    return {
      label: user.name,
      value: user.id,
    };
  });

  const onSubmit = (data) => {
    setIsPending(true);
    generateCertificate(data)
      .then(() => {
        form.reset();
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="certificateFormatId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Certificate Format</FormLabel>
              <Popover
                open={isCertificateFormatBoxOpen}
                onOpenChange={setIsCertificateFormatBoxOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between font-spaceGrotesk",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? certificateFormats.find(
                            (certificateFormat) =>
                              certificateFormat.value === field.value
                          )?.label
                        : "Select Certificate Format"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      className="font-spaceGrotesk"
                      placeholder="Search certificate format..."
                    />
                    <CommandEmpty className="py-4 text-center text-sm font-spaceGrotesk">
                      No certificate format found.
                    </CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {certificateFormats.map((certificateFormat, index) => (
                          <CommandItem
                            className="font-spaceGrotesk"
                            value={certificateFormat.label}
                            key={index}
                            onSelect={() => {
                              form.setValue(
                                "certificateFormatId",
                                certificateFormat.value
                              );
                              setIsCertificateFormatBoxOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                certificateFormat.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {certificateFormat.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>User</FormLabel>
              <Popover open={isUserBoxOpen} onOpenChange={setIsUserBoxOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between font-spaceGrotesk",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? users.find((user) => user.value === field.value)
                            ?.label
                        : "Select User"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      className="font-spaceGrotesk"
                      placeholder="Search user..."
                    />
                    <CommandEmpty className="py-4 text-center text-sm font-spaceGrotesk">
                      No user found.
                    </CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {users.map((user, index) => (
                          <CommandItem
                            className="font-spaceGrotesk"
                            value={user.label}
                            key={index}
                            onSelect={() => {
                              form.setValue("userId", user.value);
                              setIsUserBoxOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                user.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {user.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "px-8 py-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-full bg-transparent hover:bg-transparent",
            isPending && "cursor-not-allowed"
          )}
        >
          Generate Certificate
        </Button>
      </form>
    </Form>
  );
};

export default GenerateCertificateForm;
