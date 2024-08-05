import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step, Stepper, useStepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils";

const steps = [{ label: "Certificate Details" }, { label: "Signer Details" }];

const CertificateFormatForm = ({
  templateList,
  certificateFormat,
  setCertificateFormat,
  handleSubmit,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <CertificateDetailsForm
                  templateList={templateList}
                  certificateFormat={certificateFormat}
                  setCertificateFormat={setCertificateFormat}
                  handleSubmit={handleSubmit}
                />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <SignerDetailsForm
                certificateFormat={certificateFormat}
                setCertificateFormat={setCertificateFormat}
                handleSubmit={handleSubmit}
              />
            </Step>
          );
        })}
        <CertificateFormatFormFooter
          setCertificateFormat={setCertificateFormat}
        />
      </Stepper>
    </div>
  );
};

export default CertificateFormatForm;

const CertificateDetailsFormSchema = z.object({
  name: z
    .string({
      required_error: "Certificate name is required.",
    })
    .min(3, {
      message: "Certificate name must be at least 3 characters.",
    }),
  title: z
    .string({
      required_error: "Certificate title is required.",
    })
    .min(3, {
      message: "Certificate title must be at least 3 characters.",
    }),
  description1: z
    .string({
      required_error: "Description1 is required.",
    })
    .min(10, {
      message: "Description1 must be at least 10 characters.",
    }),
  description2: z
    .string({
      required_error: "Description2 is required.",
    })
    .min(10, {
      message: "Description2 must be at least 10 characters.",
    })
    .max(160, {
      message: "Description2 must not be longer than 160 characters.",
    }),
  templateUrl: z
    .string({
      required_error: "Template is required.",
    })
    .min(1, {
      message: "You need to select a template.",
    }),
});

const CertificateDetailsForm = ({
  templateList,
  certificateFormat,
  setCertificateFormat,
  handleSubmit,
}) => {
  const { nextStep } = useStepper();

  const form = useForm({
    resolver: zodResolver(CertificateDetailsFormSchema),
    defaultValues: {
      name: certificateFormat.name || "",
      title: certificateFormat.title || "",
      description1: certificateFormat.description1 || "",
      description2: certificateFormat.description2 || "",
      templateUrl: certificateFormat.templateUrl || "",
    },
  });

  const onSubmit = (data) => {
    setCertificateFormat((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  return (
    <ScrollArea className="h-[70dvh] max-w-md w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 dark:text-neutral-100 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate Format Name</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    {...field}
                    placeholder="Trustify Certificate Format..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate Title</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    {...field}
                    placeholder="Certificate of Appreciation..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description 1</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    {...field}
                    placeholder="Our Institute proudly presents this certificate to..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description 2</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value}
                    {...field}
                    placeholder="For participating in something interesting, an event organized in month-year by our institute..."
                    className="resize-x"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="templateUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {templateList.map((template, index) => (
                      <SelectItem key={index} value={template} className="py-0">
                        <div className="flex items-center justify-center gap-x-2 font-spaceGrotesk">
                          <img
                            src={template}
                            alt={`Template ${index + 1}`}
                            className="h-10 w-16 py-1"
                          />
                          <span>Template {index + 1}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <CertificateFormatFormActions
            handleSubmit={handleSubmit}
            hasError={Object.keys(form.formState.errors).length !== 0}
          />
        </form>
      </Form>
    </ScrollArea>
  );
};

const SignerDetailsFormSchema = z.object({
  signerName: z
    .string({
      required_error: "Signer name is required.",
    })
    .min(3, {
      message: "Signer name must be at least 3 characters.",
    }),
  signerDesignation: z
    .string({
      required_error: "Signer designation is required.",
    })
    .min(3, {
      message: "Signer designation must be at least 3 characters.",
    }),
  signatureUrl: z
    .string({
      required_error: "Signature is required.",
    })
    .url({
      message: "Signature URL must be a valid URL.",
    }),
});

const SignerDetailsForm = ({
  certificateFormat,
  setCertificateFormat,
  handleSubmit,
}) => {
  const { nextStep } = useStepper();

  const form = useForm({
    resolver: zodResolver(SignerDetailsFormSchema),
    defaultValues: {
      signerName: certificateFormat.signerName ?? "",
      signerDesignation: certificateFormat.signerDesignation ?? "",
      signatureUrl: certificateFormat.signatureUrl ?? "",
    },
  });

  const onSubmit = (data) => {
    setCertificateFormat((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  return (
    <ScrollArea className="h-[70dvh] max-w-md w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 dark:text-neutral-100 max-w-sm w-full"
        >
          <FormField
            control={form.control}
            name="signerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signer Name</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    {...field}
                    onChange={(e) => {
                      form.setValue("signerName", e.target.value);
                      setCertificateFormat((prev) => ({
                        ...prev,
                        signerName: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signerDesignation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signer Designation</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    {...field}
                    onChange={(e) => {
                      form.setValue("signerDesignation", e.target.value);
                      setCertificateFormat((prev) => ({
                        ...prev,
                        signerDesignation: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signatureUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signature URL</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    {...field}
                    onChange={(e) => {
                      form.trigger("signatureUrl");
                      form.setValue("signatureUrl", e.target.value);
                      setCertificateFormat((prev) => ({
                        ...prev,
                        signatureUrl: e.target.value,
                      }));
                    }}
                    onInput={(e) => {
                      form.trigger("signatureUrl");
                      form.setValue("signatureUrl", e.target.value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload the drive link of the signature image in PNG Format. The signature must be in black color.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CertificateFormatFormActions
            handleSubmit={handleSubmit}
            hasError={
              Object.keys(form.formState.errors).length !== 0 ||
              !form.formState.touchedFields["signerName"] ||
              !form.formState.touchedFields["signerDesignation"] ||
              form.getValues("signatureUrl") === ""
            }
          />
        </form>
      </Form>
    </ScrollArea>
  );
};

const CertificateFormatFormActions = ({ handleSubmit, hasError }) => {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  return (
    <div className="w-full flex justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button
          size="sm"
          className="text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-indigo-300/60"
          onClick={() => {
            handleSubmit();
            resetSteps();
          }}
        >
          Add Certificate Format
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
            className="text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-indigo-300/60"
          >
            Prev
          </Button>
          <Button
            size="sm"
            disabled={hasError}
            className={cn(
              "text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-indigo-300/60",
              hasError && "cursor-not-allowed"
            )}
            onClick={() => {
              if (!hasError && isLastStep) {
                handleSubmit();
              }
            }}
          >
            {isLastStep ? "Add" : isOptionalStep ? "Skip" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
};

const CertificateFormatFormFooter = ({ setCertificateFormat }) => {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        className="text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-500/60 transition-colors duration-300 bg-transparent hover:bg-indigo-300/60 w-fit-content"
        onClick={() => {
          resetSteps();
          setCertificateFormat({
            name: "",
            title: "",
            description1: "",
            description2: "",
            templateUrl: "",
            signerName: "",
            signerDesignation: "",
            signatureUrl: "",
          });
        }}
      >
        Add Another Certificate Format
      </Button>
    </div>
  );
};
