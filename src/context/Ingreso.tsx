import React, { createContext, useContext, useState, ReactNode } from "react";

// Definición de tipos para el contexto
interface IdUsuarioContextType {
  idUsuario: string;
  setIdUsuario: (id: string) => void;
}

interface IdContraseñaContextType {
  idContraseña: string;
  setIdContraseña: (contraseña: string) => void;
}

// Crear contextos individuales
const IdUsuarioContext = createContext<IdUsuarioContextType | undefined>(
  undefined
);
const IdContraseñaContext = createContext<IdContraseñaContextType | undefined>(
  undefined
);

// Crear un provider combinado para ingreso
interface IngresoProviderProps {
  children: ReactNode;
}

const IngresoProvider: React.FC<IngresoProviderProps> = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState<string>("");
  const [idContraseña, setIdContraseña] = useState<string>("");

  return (
    <IdUsuarioContext.Provider value={{ idUsuario, setIdUsuario }}>
      <IdContraseñaContext.Provider value={{ idContraseña, setIdContraseña }}>
        {children}
      </IdContraseñaContext.Provider>
    </IdUsuarioContext.Provider>
  );
};

// Hooks para usar los contextos
const useIdUsuario = (): IdUsuarioContextType => {
  const context = useContext(IdUsuarioContext);
  if (context === undefined) {
    throw new Error("useIdUsuario must be used within an IngresoProvider");
  }
  return context;
};

const useIdContraseña = (): IdContraseñaContextType => {
  const context = useContext(IdContraseñaContext);
  if (context === undefined) {
    throw new Error("useIdContraseña must be used within an IngresoProvider");
  }
  return context;
};

export {
  IngresoProvider,
  useIdUsuario,
  useIdContraseña,
  IdUsuarioContext,
  IdContraseñaContext,
};
