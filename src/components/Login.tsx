import React, { useState, useContext } from "react";
import {
  IdUsuarioContext,
  IdContrasegnaContext,
} from "../contexts/IngresoContex";
import { validarInputUsuario } from "../func/ValidacionInput";
import { FaUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import {
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";

interface UsuarioProps {
  usuarioRef: React.RefObject<HTMLInputElement>;
}

interface ContrasegnaProps {
  contrasegnaRef: React.RefObject<HTMLInputElement>;
}

interface SocialIconProps {
  color: string;
  IconoRedSocial: React.ComponentType<{ size: string; color: string }>;
  descripcion: string;
  enlace: string;
}

// Componente del input de usuario
const Usuario: React.FC<UsuarioProps> = ({ usuarioRef }) => {
  const usuarioContext = useContext(IdUsuarioContext);
  if (!usuarioContext) {
    throw new Error("usuarioContext debe estar dentro de un IdUsuarioProvider");
  }
  const { setIdUsuario } = usuarioContext;
  const [usuario, setUsuario] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    const validValue = validarInputUsuario(value);
    setUsuario(validValue);
    setIsValid(validValue ? true : false);
  };

  return (
    <React.Fragment>
      <Col xl={12} md={12} xs={12}>
        <FormGroup className="mb-3" controlId="validacionUsuario">
          <FormLabel>Usuario</FormLabel>
          <InputGroup>
            <InputGroup.Text id="email-icon">
              <FaUser />
            </InputGroup.Text>

            <FormControl
              className="rounded-end"
              type="text"
              ref={usuarioRef}
              value={usuario}
              onChange={handleUsuarioChange}
              onInput={handleUsuarioChange}
              placeholder="nombre.apellido"
              pattern="^[a-z]+\.[a-z]+$"
              maxLength={100}
              isValid={isValid}
              required
            />
          </InputGroup>
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

const Contrasegna: React.FC<ContrasegnaProps> = ({ contrasegnaRef }) => {
  const contrasegnaContext = useContext(IdContrasegnaContext);
  if (!contrasegnaContext) {
    throw new Error(
      "contrasegnaContext debe estar dentro de un IdContrasegnaProvider"
    );
  }
  const { setIdContrasegna } = contrasegnaContext;

  const [contrasegna, setContrasegna] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleContrasegnaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setContrasegna(value);

    if (value) {
      setIsValid(true);
      setIdContrasegna(value);
    } else {
      setIsValid(false);
    }
  };

  return (
    <React.Fragment>
      <Col xl={12} md={12} xs={12}>
        <FormGroup className="mb-3" controlId="validacionContrasegna">
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <InputGroup.Text id="password-icon">
              <FaUnlockKeyhole />
            </InputGroup.Text>
            <FormControl
              type={showPassword ? "text" : "password"}
              ref={contrasegnaRef}
              value={contrasegna}
              onChange={handleContrasegnaChange}
              placeholder="*****************"
              maxLength={100}
              isValid={isValid}
              required
            />
            <Button
              type="button"
              className="rounded-end"
              variant="secondary"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? (
                <FaRegEye color="#FFF" />
              ) : (
                <FaRegEyeSlash color="#FFF" />
              )}
            </Button>
            <FormControl.Feedback type="invalid">
              Por favor ingresa una contrasegna
            </FormControl.Feedback>
          </InputGroup>
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

const RedesSociales: React.FC<SocialIconProps> = ({
  color,
  IconoRedSocial,
  descripcion,
  enlace,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundColor: isHovered ? "#365072" : color,
    width: "37px",
    height: "37px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginTop: "2px",
    marginRight: "4px",
    marginLeft: "4px",
    position: "relative" as "relative",
    cursor: "pointer",
  };

  const tooltipStyle: React.CSSProperties = {
    visibility: isHovered ? "visible" : "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#365072",
    textAlign: "center",
    borderRadius: "6px",
    padding: "5px",
    position: "absolute",
    zIndex: 1,
    top: "120%",
    left: "50%",
    marginLeft: "-75px",
    width: "150px",
    fontWeight: "600",
  };

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IconoRedSocial size={"1.2em"} color="#FFF" />
        <div style={tooltipStyle}>{descripcion}</div>
      </div>
    </a>
  );
};

export { Usuario, Contrasegna, RedesSociales };
