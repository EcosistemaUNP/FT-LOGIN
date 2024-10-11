import React, { useState, useEffect } from "react";

// Elementos de Bootstrap
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

interface PaisProps {
  idPaisUbicacion?: number; // Cambia a number si siempre será un número
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  paisRef?: React.RefObject<HTMLSelectElement>;
}

const Pais: React.FC<PaisProps> = ({ idPaisUbicacion, onChange, paisRef }) => {
  const [paises, setPaises] = useState<
    { id_pais: number; nombre_pais: string }[]
  >([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState<string>("0");

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_ENDPOINT + "/pais/"
        );
        if (response.ok) {
          const data = await response.json();
          if (idPaisUbicacion) {
            const paisFiltrado = data.find(
              (pais: { id_pais: number }) => pais.id_pais === idPaisUbicacion
            );
            setPaises(paisFiltrado ? [paisFiltrado] : []);
          } else {
            setPaises(data);
          }
        } else {
          console.error(
            "Hubo un error al obtener los datos de los países:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los países:",
          error
        );
      }
    };

    obtenerPaises();
  }, [idPaisUbicacion]);

  const handlePaisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaisSeleccionado(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        País <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={paisRef}
        value={paisSeleccionado}
        onChange={handlePaisChange}
      >
        <option value="0" disabled>
          Seleccione...
        </option>
        {paises.map((pais) => (
          <option key={pais.id_pais} value={pais.id_pais}>
            {pais.nombre_pais}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export { Pais };
