import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useInstituteContext } from "@/context/InstituteContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UploadFile from "@/components/UploadFile/UploadFile";

import { cn } from "@/utils";

const InstituteVerify = () => {
  const { handleInstituteProofUpload, institute } = useInstituteContext();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [proofUrls, setProofUrls] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const openUploadDialog = (value) => setShowUploadDialog(value);
  const openSkipDialog = (value) => setShowSkipDialog(value);

  const onUploadProofs = async () => {
    setIsPending(true);
    await handleInstituteProofUpload(proofUrls);
    setIsPending(false);
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
          Upload Your Institute Proof
        </CardTitle>
        <CardDescription>
          Validate your affiliation securely and gain the access to generate{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
            tamper-proof
          </span>{" "}
          certificates.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        {proofUrls.length !== 0 && !showUploadDialog ? (
          <Button
            className={cn(
              "px-8 py-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-full bg-transparent hover:bg-transparent",
              isPending && "cursor-not-allowed"
            )}
            onClick={() => {
              if (!isPending) {
                navigate("/institute", {
                  replace: true,
                });
              }
            }}
          >
            Go to Dashboard
          </Button>
        ) : (
          <>
            <Button
              className="px-8 py-3 text-base rounded dark:bg-slate-600/30 dark:border-slate-800/70 border-slate-800/30 border-2 dark:text-gray-50 text-slate-600 dark:hover:bg-slate-600/60 transition-colors duration-300 w-full bg-transparent hover:bg-transparent"
              onClick={() => openSkipDialog(true)}
            >
              Skip
            </Button>
            <AlertDialog open={showSkipDialog} onOpenChange={openSkipDialog}>
              <AlertDialogContent className="font-spaceGrotesk bg-neutral-50">
                <AlertDialogHeader>
                  <AlertDialogTitle className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You cannot generate certificates without verifying your
                    institute.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-base rounded dark:bg-slate-600/30 dark:border-slate-800/70 border-slate-800/30 border-2 dark:text-gray-50 text-slate-600 dark:hover:bg-slate-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-slate-300/60">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="text-base rounded dark:bg-red-600/30 dark:border-red-800/40 border-red-800/40 border-2 dark:text-gray-50 text-red-600 dark:hover:bg-red-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-red-300/60"
                    onClick={() => {
                      if (!isPending) {
                        navigate("/institute", {
                          replace: true,
                        });
                      }
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              className="px-8 py-3 text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-full bg-transparent hover:bg-transparent"
              onClick={() => openUploadDialog(true)}
            >
              Upload Proof
            </Button>
            <Dialog open={showUploadDialog} onOpenChange={openUploadDialog}>
              <DialogContent className="sm:max-w-[425px] font-spaceGrotesk">
                <DialogHeader className="dark:text-neutral-100 text-neutral-900">
                  <DialogTitle className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                    Upload your files
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 pt-4">
                  <UploadFile
                    setUrls={setProofUrls}
                    path={institute.name}
                    tag={"Institute Proof"}
                  />
                </div>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        if (proofUrls.length !== 0) {
                          onUploadProofs();
                        } else {
                          toast.error("You haven't uploaded any proof yet");
                        }
                      }}
                      className="text-base rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 w-28 bg-transparent hover:bg-indigo-300/60"
                    >
                      Done
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardContent>
      <CardFooter>
        <span className="text-center text-sm w-full">
          If you skip, you can upload your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
            proof
          </span>{" "}
          later from your dashboard. But you won't be able to generate{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
            certificates
          </span>{" "}
          until then.
        </span>
      </CardFooter>
    </Card>
  );
};

export default InstituteVerify;
