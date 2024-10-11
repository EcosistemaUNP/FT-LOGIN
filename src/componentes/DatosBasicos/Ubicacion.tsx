import React, { useState, useEffect, useContext, RefObject } from "react";
import { Pais } from "../Ubicacion/Pais";
import { Departamento } from "../Ubicacion/Departamento";
import { Municipio } from "../Ubicacion/Municipio";
import {
  IdPaisUbicacionContext,
  IdDepartamentoUbicacionContext,
  IdMunicipioUbicacionContext,
  IdZonaUbicacionContext,
} from "../../context/Ubicacion";

// validación
import {
  removeIntermediateSpaces,
  capitalizeWords,
  capitalizeFirstLetter,
  validateSpecialCharWithNumsAndSpcs,
  validateSpecialCharWithSpcs,
  validateSpecialCharWithNumsAndSpcsNot,
} from "../../funciones/validacionCampos";

// Elementos de Bootstrap
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";
import "../../styles/Bootstrap.css";

// Definición de tipos para las props
interface UbicacionProps {
  paisRef: React.RefObject<HTMLSelectElement>;
  departamentoRef: React.RefObject<HTMLSelectElement>;
  municipioRef: React.RefObject<HTMLSelectElement>;
}

const Ubicacion: React.FC<UbicacionProps> = ({
  paisRef,
  departamentoRef,
  municipioRef,
}) => {
  const paisContext = useContext(IdPaisUbicacionContext);

  if (!paisContext) {
    throw new Error("paisContext debe estar dentro de un PaisProvider");
  }

  const { setIDPaisUbicacion } = paisContext;

  const departamentoContext = useContext(IdDepartamentoUbicacionContext);

  if (!departamentoContext) {
    throw new Error(
      "departamentoContext debe estar dentro de un IdDepartamentoProvider"
    );
  }

  const { setIDDepartamentoUbicacion } = departamentoContext;

  const municipioContext = useContext(IdMunicipioUbicacionContext);

  if (!municipioContext) {
    throw new Error(
      "municipioContext debe estar dentro de un IdMunicipioProvider"
    );
  }

  const { setIDMunicipioUbicacion } = municipioContext;

  const [idPaisUbicacion, setIdPaisUbicacion] = useState<number>(0);
  const [idDepartamentoUbicacion, setIdDepartamentoUbicacion] =
    useState<number>(0);
  const [idMunicipioUbicacion, setIdMunicipioUbicacion] = useState<number>(0);

  const handlePaisChange = (event: React.ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLSelectElement;
    const selectedValue = parseInt(target.value, 10);
    setIdPaisUbicacion(selectedValue);
    setIDPaisUbicacion(selectedValue);
    setIdDepartamentoUbicacion(0);
  };

  const handleDepartamentoChange = (event: React.ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLSelectElement;
    const selectedValue = parseInt(target.value, 10);
    setIdDepartamentoUbicacion(selectedValue);
    setIDDepartamentoUbicacion(selectedValue);
    setIdMunicipioUbicacion(0);
  };

  const handleMunicipioGet = (event: React.ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLSelectElement;
    const selectedValue = parseInt(target.value, 10);
    setIdMunicipioUbicacion(selectedValue);
    setIDMunicipioUbicacion(selectedValue);
  };

  return (
    <React.Fragment>
      <Col lg={3} md={6} xs={12}>
        <Pais
          paisRef={paisRef}
          idPaisUbicacion={1}
          onChange={handlePaisChange}
        />
      </Col>
      <Col lg={3} md={6} xs={12}>
        <Departamento
          departamentoRef={departamentoRef}
          idPais={idPaisUbicacion}
          onChange={handleDepartamentoChange}
        />
      </Col>
      <Col lg={3} md={6} xs={12}>
        <Municipio
          municipioRef={municipioRef}
          idDepartamento={idDepartamentoUbicacion}
          onChange={handleMunicipioGet}
        />
      </Col>
    </React.Fragment>
  );
};

// Definición de tipos para las props
interface ZonaProps {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  zonaDomicilioRef: RefObject<HTMLSelectElement>;
}

