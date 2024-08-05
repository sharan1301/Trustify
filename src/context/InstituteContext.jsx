import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useDisconnect,
  useWeb3Modal,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";

//api
import {
  apiAddCertificateFormat,
  apiInstituteRegister,
  apiInstituteLogin,
  apiInstituteVerifyEmail,
  apiUploadProof,
  apiInstituteDetails,
  apiInstituteForgotPassword,
  apiInstituteResetPassword,
  apiUploadCertificateTemplate,
  apiDeleteCertificateTemplate,
  apiDeleteCertificateFormat,
  apiAddUser,
  apiGenerateCertificate,
  apiRemoveUser,
} from "@/api";

import { OTP } from "@/constants";
import Cookies from "js-cookie";

import { useAppContext } from "./AppContext";

import { abi } from "@/constants/abi";

export const InstituteContext = React.createContext();

export const InstituteProvider = ({ children }) => {
  const { setUserType, setIsLoading } = useAppContext();
  const [auth, setAuth] = useState(false);
  const [institute, setInstitute] = useState({
    id: "",
    name: "",
    code: "",
    email: "",
    phone: "",
    proof: [],
    templates: [],
    certificateFormats: [],
    users: [],
    isApproved: false,
    isEmailVerified: false,
  });

  //web3modal
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const viewWallet = () => open();

  const connectWallet = () => {
    try {
      open();
      toast.success("Wallet connected successfully.");
    } catch (error) {
      toast.error("Error connecting wallet.");
    }
  };
  const disconnectWallet = () => {
    try {
      disconnect();
      toast.success("Wallet disconnected successfully.");
    } catch (error) {
      toast.error("Error disconnecting wallet.");
    }
  };

  const generateCertificateHash = async ({
    instituteId,
    userId,
    certificateFormatId,
  }) => {
    if (!isConnected)
      return toast.error("Connect your wallet to generate certificate");

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = ethersProvider.getSigner();
    const contract = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      signer
    );

    const hashValue = await contract.storeCertificate(
      instituteId,
      userId,
      certificateFormatId
    );

    return hashValue.hash;
  };

  const navigate = useNavigate();
  const INSTITUTE_DASHBOARD = "/institute";
  const PROOF_UPLOAD_PATH = "/institute/verify";

  const refreshInstitute = async () => {
    const token = Cookies.get("token");

    setIsLoading(true);

    if (token) {
      apiInstituteDetails()
        .then((data) => {
          setAuth(true);
          setInstitute(data);
          setUserType("institute");
        })
        .finally(() => setIsLoading(false));
    } else {
      Cookies.remove("token");
      setAuth(false);
      setInstitute({
        name: "",
        code: "",
        email: "",
        phone: "",
        proof: [],
        templates: [],
        certificateFormats: [],
        users: [],
        isApproved: false,
        isEmailVerified: false,
      });
      setUserType("");
      setIsLoading(false);
    }
  };

  //registration
  const handleInstituteRegister = async (data, setShowOTP, handleBgImage) => {
    toast.promise(apiInstituteRegister({ ...data }), {
      loading: "Registering...",
      success: (message) => {
        setShowOTP(true);
        handleBgImage(OTP);
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //login
  const handleInstituteLogin = async (data, setShowOTP, handleBgImage) => {
    toast.promise(apiInstituteLogin({ ...data }), {
      loading: "Logging in...",
      success: (data) => {
        setUserType("institute");
        setInstitute(data.institute);
        setAuth(true);
        //navigate to the proof upload page after the email is verified
        if (
          data.institute.isEmailVerified &&
          data.institute.proof.length === 0
        ) {
          setShowOTP(true);
          handleBgImage(OTP);
          navigate(PROOF_UPLOAD_PATH, { replace: true });
          return data.message;
        }

        //navigate to the dashboard after the email is verified and the institute has already uploaded the proof
        if (data.institute.isEmailVerified)
          navigate(INSTITUTE_DASHBOARD, { replace: true });

        return data.message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //logout
  const handleInstituteLogout = async () => {
    Cookies.remove("token");
    disconnectWallet();
    navigate("/", {
      replace: true,
    });
    setAuth(false);
    setInstitute({
      name: "",
      code: "",
      email: "",
      phone: "",
      proof: [],
      isApproved: false,
      isEmailVerified: false,
    });
    setUserType("");
    toast.success("Logged out successfully");
  };

  //verify email
  const handleInstituteVerifyEmail = async (data) => {
    toast.promise(apiInstituteVerifyEmail({ ...data }), {
      loading: "Verifying...",
      success: (data) => {
        setUserType("institute");
        setInstitute(data.institute);
        setAuth(true);

        //navigate to the proof upload page after the email is verified
        if (
          data.institute.isEmailVerified &&
          data.institute.proof.length === 0
        ) {
          navigate(PROOF_UPLOAD_PATH, { replace: true });
          return data.message;
        }

        //navigate to the dashboard after the email is verified and the institute has already uploaded the proof
        if (data.institute.isEmailVerified)
          navigate(INSTITUTE_DASHBOARD, { replace: true });

        return data.message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //upload proof
  const handleInstituteProofUpload = async (data) => {
    return toast.promise(apiUploadProof({ proof: data }), {
      loading: "Uploading...",
      success: (message) => {
        // navigate(INSTITUTE_DASHBOARD, { replace: true });
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //send reset password link
  const handleInstituteForgotPassword = async (data) => {
    toast.promise(apiInstituteForgotPassword({ ...data }), {
      loading: "Sending reset link...",
      success: (message) => message,
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //update password
  const handleInstituteResetPassword = async (data) => {
    toast.promise(apiInstituteResetPassword({ ...data }), {
      loading: "Updating...",
      success: (message) => {
        navigate("/institute/login", { replace: true });
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //upload certificate template
  const handleInstituteUploadCertificateTemplate = async (data) => {
    return toast.promise(apiUploadCertificateTemplate({ template: data }), {
      loading: "Uploading...",
      success: (message) => {
        refreshInstitute();
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //delete a certificate template
  const handleInstituteDeleteCertificateTemplate = async (data) => {
    return toast.promise(apiDeleteCertificateTemplate({ ...data }), {
      loading: "Deleting...",
      success: (message) => {
        refreshInstitute();
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //add certificate format
  const handleInstituteAddCertificateFormat = async (data) => {
    toast.promise(apiAddCertificateFormat({ ...data }), {
      loading: "Adding...",
      success: (message) => {
        refreshInstitute();
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //delete a certificate format
  const handleInstituteDeleteCertificateFormat = async (data) => {
    return toast.promise(apiDeleteCertificateFormat({ ...data }), {
      loading: "Deleting...",
      success: (message) => {
        refreshInstitute();
        return message;
      },
      error: (err) => {
        console.error(err);
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //add a user to the institute
  const handleInstituteAddUser = async (data) => {
    return toast.promise(apiAddUser({ ...data }), {
      loading: "Adding user...",
      success: (message) => {
        refreshInstitute();
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //remove a user from the institute
  const handleInstituteRemoveUser = async (data) => {
    toast.promise(apiRemoveUser({ ...data }), {
      loading: "Removing user...",
      success: (message) => {
        refreshInstitute();
        return message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //generate certificate for the user with the selected certificate format
  const handleInstituteGenerateCertificate = async (data) => {
    const hashValue = await generateCertificateHash({
      instituteId: institute.id,
      userId: data.userId,
      certificateFormatId: data.certificateFormatId,
    });
    toast.promise(
      apiGenerateCertificate({
        ...data,
        certificateHashcode: hashValue,
      }),
      {
        loading: "Generating Certificate...",
        success: (message) => {
          refreshInstitute();
          return message;
        },
        error: (err) => {
          return typeof err === "object" ? "Something went wrong..." : err;
        },
      }
    );
  };

  useEffect(() => {
    refreshInstitute();
  }, [auth]);

  return (
    <InstituteContext.Provider
      value={{
        auth,
        setAuth,
        institute,
        setInstitute,
        refreshInstitute,
        handleInstituteRegister,
        handleInstituteLogin,
        handleInstituteLogout,
        handleInstituteVerifyEmail,
        handleInstituteProofUpload,
        handleInstituteForgotPassword,
        handleInstituteResetPassword,
        handleInstituteUploadCertificateTemplate,
        handleInstituteDeleteCertificateTemplate,
        handleInstituteAddCertificateFormat,
        handleInstituteDeleteCertificateFormat,
        handleInstituteAddUser,
        handleInstituteGenerateCertificate,
        handleInstituteRemoveUser,
        //web3modal
        address,
        chainId,
        isConnected,
        walletProvider,
        connectWallet,
        disconnectWallet,
        viewWallet,
      }}
    >
      {children}
    </InstituteContext.Provider>
  );
};

export const useInstituteContext = () => {
  const context = useContext(InstituteContext);

  if (context === undefined)
    throw new Error(
      "useInstituteContext must be used within a InstituteProvider"
    );

  return context;
};
