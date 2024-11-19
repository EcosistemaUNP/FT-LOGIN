import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useIdAuth } from "../hooks/AuthHook";
import { FinSesionService } from "../services/FinSesionService";

export const FinSesionHook = () => {
  const navigate = useNavigate();
  const { setAuthToken, setUserToken } = useIdAuth();

  const FinSesion = () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const accessToken = localStorage.getItem("access_token");
          if (!accessToken) {
            throw new Error("No se encontró el token de acceso.");
          }

          // Hacer la solicitud HTTP al backend para revocar el token
          await FinSesionService(accessToken);

          // Borrar la información del localStorage y del contexto
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_token");
          setAuthToken(null);
          setUserToken(null);

          setTimeout(() => {
            resolve(true);
            navigate("/");
          }, 1000);
        } catch (error) {
          reject(error);
        }
      }),
      {
        pending: "Finalizando sesión...",
        success: "Sesión finalizada con éxito",
        error: "Error al finalizar la sesión",
      }
    );
  };

  return { FinSesion };
};
