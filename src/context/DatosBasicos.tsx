import React, { createContext, useContext, useState, ReactNode } from "react";

// Definición de tipos para los contextos
interface IdIdentificacionContextType {
  idIdentificacion: string;
  setIdIdentificacion: (id: string) => void;
}

interface IdSexoContextType {
  idSexo: string;
  setIdSexo: (sexo: string) => void;
}

interface IdGeneroContextType {
  idGenero: string;
  setIdGenero: (genero: string) => void;
}

interface IdTipoOrientacionContextType {
  idTipoOrientacion: string;
  setIdTipoOrientacion: (tipo: string) => void;
}

interface IdEstadoCivilContextType {
  idEstadoCivil: string;
  setIdEstadoCivil: (estado: string) => void;
}

interface IdGpRhContextType {
  idGpRh: string;
  setIdGpRh: (id: string) => void;
}

interface IdFondoPensionesContextType {
  idFondoPensiones: string;
  setIdFondoPensiones: (id: string) => void;
}

interface IdEpsContextType {
  idEps: string;
  setIdEps: (id: string) => void;
}

// Crear contextos individuales
const IdIdentificacionContext = createContext<
  IdIdentificacionContextType | undefined
>(undefined);
const IdSexoContext = createContext<IdSexoContextType | undefined>(undefined);
const IdGeneroContext = createContext<IdGeneroContextType | undefined>(
  undefined
);
const IdTipoOrientacionContext = createContext<
  IdTipoOrientacionContextType | undefined
>(undefined);
const IdEstadoCivilContext = createContext<
  IdEstadoCivilContextType | undefined
>(undefined);
const IdGpRhContext = createContext<IdGpRhContextType | undefined>(undefined);
const IdFondoPensionesContext = createContext<
  IdFondoPensionesContextType | undefined
>(undefined);
const IdEpsContext = createContext<IdEpsContextType | undefined>(undefined);

// Crear un provider combinado
interface CombinedProviderProps {
  children: ReactNode;
}

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children }) => {
  const [idIdentificacion, setIdIdentificacion] = useState<string>("");
  const [idSexo, setIdSexo] = useState<string>("");
  const [idGenero, setIdGenero] = useState<string>("");
  const [idTipoOrientacion, setIdTipoOrientacion] = useState<string>("");
  const [idEstadoCivil, setIdEstadoCivil] = useState<string>("");
  const [idGpRh, setIdGpRh] = useState<string>("");
  const [idFondoPensiones, setIdFondoPensiones] = useState<string>("");
  const [idEps, setIdEps] = useState<string>("");

  return (
    <IdIdentificacionContext.Provider
      value={{ idIdentificacion, setIdIdentificacion }}
    >
      <IdSexoContext.Provider value={{ idSexo, setIdSexo }}>
        <IdGeneroContext.Provider value={{ idGenero, setIdGenero }}>
          <IdTipoOrientacionContext.Provider
            value={{ idTipoOrientacion, setIdTipoOrientacion }}
          >
            <IdEstadoCivilContext.Provider
              value={{ idEstadoCivil, setIdEstadoCivil }}
            >
              <IdGpRhContext.Provider value={{ idGpRh, setIdGpRh }}>
                <IdFondoPensionesContext.Provider
                  value={{ idFondoPensiones, setIdFondoPensiones }}
                >
                  <IdEpsContext.Provider value={{ idEps, setIdEps }}>
                    {children}
                  </IdEpsContext.Provider>
                </IdFondoPensionesContext.Provider>
              </IdGpRhContext.Provider>
            </IdEstadoCivilContext.Provider>
          </IdTipoOrientacionContext.Provider>
        </IdGeneroContext.Provider>
      </IdSexoContext.Provider>
    </IdIdentificacionContext.Provider>
  );
};

// Hooks para usar los contextos
const useIdIdentificacion = (): IdIdentificacionContextType => {
  const context = useContext(IdIdentificacionContext);
  if (context === undefined) {
    throw new Error(
      "useIdIdentificacion must be used within a CombinedProvider"
    );
  }
  return context;
};

const useIdSexo = (): IdSexoContextType => {
  const context = useContext(IdSexoContext);
  if (context === undefined) {
    throw new Error("useIdSexo must be used within a CombinedProvider");
  }
  return context;
};

const useIdGenero = (): IdGeneroContextType => {
  const context = useContext(IdGeneroContext);
  if (context === undefined) {
    throw new Error("useIdGenero must be used within a CombinedProvider");
  }
  return context;
};

const useIdTipoOrientacion = (): IdTipoOrientacionContextType => {
  const context = useContext(IdTipoOrientacionContext);
  if (context === undefined) {
    throw new Error(
      "useIdTipoOrientacion must be used within a CombinedProvider"
    );
  }
  return context;
};

const useIdEstadoCivil = (): IdEstadoCivilContextType => {
  const context = useContext(IdEstadoCivilContext);
  if (context === undefined) {
    throw new Error("useIdEstadoCivil must be used within a CombinedProvider");
  }
  return context;
};

const useIdGpRh = (): IdGpRhContextType => {
  const context = useContext(IdGpRhContext);
  if (context === undefined) {
    throw new Error("useIdGpRh must be used within a CombinedProvider");
  }
  return context;
};

const useIdFondoPensiones = (): IdFondoPensionesContextType => {
  const context = useContext(IdFondoPensionesContext);
  if (context === undefined) {
    throw new Error(
      "useIdFondoPensiones must be used within a CombinedProvider"
    );
  }
  return context;
};

const useIdEps = (): IdEpsContextType => {
  const context = useContext(IdEpsContext);
  if (context === undefined) {
    throw new Error("useIdEps must be used within a CombinedProvider");
  }
  return context;
};

export { CombinedProvider };
export {
  useIdIdentificacion,
  useIdSexo,
  useIdGenero,
  useIdTipoOrientacion,
  useIdEstadoCivil,
  useIdGpRh,
  useIdFondoPensiones,
  useIdEps,
};
export {
  IdIdentificacionContext,
  IdSexoContext,
  IdGeneroContext,
  IdTipoOrientacionContext,
  IdEstadoCivilContext,
  IdGpRhContext,
  IdFondoPensionesContext,
  IdEpsContext,
};
