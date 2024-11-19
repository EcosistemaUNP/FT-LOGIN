import React from "react";
import {
  IdUsuarioContext,
  IdContrasenaContext,
  IdCaptchaContext,
} from "../contexts/InicioSesionContext";

// Hooks para usar los contextos
const useIdUsuario = () => {
  const context = React.useContext(IdUsuarioContext);
  if (context === undefined) {
    throw new Error("useIdUsuario must be used within an InicioSesionProvider");
  }
  return context;
};
const useIdContrasena = () => {
  const context = React.useContext(IdContrasenaContext);
  if (context === undefined) {
    throw new Error(
      "useIdContrasena must be used within an InicioSesionProvider"
    );
  }
  return context;
};
const useIdCaptcha = () => {
  const context = React.useContext(IdCaptchaContext);
  if (context === undefined) {
    throw new Error("useIdCaptcha must be used within an InicioSesionProvider");
  }
  return context;
};

export { useIdUsuario, useIdContrasena, useIdCaptcha };
