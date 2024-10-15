import React from "react";
import { IdContrasegnaContextType, IdUsuarioContextType } from "../types/IngresoType";

// Creación del contexto para el ID del usuario con un valor predeterminado indefinido
const IdUsuarioContext = React.createContext<IdUsuarioContextType | undefined>(undefined);

// Creación del contexto para el ID de la contraseña con un valor predeterminado indefinido
const IdContrasegnaContext = React.createContext<IdContrasegnaContextType | undefined>(undefined);

// Exporta ambos contextos para su uso en otros archivos
export { IdUsuarioContext, IdContrasegnaContext };
