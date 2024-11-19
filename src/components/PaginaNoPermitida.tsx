import React from "react";

const PaginaNoPermitida: React.FC = () => {
  return (
    <div className="mx-5">
      <h1>403 - Página no permitida</h1>
      <p>
        Lo sentimos, la página que estás buscando no está permitida para tu
        usuario.
      </p>
    </div>
  );
};

export default PaginaNoPermitida;
