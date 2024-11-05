import React from "react";
import { IdUsuarioContext, IdCorreoContext } from "../contexts/RegistroContext";

// Crear un provider combinado para registro
interface RegistroProviderProps {
  children: React.ReactNode; // Propiedades que pueden contener nodos React
}

// Declaración del componente RegistroProvider que acepta las propiedades definidas en RegistroProviderProps
const RegistroProvider: React.FC<RegistroProviderProps> = ({ children }) => {
  // Estado para manejar el ID del usuario
  const [idUsuario, setIdUsuario] = React.useState<string>("");

  // Estado para manejar el ID del correo
  const [idCorreo, setIdCorreo] = React.useState<string>("");

  // ------> Renderizado
  return (
    // Proveedor del contexto de ID del usuario
    <IdUsuarioContext.Provider value={{ idUsuario, setIdUsuario }}>
      {/* Proveedor del contexto de ID del correo */}
      <IdCorreoContext.Provider value={{ idCorreo, setIdCorreo }}>
        {children}
      </IdCorreoContext.Provider>
    </IdUsuarioContext.Provider>
  );
};

// Exporta el componente RegistroProvider para su uso en otros archivos
export { RegistroProvider };
