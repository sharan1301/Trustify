import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("/");

  let location = useLocation();
  useEffect(() => {
    setCurrentPage(location ? location.pathname : "/");
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userType,
        setUserType,
        currentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("useAppContext must be used within a AppProvider");

  return context;
};
