import React, { useState, useContext } from "react";
import { IdContraseñaContext } from "../../context/Ingreso";

// Elementos de Bootstrap
import {
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ContraseñaProps {
  contraseñaRef: React.RefObject<HTMLInputElement>;
}

const Contraseña: React.FC<ContraseñaProps> = ({ contraseñaRef }) => {
  const contraseñaContext = useContext(IdContraseñaContext);
  if (!contraseñaContext) {
    throw new Error(
      "contraseñaContext debe estar dentro de un IdContraseñaProvider"
    );
  }
  const { setIdContraseña } = contraseñaContext;

  const [contraseña, setContraseña] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleContraseñaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setContraseña(value);

    if (value) {
      setIsValid(true);
      setIdContraseña(value);
    } else {
      setIsValid(false);
    }
  };

  return (
    <React.Fragment>
      <Col xl={12} md={9} xs={12}>
        <FormGroup className="mb-3" controlId="validacionContraseña">
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <InputGroup.Text id="password-icon">
              <RiLockPasswordFill />
            </InputGroup.Text>
            <FormControl
              type={showPassword ? "text" : "password"}
              ref={contraseñaRef}
              value={contraseña}
              onChange={handleContraseñaChange}
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
              Por favor ingresa una contraseña
            </FormControl.Feedback>
          </InputGroup>
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

export { Contraseña };
