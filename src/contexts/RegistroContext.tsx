import React from "react";
import { IdCorreoContextType, IdUsuarioContextType } from "../types/RegistroType";

// Creación del contexto para el ID del usuario con un valor predeterminado indefinido
const IdUsuarioContext = React.createContext<IdUsuarioContextType | undefined>(undefined);

// Creación del contexto para el ID del correo con un valor predeterminado indefinido
const IdCorreoContext = React.createContext<IdCorreoContextType | undefined>(undefined);

// Exporta ambos contextos para su uso en otros archivos
export { IdUsuarioContext, IdCorreoContext };