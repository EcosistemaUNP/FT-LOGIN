import React, { useState, useEffect, useContext, RefObject } from "react";
import {
  IdCelularContext,
  IdCorreoElectronicoContext,
} from "../../context/Contacto";

// validación
import { validateEmail } from "../../funciones/validacionCampos";

// Elementos de Bootstrap
import { Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";

interface CelularProps {
  celularUnoRef: RefObject<HTMLInputElement>;
  celularDosRef: RefObject<HTMLInputElement>;
  celularEmgRef: RefObject<HTMLInputElement>;
}

const Celular: React.FC<CelularProps> = ({
  celularUnoRef,
  celularDosRef,
  celularEmgRef,
}) => {
  const celularContext = useContext(IdCelularContext);

  if (!celularContext) {
    throw new Error(
      "IdCelularContext debe estar dentro de un IdCelularProvider"
    );
  }
  const { setIdCelular } = celularContext;

  const [celularUno, setCelularUno] = useState<string>("");
  const [celularDos, setCelularDos] = useState<string>("");
  const [celularEmg, setCelularEmg] = useState<string>("");
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLInputElement;
    let value = target.value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    setState(formattedValue);
    setIdCelular(formattedValue);
  };

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <>
      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Celular uno <span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            ref={celularUnoRef}
            type="text"
            value={celularUno}
            onChange={(e) => handleInputChange(e, setCelularUno)}
            minLength={10}
            maxLength={10}
            placeholder="Ej: 300 200 2000"
            required
          />
        </FormGroup>
      </Col>
      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>Celular dos </FormLabel>
          <FormControl
            ref={celularDosRef}
            type="text"
            value={celularDos}
            onChange={(e) => handleInputChange(e, setCelularDos)}
            minLength={10}
            maxLength={10}
            placeholder="Ej: 300 200 2000"
          />
        </FormGroup>
      </Col>
      <Col md={4} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>Celular de emergencia</FormLabel>
          <FormControl
            ref={celularEmgRef}
            type="text"
            value={celularEmg}
            onChange={(e) => handleInputChange(e, setCelularEmg)}
            minLength={10}
            maxLength={10}
            placeholder="Ej: 600 700 7000"
          />
        </FormGroup>
      </Col>
    </>
  );
};

interface CorreoElectronicoProps {
  correoElectronicoRef: RefObject<HTMLInputElement>;
}

const CorreoElectronico: React.FC<CorreoElectronicoProps> = ({
  correoElectronicoRef,
}) => {
  const correoElectronicoContext = useContext(IdCorreoElectronicoContext);

  if (!correoElectronicoContext) {
    throw new Error(
      "IdCorreoElectronicoContext debe estar dentro de un IdCorreoElectronicoProvider"
    );
  }
  const { setIdCorreoElectronico } = correoElectronicoContext;
  const [correoElectronicoValue, setCorreoElectronicoValue] =
    useState<string>("");
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const handleInputCorreo = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    let email = target.value;
    email = validateEmail(email);
    setCorreoElectronicoValue(email);
    setIdCorreoElectronico(email);
    target.value = email;
  };

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <>
      <Col xl={6} md={9} xs={12}>
        <FormGroup className="mb-3">
          <FormLabel>
            Correo electrónico <span className="text-danger">*</span>
          </FormLabel>
          <FormControl
            ref={correoElectronicoRef}
            type="email"
            value={correoElectronicoValue}
            onChange={handleInputCorreo}
            maxLength={100}
            required
          />
        </FormGroup>
      </Col>
    </>
  );
};

export { Celular, CorreoElectronico };
