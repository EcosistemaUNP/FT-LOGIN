import React, { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import LogosUnp from "./components/Logos";
import { validarTextoMayusculasYNumeros } from "./func/ValidacionInput";
import { useIdCorreo, useIdUsuarioR } from "./hooks/RegistroHook";
import { RegistroProvider } from "./contexts/RegistroContext";
import { RegistroService } from "./services/RegistroService";

import "./styles/Bootstrap.css";
import "./styles/Registro.css";

interface RegistroPageProps {}

const FormRegistro: React.FC<RegistroPageProps> = ({}) => {
  const { idUsuario: usuario, setIdUsuario: setUsuario } = useIdUsuarioR();
  const { idCorreo: correo, setIdCorreo: setCorreo } = useIdCorreo();

  const [validated, setValidated] = useState<boolean>(false);

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    let validValue = false;
    let newValue = value;

    if (value.length > 0) {
      const primerCaracter = value[0];
      if (/[A-Z]/.test(primerCaracter)) {
        validValue = validarTextoMayusculasYNumeros(value);
        newValue = value.replace(/[^A-Z0-9]/g, "");
      }
    }

    setIsValid(validValue);
    setUsuario(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(false);
      toast.error("Por favor, rellene los campos.", {
        position: "top-right",
        className: "foo-bar",
        hideProgressBar: true,
      });
      return;
    }

    setValidated(true);

    if (usuario && correo) {
      try {
        toast.promise(
          RegistroService(usuario, correo),
          {
            pending: "Registrando",
            success: {
              render({ data }) {
                return data.message;
              },
            },
            error: {
              render({ data }) {
                setValidated(false);
                if (
                  typeof data === "object" &&
                  data !== null &&
                  "message" in data
                ) {
                  return (data as { message: string }).message;
                }
              },
            },
          },
          {
            position: "top-right",
            className: "foo-bar",
            hideProgressBar: true,
          }
        );
      } catch (error) {
        toast.error("Hubo un error", {
          position: "top-right",
          className: "foo-bar",
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <div className="registro-container">
      <Container style={{ maxWidth: "720px", maxHeight: "600px" }}>
        <Row className="justify-content-md-center border-0 rounded shadow">
          <Col
            md={6}
            className="bg-form align-content-center px-5 rounded-start"
          >
            <Row className="justify-content-md-center">
              <h2 className="text-center text-white">
                Ecosistema de Información
              </h2>
              <hr className="text-light"></hr>
              <LogosUnp
                src={
                  "https://live.staticflickr.com/65535/54064468237_fb5a3edea2_z.jpg"
                }
                size={"7em"}
                alt={"Escudo Institucional Logos"}
                height={"106px"}
              />
              <p
                className="text-center mt-4"
                style={{ color: "#BFBFBF", fontWeight: "500" }}
              >
                Integrar la gestión, potencializar los resultados
              </p>
            </Row>
          </Col>

          {/* Columna derecha con fondo blanco y borde redondeado */}
          <Col md={6} className="pt-4 pb-3 rounded-end bg-white">
            {/* Fila que contiene logos e imágenes institucionales */}
            <Row className="justify-content-md-center text-center">
              <LogosUnp
                size={"9em"}
                src={
                  "https://live.staticflickr.com/65535/54065780355_d6580531a4_q.jpg"
                }
                alt={"Escudo Institucional UNP"}
                height={"120px"}
              />
              <h4 className="mt-2">Registro</h4>
            </Row>

            {/* Formulario de inicio de sesión */}
            <Row className="justify-content-md-center mx-0">
              <form
                method="POST"
                noValidate
                className={validated ? "was-validated" : ""}
                onSubmit={(e) => handleSubmit(e)}
              >
                {/* Campos de usuario y correo */}
                <Form.Group className="mb-3" controlId="usuario">
                  <Form.Label>
                    Usuario <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escribe un usuario"
                    value={usuario}
                    onChange={handleUsuarioChange}
                    onInput={handleUsuarioChange}
                    isValid={isValid}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="correo">
                  <Form.Label>
                    Correo <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Escribe un correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Botón de enviar */}
                <Col xl={12} md={12} xs={12} className="d-grid gap-2">
                  <Button variant="secondary" type="submit">
                    Registrar
                  </Button>
                </Col>
              </form>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Registro: React.FC = () => {
  // -----> Renderizado
  return (
    <>
      {/* El componente RegistroProvider envuelve al componente FormRegistro*/}
      <RegistroProvider>
        <FormRegistro />
      </RegistroProvider>
    </>
  );
};

export default Registro;
