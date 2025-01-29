import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IniciarSesion from "./InicioSesion";
import Registro from "./Registro";
import { CardFormBasicos } from "eco-unp/Forms";
import { ProtectedRoute } from "eco-unp/Utils";

const router = createBrowserRouter([
  {
    path: "login",
    element: <IniciarSesion />,
  },
  {
    path: "registro",
    element: <Registro />,
  },
  {
    path: "datos-basicos",
    element: (
      <ProtectedRoute>
        <CardFormBasicos method="POST" canEdit={false} />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
