import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IniciarSesion from "./InicioSesion";
import Registro from "./Registro";
import { CardFormBasicos } from "eco-unp/Forms";

const router = createBrowserRouter([
  {
    path: "",
    element: <IniciarSesion />,
  },
  {
    path: "registro",
    element: <Registro />,
  },
  {
    path: "datos-basicos",
    element: <CardFormBasicos method="POST" canEdit={false} />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
