import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AutenticacionProvider } from "./providers/AutenticacionProvider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  // El componente AutenticacionProvider envuelve al componente Login para validar token de autenticacion
  <AutenticacionProvider>
    <App />
  </AutenticacionProvider>
);
