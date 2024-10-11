import React, { createContext, useContext, useState, ReactNode } from "react";

// Definición de tipos para el contexto
interface IdCelularContextType {
  idCelular: string;
  setIdCelular: (id: string) => void;
}

interface IdCorreoElectronicoContextType {
  idCorreoElectronico: string;
  setIdCorreoElectronico: (id: string) => void;
}

// Crear contextos individuales
const IdCelularContext = createContext<IdCelularContextType | undefined>(
  undefined
);
const IdCorreoElectronicoContext = createContext<
  IdCorreoElectronicoContextType | undefined
>(undefined);

// Crear un provider combinado para contacto
interface ContactoProviderProps {
  children: ReactNode;
}

const ContactoProvider: React.FC<ContactoProviderProps> = ({ children }) => {
  const [idCelular, setIdCelular] = useState<string>("");
  const [idCorreoElectronico, setIdCorreoElectronico] = useState<string>("");

  return (
    <IdCelularContext.Provider value={{ idCelular, setIdCelular }}>
      <IdCorreoElectronicoContext.Provider
        value={{ idCorreoElectronico, setIdCorreoElectronico }}
      >
        {children}
      </IdCorreoElectronicoContext.Provider>
    </IdCelularContext.Provider>
  );
};

// Hooks para usar los contextos
const useIdCelular = (): IdCelularContextType => {
  const context = useContext(IdCelularContext);
  if (context === undefined) {
    throw new Error("useIdCelular must be used within a ContactoProvider");
  }
  return context;
};

const useIdCorreoElectronico = (): IdCorreoElectronicoContextType => {
  const context = useContext(IdCorreoElectronicoContext);
  if (context === undefined) {
    throw new Error(
      "useIdCorreoElectronico must be used within a ContactoProvider"
    );
  }
  return context;
};

export {
  ContactoProvider,
  useIdCelular,
  useIdCorreoElectronico,
  IdCelularContext,
  IdCorreoElectronicoContext,
};
