import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

import App from "@/App.jsx";
import "@/index.css";

//context providers
import { ThemeProvider } from "@/providers/ThemeProvider.jsx";
import { AppProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";
import { InstituteProvider } from "@/context/InstituteContext";
import { AdminProvider } from "@/context/AdminContext";

import { ScrollToTop } from "@/utils";

import { projectId, metadata, testnet } from "@/config/walletConnectConfig";

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [testnet],
  projectId,
  themeVariables: {
    "--w3m-font-family": "Space Grotesk",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        duration={2000}
        toastOptions={{
          success: {
            style: {
              background: "rgb(22, 101, 52, 0.80)",
              border: "1px solid rgb(76, 175, 80)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontFamily: "Space Grotesk",
            },
          },
          error: {
            style: {
              background: "rgb(159, 18, 57, 0.80)",
              border: "1px solid rgb(244, 67, 54)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontFamily: "Space Grotesk",
            },
          },
          loading: {
            style: {
              background: "rgb(124, 45, 18, 0.80)",
              border: "1px solid rgb(124, 45, 18)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontFamily: "Space Grotesk",
            },
          },
        }}
      />
      <AppProvider>
        <AdminProvider>
          <InstituteProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </InstituteProvider>
        </AdminProvider>
      </AppProvider>
    </BrowserRouter>
  </ThemeProvider>
);
