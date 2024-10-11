import React, { createContext, useContext, useState, ReactNode } from "react";

// Definición de tipos para los contextos
interface IdPaisUbicacionContextType {
  idPaisUbicacion: number;
  setIDPaisUbicacion: (id: number) => void;
}

interface IdDepartamentoUbicacionContextType {
  idDepartamentoUbicacion: number;
  setIDDepartamentoUbicacion: (id: number) => void;
}

interface IdMunicipioUbicacionContextType {
  idMunicipioUbicacion: number;
  setIDMunicipioUbicacion: (id: number) => void;
}

interface IdZonaUbicacionContextType {
  idZonaUbicacion: number;
  setIdZonaUbicacion: (id: number) => void;
}

// Crear contextos individuales
const IdPaisUbicacionContext = createContext<
  IdPaisUbicacionContextType | undefined
>(undefined);
const IdDepartamentoUbicacionContext = createContext<
  IdDepartamentoUbicacionContextType | undefined
>(undefined);
const IdMunicipioUbicacionContext = createContext<
  IdMunicipioUbicacionContextType | undefined
>(undefined);
const IdZonaUbicacionContext = createContext<
  IdZonaUbicacionContextType | undefined
>(undefined);

// Crear un provider combinado
interface UbicacionProviderProps {
  children: ReactNode;
}

const UbicacionProvider: React.FC<UbicacionProviderProps> = ({ children }) => {
  const [idPaisUbicacion, setIDPaisUbicacion] = useState<number>(0);
  const [idDepartamentoUbicacion, setIDDepartamentoUbicacion] =
    useState<number>(0);
  const [idMunicipioUbicacion, setIDMunicipioUbicacion] = useState<number>(0);
  const [idZonaUbicacion, setIdZonaUbicacion] = useState<number>(0);

  return (
    <IdPaisUbicacionContext.Provider
      value={{ idPaisUbicacion, setIDPaisUbicacion }}
    >
      <IdDepartamentoUbicacionContext.Provider
        value={{ idDepartamentoUbicacion, setIDDepartamentoUbicacion }}
      >
        <IdMunicipioUbicacionContext.Provider
          value={{ idMunicipioUbicacion, setIDMunicipioUbicacion }}
        >
          <IdZonaUbicacionContext.Provider
            value={{ idZonaUbicacion, setIdZonaUbicacion }}
          >
            {children}
          </IdZonaUbicacionContext.Provider>
        </IdMunicipioUbicacionContext.Provider>
      </IdDepartamentoUbicacionContext.Provider>
    </IdPaisUbicacionContext.Provider>
  );
};

// Hooks para usar los contextos
const useIdPaisUbicacion = (): IdPaisUbicacionContextType => {
  const context = useContext(IdPaisUbicacionContext);
  if (context === undefined) {
    throw new Error(
      "useIdPaisUbicacion must be used within an UbicacionProvider"
    );
  }
  return context;
};

const useIdDepartamentoUbicacion = (): IdDepartamentoUbicacionContextType => {
  const context = useContext(IdDepartamentoUbicacionContext);
  if (context === undefined) {
    throw new Error(
      "useIdDepartamentoUbicacion must be used within an UbicacionProvider"
    );
  }
  return context;
};

const useIdMunicipioUbicacion = (): IdMunicipioUbicacionContextType => {
  const context = useContext(IdMunicipioUbicacionContext);
  if (context === undefined) {
    throw new Error(
      "useIdMunicipioUbicacion must be used within an UbicacionProvider"
    );
  }
  return context;
};

const useIdZonaUbicacion = (): IdZonaUbicacionContextType => {
  const context = useContext(IdZonaUbicacionContext);
  if (context === undefined) {
    throw new Error(
      "useIdZonaUbicacion must be used within an UbicacionProvider"
    );
  }
  return context;
};

export {
  UbicacionProvider,
  useIdPaisUbicacion,
  useIdDepartamentoUbicacion,
  useIdMunicipioUbicacion,
  useIdZonaUbicacion,
};
export {
  IdPaisUbicacionContext,
  IdDepartamentoUbicacionContext,
  IdMunicipioUbicacionContext,
  IdZonaUbicacionContext,
};
