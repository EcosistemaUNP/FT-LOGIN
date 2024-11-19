import React, { createContext, useState, ReactNode } from "react";
import {
  IdUsuarioContextType,
  IdContrasenaContextType,
  IdCaptchaContextType,
} from "../types/InicioSesionTypes";

// Crear contextos individuales con valores por defecto
const IdUsuarioContext = createContext<IdUsuarioContextType | undefined>(
  undefined
);
const IdContrasenaContext = createContext<IdContrasenaContextType | undefined>(
  undefined
);
const IdCaptchaContext = createContext<IdCaptchaContextType | undefined>(
  undefined
);

interface InicioSesionProviderProps {
  children: ReactNode;
}

// Crear un provider combinado
const InicioSesionProvider: React.FC<InicioSesionProviderProps> = ({
  children,
}) => {
  const [idUsuario, setIdUsuario] = useState<string>("");
  const [idContrasena, setIdContrasena] = useState<string>("");
  const [idCaptcha, setIdCaptcha] = useState<string>("");

  return (
    <IdUsuarioContext.Provider
      value={{
        idUsuario: idUsuario,
        setIdUsuario: setIdUsuario,
      }}
    >
      <IdContrasenaContext.Provider
        value={{
          idContrasena: idContrasena,
          setIdContrasena: setIdContrasena,
        }}
      >
        <IdCaptchaContext.Provider
          value={{
            idCaptcha: idCaptcha,
            setIdCaptcha: setIdCaptcha,
          }}
        >
          {children}
        </IdCaptchaContext.Provider>
      </IdContrasenaContext.Provider>
    </IdUsuarioContext.Provider>
  );
};

export { IdUsuarioContext, IdContrasenaContext, IdCaptchaContext };

export { InicioSesionProvider };
