import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProgressBar from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

const FileTypes = {
  Image: "image",
  Pdf: "pdf",
  Audio: "audio",
  Video: "video",
  Other: "other",
};

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

const UploadFile = ({ setUrls, path, tag }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const getFileIconAndColor = (file) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  const onUploadProgress = (progressEvent, file, cancelSource) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
    );

    if (progress === 100) {
      setUploadedFiles((prevUploadedFiles) => {
        return [...prevUploadedFiles, file];
      });

      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.File !== file);
      });

      return;
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        if (item.File.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          };
        } else {
          return item;
        }
      });
    });
  };

  const uploadFileToCloudinary = async (
    formData,
    onUploadProgress,
    cancelSource
  ) => {
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        formData,
        {
          onUploadProgress,
          cancelToken: cancelSource.token,
        }
      );
      const { secure_url: url } = response.data;

      return url;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  };

  const removeFile = (file) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File !== file);
    });

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item !== file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setFilesToUpload((prevUploadProgress) => {
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {
          return {
            progress: 0,
            File: file,
            source: null,
          };
        }),
      ];
    });

    const fileUploadBatch = acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("public_id", file.name);
      formData.append("tags", tag);
      formData.append("folder", path);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const cancelSource = axios.CancelToken.source();
      return uploadFileToCloudinary(
        formData,
        (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
        cancelSource
      );
    });

    try {
      const uploadedUrls = await Promise.all(
        fileUploadBatch.map(async (fileUploadPromise) => {
          try {
            const url = await fileUploadPromise;
            return url;
          } catch (error) {
            toast.error("Error uploading file");
            return null;
          }
        })
      );
      const successfulUrls = uploadedUrls.filter((url) => url !== null);
      setUrls((prevUrls) => [...prevUrls, ...successfulUrls]);
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <Card
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
        >
          <CardHeader className="p-2 text-center dark:text-neutral-100 text-neutral-900">
            <CardTitle>
              <p className="border p-2 rounded-md max-w-min mx-auto">
                <UploadCloud size={20} />
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Drag files</span>
              </p>
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Click to upload files &#40;Files should be under 10 MB&#41;
            </CardDescription>
          </CardHeader>
        </Card>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-sm dark:text-neutral-100 text-neutral-900">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => {
                return (
                  <div
                    key={fileUploadProgress.File.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-300 group hover:pr-0 pr-2 hover:border-neutral-300 transition-all"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div>
                        {getFileIconAndColor(fileUploadProgress.File).icon}
                      </div>

                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="dark:text-neutral-100 text-neutral-900">
                            {fileUploadProgress.File.name.slice(0, 25)}
                          </p>
                          <span className="text-xs dark:text-neutral-100 text-neutral-900">
                            {fileUploadProgress.progress}%
                          </span>
                        </div>
                        <ProgressBar
                          progress={fileUploadProgress.progress}
                          className={
                            getFileIconAndColor(fileUploadProgress.File).color
                          }
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (fileUploadProgress.source)
                          fileUploadProgress.source.cancel("Upload cancelled");
                        removeFile(fileUploadProgress.File);
                      }}
                      className="bg-red-600/85 dark:bg-red-500/55 dark:text-neutral-100 text-neutral-200 transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-sm dark:text-neutral-100 text-neutral-900">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((file) => {
              return (
                <div
                  key={file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-300 group hover:pr-0 pr-2 hover:border-neutral-300 transition-all"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div>{getFileIconAndColor(file).icon}</div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="dark:text-neutral-100 text-neutral-900">
                          {file.name.slice(0, 25)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="bg-red-600/85 dark:bg-red-500/55 dark:text-neutral-100 text-neutral-200 transition-all items-center justify-center px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
