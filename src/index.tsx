import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./utils/msalConfig";

import { AuthProvider } from "eco-unp/Utils";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  <div>
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </MsalProvider>
  </div>
);
