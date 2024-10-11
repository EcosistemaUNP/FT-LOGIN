import React, { useState, useEffect } from "react";

// Elementos de Bootstrap
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

interface MunicipioProps {
  idDepartamento: number; // Cambia a number si siempre será un número o null
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  municipioRef?: React.RefObject<HTMLSelectElement>;
}

const Municipio: React.FC<MunicipioProps> = ({
  idDepartamento,
  onChange,
  municipioRef,
}) => {
  const [municipios, setMunicipios] = useState<
    { id_municipio: number; nombre_municipio: string }[]
  >([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] =
    useState<string>("0");

  useEffect(() => {
    if (!idDepartamento) {
      return;
    }

    const obtenerMunicipio = async () => {
      try {
        const url =
          process.env.REACT_APP_API_ENDPOINT +
          `/municipio/?departamento=${idDepartamento}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMunicipios(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los municipios:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los municipios:",
          error
        );
      }
    };

    obtenerMunicipio();
  }, [idDepartamento]);

  const handleMunicipioChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMunicipioSeleccionado(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const selectDisabledStyle = {
    backgroundColor: "white",
    color: "black",
  };

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Municipio / Ciudad <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={municipioRef}
        value={municipioSeleccionado}
        onChange={handleMunicipioChange}
        disabled={idDepartamento === 0}
        style={idDepartamento === 0 ? selectDisabledStyle : {}}
      >
        <option value="0" disabled>
          Seleccione...
        </option>
        {municipios.map((municipio) => (
          <option key={municipio.id_municipio} value={municipio.id_municipio}>
            {municipio.nombre_municipio}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export { Municipio };
