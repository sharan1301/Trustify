import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

//api
import { apiUserLogin } from "@/api";

import Cookies from "js-cookie";

import { useAppContext } from "./AppContext";
import { apiUserDetails } from "@/api";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { setUserType, setIsLoading } = useAppContext();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    Certificates: [],
    Institution: [],
  });

  const navigate = useNavigate();
  const USER_DASHBOARD = "/user";

  const refreshUser = async () => {
    const token = Cookies.get("token");

    setIsLoading(true);

    if (token) {
      apiUserDetails()
        .then((data) => {
          setAuth(true);
          setUser(data);
          setUserType("user");
        })
        .finally(() => setIsLoading(false));
    } else {
      Cookies.remove("token");
      setAuth(false);
      setUserType("");
      setUser({
        id: "",
        name: "",
        email: "",
        phone: "",
        Certificates: [],
        Institution: [],
      });
      setIsLoading(false);
    }
  };

  //login
  const handleUserLogin = async (data) => {
    toast.promise(apiUserLogin(data), {
      loading: "Logging in...",
      success: (data) => {
        setAuth(true);
        setUserType("user");
        setUser(data.user);
        navigate(USER_DASHBOARD, {
          replace: true,
        });
        return data.message;
      },
      error: (err) => {
        return typeof err === "object" ? "Something went wrong..." : err;
      },
    });
  };

  //logout
  const handleUserLogout = async () => {
    Cookies.remove("token");
    toast.success("Logged out successfully");
    navigate("/", {
      replace: true,
    });
    setAuth(false);
    setUser({});
    setUserType("");
  };

  useEffect(() => {
    refreshUser();
  }, [auth]);

  return (
    <UserContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
        refreshUser,
        handleUserLogout,
        handleUserLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("useUserContext must be used within a UserProvider");

  return context;
};
