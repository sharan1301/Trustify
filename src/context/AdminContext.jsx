import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

//api
import {
  apiAdminLogin,
  apiAdminInstitutionsDetails,
  apiAdminApproveInstitutes,
} from "@/api";

import Cookies from "js-cookie";

import { useAppContext } from "./AppContext";

export const AdminContext = React.createContext();

export const AdminProvider = ({ children }) => {
  const { setUserType, setIsLoading } = useAppContext();
  const [auth, setAuth] = useState(false);
  const [institutions, setInstitutions] = useState([]);

  const navigate = useNavigate();
  const ADMIN_DASHBOARD = "/";

  const refreshAdmin = async () => {
    const token = Cookies.get("token");

    setIsLoading(true);

    if (token) {
      apiAdminInstitutionsDetails()
        .then((data) => {
          setAuth(true);
          setInstitutions(data.institutions);
          setUserType("admin");
        })
        .finally(() => setIsLoading(false));
    } else {
      Cookies.remove("token");
      setAuth(false);
      setUserType("");
      setIsLoading(false);
    }
  };

  //login
  const handleAdminLogin = async (data) => {
    toast.promise(apiAdminLogin(data), {
      loading: "Logging in...",
      success: (data) => {
        setAuth(true);
        setUserType("admin");
        setInstitutions(data.institutions);
        navigate(ADMIN_DASHBOARD);
        return data.message;
      },
      error: (error) => {
        return error;
      },
    });
  };

  //approve/reject institute
  const handleAdminApproveInstitutes = async (data) => {
    setIsLoading(true);
    toast.promise(apiAdminApproveInstitutes(data), {
      loading: data.isApproved === "true" ? "Approving..." : "Rejecting...",
      success: (data) => {
        refreshAdmin();
        setIsLoading(false);
        return data.message;
      },
      error: (error) => {
        setIsLoading(false);
        return error;
      },
    });
  };

  //logout
  const handleAdminLogout = async () => {
    Cookies.remove("token");
    toast.success("Logged out successfully");
    navigate("/");
    setAuth(false);
    setUserType("");
  };

  useEffect(() => {
    refreshAdmin();
  }, [auth]);

  return (
    <AdminContext.Provider
      value={{
        auth,
        setAuth,
        institutions,
        handleAdminLogin,
        handleAdminLogout,
        handleAdminApproveInstitutes,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (context === undefined)
    throw new Error("useAdminContext must be used within a AdminProvider");

  return context;
};
