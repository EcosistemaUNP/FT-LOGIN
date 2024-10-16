import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AutenticacionProvider } from "./providers/AutenticacionProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  // El componente AutenticacionProvider envuelve al componente Login para validar token de autenticacion
  <AutenticacionProvider>
    <App />
    <ToastContainer />
  </AutenticacionProvider>
);
