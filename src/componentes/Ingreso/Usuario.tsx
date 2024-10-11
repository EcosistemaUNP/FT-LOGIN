import React, { useState, useContext } from "react";
import { IdUsuarioContext } from "../../context/Ingreso";
import { validateOnlyLetters } from "../../funciones/validacionCampos";

// Elementos de Bootstrap
import {
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";

interface UsuarioProps {
  usuarioRef: React.RefObject<HTMLInputElement>;
}

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
    setUsuario(value);

    if (validateOnlyLetters(value)) {
      setIsValid(true);
      setIdUsuario(value);
    } else {
      setIsValid(false);
    }
  };

  return (
    <React.Fragment>
      <Col xl={12} md={9} xs={12}>
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
              placeholder="nombre.apellido"
              pattern="^[a-z]+\.[a-z]+$"
              maxLength={100}
              isValid={isValid}
              required
            />
            <FormControl.Feedback type="invalid">
              Por favor ingrese un usuario en el formato nombre.apellido, solo
              minúsculas.
            </FormControl.Feedback>
          </InputGroup>
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

export { Usuario };
