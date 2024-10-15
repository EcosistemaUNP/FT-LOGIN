import React from "react";
import { IdUsuarioContext, IdContrasegnaContext } from "../contexts/IngresoContex";
import { IdUsuarioContextType, IdContrasegnaContextType } from "../types/IngresoType";

// Hook personalizado para usar el contexto de ID del usuario
const useIdUsuario = (): IdUsuarioContextType => {
    const context = React.useContext(IdUsuarioContext);
    if (context === undefined) {
        throw new Error("useIdUsuario must be used within an IngresoProvider");
    }
    return context;
};

// Hook personalizado para usar el contexto de ID de la contraseña
const useIdContrasegna = (): IdContrasegnaContextType => {
    const context = React.useContext(IdContrasegnaContext);
    if (context === undefined) {
        throw new Error("useIdContrasegna must be used within an IngresoProvider");
    }
    return context;
};

// Exporta los hooks personalizados para su uso en otros archivos
export { useIdUsuario, useIdContrasegna };