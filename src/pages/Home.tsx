import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify"; // Importar ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importar estilos de Toastify

import { CombinedProvider } from "../context/DatosBasicos";
import { ContactoProvider } from "../context/Contacto";
import { UbicacionProvider } from "../context/Ubicacion";
import { FormDatosBasicos } from "../Form/SolicitudDatosBasicos";

import { IngresoProvider } from "../context/Ingreso";
import { FormIngreso } from "../Form/SolicitudIngreso";

import { useAuth } from "../context/Autenticacion";

export const Home: React.FC = () => {
  const { token } = useAuth();

  const isAuthenticated: boolean = Boolean(token);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("ingreso");
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <CombinedProvider>
          <ContactoProvider>
            <UbicacionProvider>
              <FormDatosBasicos />
            </UbicacionProvider>
          </ContactoProvider>
        </CombinedProvider>
      ) : (
        <IngresoProvider>
          <FormIngreso />
        </IngresoProvider>
      )}

      <ToastContainer />
    </>
  );
};
