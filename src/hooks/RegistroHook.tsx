import React from "react";
import { IdUsuarioContext, IdCorreoContext } from "../contexts/RegistroContext";
import {
  IdUsuarioContextType,
  IdCorreoContextType,
} from "../types/RegistroTypes";

// Hook personalizado para usar el contexto de ID del usuario
const useIdUsuarioR = (): IdUsuarioContextType => {
  const context = React.useContext(IdUsuarioContext);
  if (context === undefined) {
    throw new Error("useIdUsuario must be used within an RegistroProvider");
  }
  return context;
};

// Hook personalizado para usar el contexto de ID del correo
const useIdCorreo = (): IdCorreoContextType => {
  const context = React.useContext(IdCorreoContext);
  if (context === undefined) {
    throw new Error("useIdCorreo must be used within an RegistroProvider");
  }
  return context;
};

// Exporta los hooks personalizados para su uso en otros archivos
export { useIdUsuarioR, useIdCorreo };