const Zona: React.FC<ZonaProps> = ({ onChange, zonaDomicilioRef }) => {
  const [zonas, setZonas] = useState<
    { id_zubicacion: string; nombre_zubicacion: string }[]
  >([]);
  const [zonaSeleccionada, setZonaSeleccionada] = useState<number>(0);

  const zonaContext = useContext(IdZonaUbicacionContext);
  if (!zonaContext) {
    throw new Error("paisContext debe estar dentro de un PaisProvider");
  }
  const { setIdZonaUbicacion } = zonaContext;

  useEffect(() => {
    const obtenerZonas = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/zona/`
        );
        if (response.ok) {
          const data = await response.json();
          setZonas(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de las zonas:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de las zonas:",
          error
        );
      }
    };
    obtenerZonas();
  }, []);

  useEffect(() => {
    setIdZonaUbicacion(zonaSeleccionada);
  }, [zonaSeleccionada, setIdZonaUbicacion]);

  const handleZonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    setZonaSeleccionada(selectedValue);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <React.Fragment>
      <Col md={12} xs={12} className="mb-3">
        <FormLabel>
          Zona <span className="text-danger">*</span>
        </FormLabel>
        <FormSelect
          ref={zonaDomicilioRef}
          value={zonaSeleccionada}
          onChange={handleZonaChange}
          required
        >
          <option value="0">Seleccione una zona</option>
          {zonas.map((zona) => (
            <option key={zona.id_zubicacion} value={zona.id_zubicacion}>
              {zona.nombre_zubicacion}
            </option>
          ))}
        </FormSelect>
      </Col>
    </React.Fragment>
  );
};

interface DireccionUrbanaProps {
  contentType: string;
  viaPrincipalRef: React.RefObject<HTMLSelectElement>;
  numeroViaPrincipalRef: React.RefObject<HTMLInputElement>;
  numeroViaSecundariaRef: React.RefObject<HTMLInputElement>;
  numeroPlacaRef: React.RefObject<HTMLInputElement>;
  nombreBarrioRef: React.RefObject<HTMLInputElement>;
}

const DireccionUrbana: React.FC<DireccionUrbanaProps> = ({
  contentType,
  viaPrincipalRef,
  numeroViaPrincipalRef,
  numeroViaSecundariaRef,
  numeroPlacaRef,
  nombreBarrioRef,
}) => {
  const paisContext = useContext(IdPaisUbicacionContext);
  if (!paisContext) {
    throw new Error("paisContext debe estar dentro de un PaisProvider");
  }
  const { idPaisUbicacion } = paisContext;

  const departamentoContext = useContext(IdDepartamentoUbicacionContext);
  if (!departamentoContext) {
    throw new Error("departamentoContext debe estar dentro de un PaisProvider");
  }
  const { idDepartamentoUbicacion } = departamentoContext;

  const municipioContext = useContext(IdMunicipioUbicacionContext);
  if (!municipioContext) {
    throw new Error("municipioContext debe estar dentro de un PaisProvider");
  }
  const { idMunicipioUbicacion } = municipioContext;

  const zonaContext = useContext(IdZonaUbicacionContext);
  if (!zonaContext) {
    throw new Error("zonaContext debe estar dentro de un PaisProvider");
  }
  const { idZonaUbicacion } = zonaContext;

  const [contentTypeId, setContentTypeId] = useState<number | null>(null);

  const [nombreBarrio, setNombreBarrio] = useState<string>("");
  const [viaPrincipal, setViaPrincipal] = useState<string>("");
  const [numeroViaPrincipal, setNumeroViaPrincipal] = useState<string>("");
  const [letraPrincipal, setLetraPrincipal] = useState<string>("");
  const [esBis, setEsBis] = useState<boolean>(false);
  const [cuadrantePrincipal, setCuadrantePrincipal] = useState<string>("");
  const [numeroViaSecundaria, setNumeroViaSecundaria] = useState<string>("");
  const [letraSecundaria, setLetraSecundaria] = useState<string>("");
  const [cuadranteSecundario, setCuadranteSecundario] = useState<string>("");
  const [numeroPlaca, setNumeroPlaca] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [resumenDireccion, setResumenDireccion] = useState<string>("");
  const [indicacionDireccion, setIndicacionDireccion] = useState<string>("");

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLElement>,
    setText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    if (validateSpecialCharWithNumsAndSpcsNot(target.value)) {
      setText(
        removeIntermediateSpaces(
          capitalizeWords(capitalizeFirstLetter(target.value))
        )
      );
    }
  };

  const handleNumChange = (
    e: React.ChangeEvent<HTMLElement>,
    setNumeroVia: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    if (/^\d{0,3}$/.test(target.value)) {
      setNumeroVia(target.value);
    }
  };

  const handleLetraChange = (
    e: React.ChangeEvent<HTMLElement>,
    setLetra: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    let value = target.value.toUpperCase();
    if (/^[A-Z]{0,3}$/.test(value)) {
      setLetra(value);
    }
  };

  const handleCompChange = (
    e: React.ChangeEvent<HTMLElement>,
    setComp: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    let value = target.value.toUpperCase();
    if (/^[A-Z0-9 ]{0,25}$/.test(value)) {
      setComp(value);
    }
  };

  const handleAreaChange = (
    e: React.ChangeEvent<HTMLElement>,
    setIndicacion: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    if (validateSpecialCharWithNumsAndSpcs(target.value)) {
      const words = target.value.split(" ");
      const formattedWords = words.map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word;
        }
      });
      const formattedSentence = formattedWords.join(" ").trimStart();
      setIndicacion(removeIntermediateSpaces(formattedSentence));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNombreBarrio((prev) => prev.trim());
      setIndicacionDireccion((prev) => prev.trim());
    }, 2000);

    return () => clearTimeout(timer);
  }, [nombreBarrio, indicacionDireccion]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    const fields = [
      viaPrincipal,
      numeroViaPrincipal + letraPrincipal,
      esBis ? "Bis" : "",
      cuadrantePrincipal,
      numeroViaSecundaria ? "# " + numeroViaSecundaria + letraSecundaria : "",
      cuadranteSecundario,
      numeroPlaca ? "- " + numeroPlaca : "",
      " ",
      complemento,
    ];

    const resumen = fields
      .filter((field) => field.trim() !== "")
      .join(" ")
      .trim();
    setResumenDireccion(resumen);
  }, [
    nombreBarrio,
    viaPrincipal,
    numeroViaPrincipal,
    letraPrincipal,
    esBis,
    cuadrantePrincipal,
    numeroViaSecundaria,
    letraSecundaria,
    cuadranteSecundario,
    numeroPlaca,
    complemento,
  ]);

  useEffect(() => {
    const fetchContentTypeId = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/contenttype/?model=${contentType}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setContentTypeId(data[0].id);
          } else {
            console.error(
              "No se encontró el ContentType para el modelo especificado."
            );
          }
        } else {
          console.error("Error al obtener el ContentType:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener el ContentType:", error);
      }
    };

    fetchContentTypeId();
  }, [contentType]);

  return (
    <Row>
      <Col md={3} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Vía principal <span className="text-danger">*</span>
          </FormLabel>
          <FormSelect
            ref={viaPrincipalRef}
            value={viaPrincipal}
            onChange={(e) => setViaPrincipal(e.target.value)}
            required
          >
            <option value="">Seleccione una vía</option>
            <option value="CL">Calle</option>
            <option value="CR">Carrera</option>
            <option value="AU">Autopista</option>
            <option value="AV">Avenida</option>
            <option value="AC">Avenida calle</option>
            <option value="AK">Avenida carrera</option>
            <option value="BL">Bulevar</option>
            <option value="CT">Carretera</option>
            <option value="CQ">Circular</option>
            <option value="CV">Circunvalar</option>
            <option value="CC">Cuentas corridas</option>
            <option value="DG">Diagonal</option>
            <option value="PJ">Pasaje</option>
            <option value="PS">Paseo</option>
            <option value="PT">Peatonal</option>
            <option value="TV">Transversal</option>
            <option value="TC">Troncal</option>
            <option value="VT">Variante</option>
            <option value="VI">Vía</option>
          </FormSelect>
        </FormGroup>
      </Col>

      <Col md={2} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Número vía <span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            ref={numeroViaPrincipalRef}
            type="text"
            value={numeroViaPrincipal}
            onChange={(e) => handleNumChange(e, setNumeroViaPrincipal)}
            placeholder="Ej: 23"
            required
          />
        </FormGroup>
      </Col>

      <Col md={2} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Letra <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            type="text"
            value={letraPrincipal}
            onChange={(e) => handleLetraChange(e, setLetraPrincipal)}
            placeholder="Ej: A"
          />
        </FormGroup>
      </Col>

      <Col md={2} xs={12} className="align-self-end">
        <FormGroup className="mb-4">
          <FormCheck
            type="checkbox"
            id="esBis"
            label="Es Bis"
            checked={esBis}
            onChange={() => setEsBis((prev) => !prev)}
          />
        </FormGroup>
      </Col>

      <Col md={2} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Cuadrante <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            type="text"
            value={cuadrantePrincipal}
            onChange={(e) => handleLetraChange(e, setCuadrantePrincipal)}
            placeholder="Ej: 1"
          />
        </FormGroup>
      </Col>

      <Col md={3} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Vía secundaria <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            ref={numeroViaSecundariaRef}
            type="text"
            value={numeroViaSecundaria}
            onChange={(e) => setNumeroViaSecundaria(e.target.value)}
          >
            <option value="">Seleccione una vía</option>
            <option value="CL">Calle</option>
            <option value="CR">Carrera</option>
            <option value="AU">Autopista</option>
            <option value="AV">Avenida</option>
            <option value="AC">Avenida calle</option>
            <option value="AK">Avenida carrera</option>
            <option value="BL">Bulevar</option>
            <option value="CT">Carretera</option>
            <option value="CQ">Circular</option>
            <option value="CV">Circunvalar</option>
            <option value="CC">Cuentas corridas</option>
            <option value="DG">Diagonal</option>
            <option value="PJ">Pasaje</option>
            <option value="PS">Paseo</option>
            <option value="PT">Peatonal</option>
            <option value="TV">Transversal</option>
            <option value="TC">Troncal</option>
            <option value="VT">Variante</option>
            <option value="VI">Vía</option>
          </FormControl>
        </FormGroup>
      </Col>

      <Col md={2} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Número vía <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            ref={numeroViaSecundariaRef}
            type="text"
            value={numeroViaSecundaria}
            onChange={(e) => handleNumChange(e, setNumeroViaSecundaria)}
            placeholder="Ej: 23"
          />
        </FormGroup>
      </Col>

      <Col md={2} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Letra <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            type="text"
            value={letraSecundaria}
            onChange={(e) => handleLetraChange(e, setLetraSecundaria)}
            placeholder="Ej: A"
          />
        </FormGroup>
      </Col>

      <Col md={2} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Cuadrante <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            type="text"
            value={cuadranteSecundario}
            onChange={(e) => handleLetraChange(e, setCuadranteSecundario)}
            placeholder="Ej: 1"
          />
        </FormGroup>
      </Col>

      <Col md={2} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Número placa <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            ref={numeroPlacaRef}
            type="text"
            value={numeroPlaca}
            onChange={(e) => handleNumChange(e, setNumeroPlaca)}
            placeholder="Ej: 12345"
          />
        </FormGroup>
      </Col>

      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Complemento <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            type="text"
            value={complemento}
            onChange={(e) => handleCompChange(e, setComplemento)}
            placeholder="Ej: Interior 4"
          />
        </FormGroup>
      </Col>

      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Nombre barrio <span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            ref={nombreBarrioRef}
            type="text"
            value={nombreBarrio}
            onChange={(e) => handleTextChange(e, setNombreBarrio)}
            required
          />
        </FormGroup>
      </Col>

      <Col md={8} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Indicación <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            type="text"
            value={indicacionDireccion}
            onChange={(e) => handleAreaChange(e, setIndicacionDireccion)}
            placeholder="Ej: Al lado del parque"
          />
        </FormGroup>
      </Col>

      <Col md={12} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Resumen dirección <span className="text-danger"></span>
          </FormLabel>
          <FormControl type="text" value={resumenDireccion} readOnly />
        </FormGroup>
      </Col>
    </Row>
  );
};

interface DireccionRuralProps {
  contentType: string;
  corregimientoRef: React.RefObject<HTMLInputElement>;
  veredaRef: React.RefObject<HTMLInputElement>;
  centroPobladoRef: React.RefObject<HTMLInputElement>;
}

const DireccionRural: React.FC<DireccionRuralProps> = ({
  contentType,
  corregimientoRef,
  veredaRef,
  centroPobladoRef,
}) => {
  const paisContext = useContext(IdPaisUbicacionContext);
  if (!paisContext) {
    throw new Error("paisContext debe estar dentro de un PaisProvider");
  }
  const { idPaisUbicacion } = paisContext;

  const departamentoContext = useContext(IdDepartamentoUbicacionContext);
  if (!departamentoContext) {
    throw new Error(
      "departamentoContext debe estar dentro de un DepartamentoProvider"
    );
  }
  const { idDepartamentoUbicacion } = departamentoContext;

  const municipioContext = useContext(IdMunicipioUbicacionContext);
  if (!municipioContext) {
    throw new Error(
      "municipioContext debe estar dentro de un MunicipioProvider"
    );
  }
  const { idMunicipioUbicacion } = municipioContext;

  const zonaContext = useContext(IdZonaUbicacionContext);
  if (!zonaContext) {
    throw new Error("zonaContext debe estar dentro de un ZonaProvider");
  }
  const { idZonaUbicacion } = zonaContext;

  const [contentTypeId, setContentTypeId] = useState<number | null>(null);
  const [corregimiento, setCorregimiento] = useState<string>("");
  const [vereda, setVereda] = useState<string>("");
  const [centroPoblado, setCentroPoblado] = useState<string>("");
  const [resumenDireccion, setResumenDireccion] = useState<string>("");
  const [indicacionDireccion, setIndicacionDireccion] = useState<string>("");

  // Estado para validar si es la primera vez que se ejecuta el componente
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLElement>,
    setText: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    if (validateSpecialCharWithSpcs(target.value)) {
      setText(
        removeIntermediateSpaces(
          capitalizeWords(capitalizeFirstLetter(target.value))
        )
      );
    }
  };

  // Función para la indicación de dirección
  const handleAreaChange = (
    e: React.ChangeEvent<HTMLElement>,
    setIndicacionDireccion: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    if (validateSpecialCharWithNumsAndSpcs(target.value)) {
      const formattedSentence = target.value
        .split(" ")
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word.charAt(0) + word.slice(1).toLowerCase();
        })
        .join(" ")
        .trimStart();
      setIndicacionDireccion(removeIntermediateSpaces(formattedSentence));
    }
  };

  // Temporizador para la conversión de mayúsculas a minúsculas con excepciones y eliminación de espacios
  useEffect(() => {
    const timer = setTimeout(() => {
      setCorregimiento((prev) => prev.trim());
      setVereda((prev) => prev.trim());
      setCentroPoblado((prev) => prev.trim());
      setIndicacionDireccion((prev) => prev.trim());
    }, 2000);

    return () => clearTimeout(timer);
  }, [corregimiento, vereda, centroPoblado, indicacionDireccion]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    const fields = [vereda, corregimiento, centroPoblado];
    const resumen = fields
      .filter((field) => field.trim() !== "")
      .join(" ")
      .trim();
    setResumenDireccion(resumen);
  }, [vereda, corregimiento, centroPoblado]);

  // Consulta al API para traer el contentType correspondiente al modelo
  useEffect(() => {
    const fetchContentTypeId = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/contenttype/?model=${contentType}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setContentTypeId(data[0].id);
          } else {
            console.error(
              "No se encontró el ContentType para el modelo especificado."
            );
          }
        } else {
          console.error("Error al obtener el ContentType:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener el ContentType:", error);
      }
    };

    fetchContentTypeId();
  }, [contentType]);

  return (
    <Row>
      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Corregimiento <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            ref={corregimientoRef}
            type="text"
            value={corregimiento}
            onChange={(e) => handleTextChange(e, setCorregimiento)}
            maxLength={100}
          />
        </FormGroup>
      </Col>

      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Vereda <span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            ref={veredaRef}
            type="text"
            value={vereda}
            onChange={(e) => handleTextChange(e, setVereda)}
            maxLength={100}
            required
          />
        </FormGroup>
      </Col>

      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Centro poblado <span className="text-danger"></span>
          </FormLabel>
          <FormControl
            ref={centroPobladoRef}
            type="text"
            value={centroPoblado}
            onChange={(e) => handleTextChange(e, setCentroPoblado)}
            maxLength={100}
          />
        </FormGroup>
      </Col>

      <Col md={12} xs={12}>
        <FormGroup className="mb-2">
          <FormLabel>Indicaciones del lugar de domicilio</FormLabel>
          <FormControl
            type="text"
            value={indicacionDireccion}
            onChange={(e) => handleAreaChange(e, setIndicacionDireccion)}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export { Ubicacion, Zona, DireccionUrbana, DireccionRural };
