import React, { createContext, useState, ReactNode } from "react";
import {
  IdCorreoContextType,
  IdUsuarioContextType,
} from "../types/RegistroTypes";

// Creación del contexto para el ID del usuario con un valor predeterminado indefinido
const IdUsuarioContext = React.createContext<IdUsuarioContextType | undefined>(
  undefined
);

// Creación del contexto para el ID del correo con un valor predeterminado indefinido
const IdCorreoContext = React.createContext<IdCorreoContextType | undefined>(
  undefined
);

interface RegistroProviderProps {
  children: ReactNode;
}

// Crear un provider combinado
const RegistroProvider: React.FC<RegistroProviderProps> = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState<string>("");
  const [idCorreo, setIdCorreo] = useState<string>("");

  return (
    <IdUsuarioContext.Provider
      value={{
        idUsuario: idUsuario,
        setIdUsuario: setIdUsuario,
      }}
    >
      <IdCorreoContext.Provider
        value={{
          idCorreo: idCorreo,
          setIdCorreo: setIdCorreo,
        }}
      >
        {children}
      </IdCorreoContext.Provider>
    </IdUsuarioContext.Provider>
  );
};

// Exporta ambos contextos para su uso en otros archivos
export { IdUsuarioContext, IdCorreoContext };

export { RegistroProvider };
