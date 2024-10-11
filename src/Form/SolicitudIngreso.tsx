import React, { useEffect, useRef, useState } from "react";

// Elementos de Bootstrap y estilos propios
import Logo from "../componentes/Escudos/Logo";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import "../styles/Bootstrap.css";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

import { Usuario } from "../componentes/Ingreso/Usuario";
import { Contraseña } from "../componentes/Ingreso/Contraseña";

import { MdError } from "react-icons/md";

interface FormIngresoProps {
  children?: React.ReactNode; // Permitir pasar nodos como hijos
}

export const FormIngreso: React.FC<FormIngresoProps> = (props) => {
  const usuarioRef = useRef<HTMLInputElement>(null); // Especificar el tipo de referencia
  const contraseñaRef = useRef<HTMLInputElement>(null); // Especificar el tipo de referencia
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Especificar el tipo de estado

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [attempts, setAttempts] = useState<number>(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const maxAttempts = 3;
  const blockTime = 10;

  const handleCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (attempts < maxAttempts) {
      if (!form.checkValidity()) {
        e.stopPropagation();
        setValidated(false);
        return;
      }

      if (!recaptchaToken) {
        e.stopPropagation();
        setError("Por favor, completa el reCAPTCHA");
        return;
      }

      setError(null);
      setValidated(true);

      const username = usuarioRef.current?.value;
      const password = contraseñaRef.current?.value;

      try {
        const response = await toast.promise(
          fetch("http://localhost:8000/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, recaptchaToken }),
          }),
          {
            pending: "Ingresando...",
            success: {
              render({ data }) {
                if (data.status === 200) {
                  setTimeout(() => {
                    window.location.href = "./";
                  }, 1000);
                  return "Ingreso exitoso!";
                }
                throw new Error("Error en la respuesta del servidor");
              },
            },
            error: {
              render() {
                setValidated(false);
                setError("Error durante el ingreso");
                return "Error durante el ingreso.";
              },
            },
          },
          {
            position: "bottom-right",
            className: "foo-bar",
            hideProgressBar: true,
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
          } else {
            setAttempts((prevAttempts) => prevAttempts + 1);
            setError("Credenciales incorrectas");
          }
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Error en el servidor");
          recaptchaRef.current?.reset();
        }
      } catch (error) {
        setError("Error de conexión");
        recaptchaRef.current?.reset();
      } finally {
        if (attempts + 1 >= maxAttempts) {
          setIsBlocked(true);
          setTimer(blockTime);
        }
      }
    } else {
      setIsBlocked(true);
      setTimer(blockTime);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isBlocked && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0 && isBlocked) {
      setIsBlocked(false);
      setAttempts(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBlocked, timer]);

  return (
    <>
      <Container style={{ maxWidth: "700px" }} className="my-5 border-0 shadow">
        <Row className="justify-content-md-center">
          <Col
            md={6}
            className="bg-form align-content-center px-5 rounded-start"
          >
            <Row className="justify-content-md-center">
              <h2 className="text-center text-white">
                Ecosistema de Información
              </h2>
              <hr className="text-light"></hr>
              <Logo
                size={"10em"}
                src={"img/logo-min-interior.png"}
                alt={"Escudo Institucional UNP"}
              />
            </Row>
          </Col>
          <Col md={6} className="py-4 rounded-end bg-white">
            {/* Fila que contiene logos e imagenes institucionales */}
            <Container className="my-1">
              <Row className="justify-content-md-center text-center">
                <Logo
                  size={"10em"}
                  src={"img/logo-unp-gris.png"}
                  alt={"Escudo Institucional UNP"}
                />
                <h4 className="mt-2">Inicio de sesión</h4>
              </Row>
            </Container>
            <Container className="my-1">
              <Row className="justify-content-md-center">
                <form
                  method="POST"
                  noValidate
                  className={validated ? "was-validated" : ""}
                  onSubmit={handleSubmit}
                >
                  <Row className="justify-content-center">
                    <Usuario usuarioRef={usuarioRef} />
                    <Contraseña contraseñaRef={contraseñaRef} />
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      className="mb-3"
                      sitekey="6LeC9F0qAAAAAJrKsyU-wpvYmDquDcAoqhH_oASk"
                      onChange={handleCaptchaChange}
                    />
                    <Col xl={12} md={9} xs={12} className="d-grid gap-2">
                      <Button
                        variant="secondary"
                        disabled={isBlocked}
                        type="submit"
                      >
                        {isBlocked ? `Espera ${timer} segundos` : "Ingresar"}
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Row>
              {error && (
                <Alert className="mt-3" key={"danger"} variant={"danger"}>
                  <MdError /> {error}
                </Alert>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
      <br />
      {props.children}
    </>
  );
};
