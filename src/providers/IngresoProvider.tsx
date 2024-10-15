import React from "react";
import { IdUsuarioContext, IdContrasegnaContext } from "../contexts/IngresoContex";

// Crear un provider combinado para ingreso
interface IngresoProviderProps {
  children: React.ReactNode; // Propiedades que pueden contener nodos React
}

// Declaración del componente IngresoProvider que acepta las propiedades definidas en IngresoProviderProps
const IngresoProvider: React.FC<IngresoProviderProps> = ({ children }) => {

  // Estado para manejar el ID del usuario
  const [idUsuario, setIdUsuario] = React.useState<string>("");

  // Estado para manejar el ID de la contraseña
  const [idContrasegna, setIdContrasegna] = React.useState<string>("");

  // ------> Renderizado
  return (

    // Proveedor del contexto de ID del usuario
    <IdUsuarioContext.Provider value={{ idUsuario, setIdUsuario }}>

      {/* Proveedor del contexto de ID de la contraseña */}
      <IdContrasegnaContext.Provider value={{ idContrasegna, setIdContrasegna }}>
        {children}
      </IdContrasegnaContext.Provider>

    </IdUsuarioContext.Provider>

  );

};

// Exporta el componente IngresoProvider para su uso en otros archivos
export { IngresoProvider };