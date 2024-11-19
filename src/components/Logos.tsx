import React, { useState } from "react";

// Definición de los tipos de las propiedades que acepta el componente Unp
interface UnpProps {
  size: string; // El tamaño (ancho) de la imagen
  src: string; // La URL de la imagen
  alt: string; // Texto alternativo para la imagen
  height: string; // La altura del contenedor de la imagen
}

// Declaración del componente Unp que acepta las propiedades definidas en UnpProps
const LogosUnp: React.FC<UnpProps> = ({ size, src, alt, height }) => {
  // Estado que controla si la imagen ha cargado o no
  const [loaded, setLoaded] = useState(false);

  // Maneja el evento de carga de la imagen, estableciendo el estado de loaded a true
  const handleLoad = () => {
    setLoaded(true);
  };

  // Definición de los estilos para el contenedor de la imagen
  const containerStyle = {
    width: size,
    height: height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // Definición de los estilos para el Placeholder
  const placeholderStyle = {
    width: size,
    height: height,
    backgroundColor: "transparent",
  };

  // ----> Renderizado
  return (
    <div style={containerStyle}>
      {/* Placeholder que se muestra mientras la imagen carga */}
      {!loaded && <div style={placeholderStyle} />}

      {/* La imagen que se muestra solo cuando ha terminado de cargar */}
      <img
        src={src}
        alt={alt}
        style={{
          display: loaded ? "block" : "none",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        onLoad={handleLoad}
      />
    </div>
  );
};

// Exporta el componente Unp para su uso en otros archivos
export default LogosUnp;
