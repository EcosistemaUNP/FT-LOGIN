import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./utils/msalConfig";

import { AuthProvider } from "eco-unp/Utils";
import { PublicClientApplication } from "@azure/msal-browser";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().catch((error) => {
  console.error('Error al inicializar MSAL:', error);
});

root.render(
  <MsalProvider instance={msalInstance}>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </MsalProvider>
);
