import React, {
  useEffect,
  useState,
  useContext,
  RefObject,
  MutableRefObject,
} from "react";
import {
  IdIdentificacionContext,
  IdSexoContext,
  IdGeneroContext,
  IdTipoOrientacionContext,
  IdEstadoCivilContext,
  IdGpRhContext,
  IdFondoPensionesContext,
  IdEpsContext,
} from "../../context/DatosBasicos";

// Elementos de Bootstrap
import {
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";

// Tipos para las props del componente
interface IdentificacionProps {
  tipoIdSeleccionado: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  tipoIdentificacionRef: RefObject<HTMLSelectElement>;
  numeroIdentificacionRef: RefObject<HTMLInputElement>;
  fechaIdentificacionRef: RefObject<HTMLInputElement>;
  fechaExp?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TipoIdentificacion {
  id_tidentificacion: number;
  nombre_tidentificacion: string;
}

const Identificacion: React.FC<IdentificacionProps> = ({
  tipoIdSeleccionado,
  tipoIdentificacionRef,
  numeroIdentificacionRef,
  fechaIdentificacionRef,
  fechaExp,
}) => {
  const [tipoIdentificacion, setTipoIdentificacion] = useState<
    TipoIdentificacion[]
  >([]);
  const identificacionContext = useContext(IdIdentificacionContext);
  if (!identificacionContext) {
    throw new Error(
      "identificacionContext debe estar dentro de un IdIdentificacionProvider"
    );
  }
  const { setIdIdentificacion } = identificacionContext;

  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");
  const [numeroIdentificacion, setNumeroIdentificacion] = useState<string>("");
  const [fechaExpedicion, setFechaExpedicion] = useState<string>("");
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  // validación para el campo de número de identificación
  const handleNumeroIdentificacionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (tipoSeleccionado === "1" || tipoSeleccionado === "2") {
      if (/^\d{0,10}$/.test(value)) {
        setNumeroIdentificacion(value);
      }
    } else {
      if (/^\d{0,10}$/.test(value)) {
        setNumeroIdentificacion(value);
      }
    }
    setIdIdentificacion(value);
  };

  const updateFechaExpedicion = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fechaExp) {
      fechaExp(e);
    }
  };

  // Actualiza la variable después de la primera vez que se ejecuta el componente
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const updateTipoIdentificacion = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (tipoIdSeleccionado) {
      tipoIdSeleccionado(e);
    }
  };

  // consulta al API para traer los diferentes tipos de identificación
  useEffect(() => {
    const obtenerTipoIdentificacion = async () => {
      try {
        const url = process.env.REACT_APP_API_ENDPOINT + "/tipoidentificacion/";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTipoIdentificacion(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los tipos de identificación:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los tipos de identificación:",
          error
        );
      }
    };

    obtenerTipoIdentificacion();
  }, []);

  return (
    <React.Fragment>
      {/* Select para el Tipo de identificación */}
      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Tipo de identificación <span className="text-danger">*</span>
          </FormLabel>
          <FormSelect
            ref={tipoIdentificacionRef}
            value={tipoSeleccionado}
            onChange={(e) => {
              setTipoSeleccionado(e.target.value);
              updateTipoIdentificacion(e);
            }}
          >
            <option value="0">Seleccione un tipo</option>
            {tipoIdentificacion.map((tidentificacion) => (
              <option
                key={tidentificacion.id_tidentificacion}
                value={tidentificacion.id_tidentificacion}
              >
                {tidentificacion.nombre_tidentificacion}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
      </Col>

      {/* Input para el Número de identificación */}
      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Número de identificación <span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            type="text"
            ref={numeroIdentificacionRef}
            value={numeroIdentificacion}
            onChange={handleNumeroIdentificacionChange}
            minLength={6}
            maxLength={15}
            required
          />
        </FormGroup>
      </Col>

      {/* Input para la Fecha de expedición */}
      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Fecha de expedición <span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            ref={fechaIdentificacionRef}
            type="date"
            value={fechaExpedicion}
            onChange={(e) => {
              setFechaExpedicion(e.target.value);
              updateFechaExpedicion(e as React.ChangeEvent<HTMLInputElement>);
            }}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

// Definición de la interfaz para el tipo de sexo
interface TipoSexo {
  id_tsexo: number;
  nombre_tsexo: string;
}

// Definición de las props que espera el componente
interface SexoProps {
  sexoRef: MutableRefObject<HTMLSelectElement | null>;
}

const Sexo: React.FC<SexoProps> = ({ sexoRef }) => {
  const sexoContext = useContext(IdSexoContext);
  if (!sexoContext) {
    throw new Error("sexoContext debe estar dentro de un IdSexoProvider");
  }
  const { setIdSexo } = sexoContext;

  const [tipoSexo, setTipoSexo] = useState<TipoSexo[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerTipoGenero = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/tiposexo/`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTipoSexo(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los tipos de Sexo:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los tipos de Sexo:",
          error
        );
      }
    };

    obtenerTipoGenero();
  }, []);

  useEffect(() => {
    setIdSexo(tipoSeleccionado);
  }, [tipoSeleccionado, setIdSexo]);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Sexo <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={sexoRef}
        value={tipoSeleccionado}
        onChange={(e) => {
          setTipoSeleccionado(e.target.value);
        }}
      >
        <option value="0">Seleccione</option>
        {tipoSexo.map((tsexo) => (
          <option key={tsexo.id_tsexo} value={tsexo.id_tsexo}>
            {tsexo.nombre_tsexo}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

// Definición de la interfaz para el tipo de género
interface TipoGenero {
  id_tgenero: number;
  nombre_tgenero: string;
}

// Definición de las props que espera el componente
interface GeneroProps {
  generoRef: MutableRefObject<HTMLSelectElement | null>;
}

const Genero: React.FC<GeneroProps> = ({ generoRef }) => {
  const generoContext = useContext(IdGeneroContext);
  if (!generoContext) {
    throw new Error("generoContext debe estar dentro de un IdGeneroProvider");
  }
  const { setIdGenero } = generoContext;

  const [tipoGenero, setTipoGenero] = useState<TipoGenero[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerTipoGenero = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/tipogenero/`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTipoGenero(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los tipos de Género:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los tipos de Género:",
          error
        );
      }
    };

    obtenerTipoGenero();
  }, []);

  useEffect(() => {
    setIdGenero(tipoSeleccionado);
  }, [tipoSeleccionado, setIdGenero]);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Género <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={generoRef}
        value={tipoSeleccionado}
        onChange={(e) => {
          setTipoSeleccionado(e.target.value);
        }}
      >
        <option value="0">Seleccione</option>
        {tipoGenero.map((tgenero) => (
          <option key={tgenero.id_tgenero} value={tgenero.id_tgenero}>
            {tgenero.nombre_tgenero}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

// Definición de la interfaz para el tipo de orientación sexual
interface TipoOrientacion {
  id_torientacion: number;
  nombre_torientacion: string;
}

// Definición de las props que espera el componente
interface OrientacionSexualProps {
  orientacionSexualRef: MutableRefObject<HTMLSelectElement | null>;
}

const OrientacionSexual: React.FC<OrientacionSexualProps> = ({
  orientacionSexualRef,
}) => {
  const tipoOrientacionContext = useContext(IdTipoOrientacionContext);
  if (!tipoOrientacionContext) {
    throw new Error(
      "tipoOrientacionContext debe estar dentro de un IdTipoOrientacionProvider"
    );
  }
  const { setIdTipoOrientacion } = tipoOrientacionContext;

  const [tipoOrientacion, setTipoOrientacion] = useState<TipoOrientacion[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerTipoOrientacion = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/tiposexual/`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTipoOrientacion(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los tipos de Orientación Sexual:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los tipos de Orientación Sexual:",
          error
        );
      }
    };

    obtenerTipoOrientacion();
  }, []);

  useEffect(() => {
    setIdTipoOrientacion(tipoSeleccionado);
  }, [tipoSeleccionado, setIdTipoOrientacion]);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Orientación sexual <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={orientacionSexualRef}
        value={tipoSeleccionado}
        onChange={(e) => setTipoSeleccionado(e.target.value)}
        required
      >
        <option value="0">Seleccione</option>
        {tipoOrientacion.map((torientacion) => (
          <option
            key={torientacion.id_torientacion}
            value={torientacion.id_torientacion}
          >
            {torientacion.nombre_torientacion}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

// Definición de la interfaz para el estado civil
interface EstadoCivilItem {
  id_ecivil: number;
  nombre_ecivil: string;
}

// Definición de las props que espera el componente
interface EstadoCivilProps {
  estadoCivilRef: MutableRefObject<HTMLSelectElement | null>;
}

const EstadoCivil: React.FC<EstadoCivilProps> = ({ estadoCivilRef }) => {
  const estadoCivilContext = useContext(IdEstadoCivilContext);
  if (!estadoCivilContext) {
    throw new Error(
      "estadoCivilContext debe estar dentro de un IdEstadoCivilProvider"
    );
  }
  const { setIdEstadoCivil } = estadoCivilContext;

  const [estadoCivil, setEstadoCivil] = useState<EstadoCivilItem[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerEstadoCivil = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/estadocivil/`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setEstadoCivil(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los estado civiles:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los estado civiles:",
          error
        );
      }
    };

    obtenerEstadoCivil();
  }, []);

  useEffect(() => {
    setIdEstadoCivil(tipoSeleccionado);
  }, [tipoSeleccionado, setIdEstadoCivil]);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Estado civil <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={estadoCivilRef}
        value={tipoSeleccionado}
        onChange={(e) => setTipoSeleccionado(e.target.value)}
      >
        <option value="0">Seleccione</option>
        {estadoCivil.map((tecivil) => (
          <option key={tecivil.id_ecivil} value={tecivil.id_ecivil}>
            {tecivil.nombre_ecivil}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

// Definición de la interfaz para GP/RH
interface GpRhItem {
  id_grh: number;
  nombre_grh: string;
}

// Definición de las props que espera el componente
interface GpRhProps {
  gpRhRef: MutableRefObject<HTMLSelectElement | null>;
}

const GpRh: React.FC<GpRhProps> = ({ gpRhRef }) => {
  const gpRhContext = useContext(IdGpRhContext);
  if (!gpRhContext) {
    throw new Error("gpRhContext debe estar dentro de un IdGpRhProvider");
  }
  const { setIdGpRh } = gpRhContext;
  const [gpRh, setGpRh] = useState<GpRhItem[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerGpRh = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/gprh/`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setGpRh(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los gp/rh:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los gp/rh:",
          error
        );
      }
    };

    obtenerGpRh();
  }, []);

  useEffect(() => {
    setIdGpRh(tipoSeleccionado);
  }, [tipoSeleccionado, setIdGpRh]);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        GP / RH <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={gpRhRef}
        value={tipoSeleccionado}
        onChange={(e) => setTipoSeleccionado(e.target.value)}
      >
        <option value="0">Seleccione</option>
        {gpRh.map((tgrh) => (
          <option key={tgrh.id_grh} value={tgrh.id_grh}>
            {tgrh.nombre_grh}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

// Definición de la interfaz para Fondo de Pensiones
interface FondoPensionesItem {
  id_fpensiones: number;
  nombre_fpensiones: string;
}

// Definición de las props que espera el componente
interface FondoPensionesProps {
  fondoPensionesRef: MutableRefObject<HTMLSelectElement | null>;
}

const FondoPensiones: React.FC<FondoPensionesProps> = ({
  fondoPensionesRef,
}) => {
  const fondoPensionesContext = useContext(IdFondoPensionesContext);
  if (!fondoPensionesContext) {
    throw new Error(
      "fondoPensionesContext debe estar dentro de un IdFondoPensionesProvider"
    );
  }
  const { setIdFondoPensiones } = fondoPensionesContext;
  const [fondoPensiones, setFondoPensiones] = useState<FondoPensionesItem[]>(
    []
  );
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerFondoPensiones = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/fondopensiones/`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setFondoPensiones(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los fondo de pensiones:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Hubo un error al obtener los datos de los fondo de pensiones:",
          error
        );
      }
    };

    obtenerFondoPensiones();
  }, []);

  useEffect(() => {
    setIdFondoPensiones(tipoSeleccionado);
  }, [tipoSeleccionado, setIdFondoPensiones]);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Fondo de pensiones <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={fondoPensionesRef}
        value={tipoSeleccionado}
        onChange={(e) => setTipoSeleccionado(e.target.value)}
      >
        <option value="0">Seleccione</option>
        {fondoPensiones.map((tfpensiones) => (
          <option
            key={tfpensiones.id_fpensiones}
            value={tfpensiones.id_fpensiones}
          >
            {tfpensiones.nombre_fpensiones}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

// Definición de la interfaz para Eps
interface EpsItem {
  id_eps: number;
  nombre_eps: string;
}

// Definición de las props que espera el componente
interface EpsProps {
  epsRef: MutableRefObject<HTMLSelectElement | null>;
}

const Eps: React.FC<EpsProps> = ({ epsRef }) => {
  const epsContext = useContext(IdEpsContext);
  if (!epsContext) {
    throw new Error("epsContext debe estar dentro de un IdEpsProvider");
  }
  const { setIdEps } = epsContext;
  const [eps, setEps] = useState<EpsItem[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerEps = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/eps/`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setEps(data);
        } else {
          console.error(
            "Hubo un error al obtener los datos de los eps:",
            response.status
          );
        }
      } catch (error) {
        console.error("Hubo un error al obtener los datos de los eps:", error);
      }
    };

    obtenerEps();
  }, []);

  useEffect(() => {
    setIdEps(tipoSeleccionado);
  }, [tipoSeleccionado, setIdEps]);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Eps <span className="text-danger">*</span>
      </FormLabel>
      <FormSelect
        ref={epsRef}
        value={tipoSeleccionado}
        onChange={(e) => setTipoSeleccionado(e.target.value)}
      >
        <option value="0">Seleccione</option>
        {eps.map((teps) => (
          <option key={teps.id_eps} value={teps.id_eps}>
            {teps.nombre_eps}
          </option>
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export {
  Identificacion,
  Sexo,
  Genero,
  OrientacionSexual,
  EstadoCivil,
  GpRh,
  FondoPensiones,
  Eps,
};
