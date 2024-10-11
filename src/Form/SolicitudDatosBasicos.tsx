import React from "react";

import Logo from "../componentes/Escudos/Logo";
import { TituloForm, SubTituloForm } from "../Titulos/TitulosForm";
import {
  Identificacion,
  Sexo,
  Genero,
  OrientacionSexual,
  EstadoCivil,
  GpRh,
  FondoPensiones,
  Eps,
} from "../componentes/DatosBasicos/DatosBasicos";
import {
  Celular,
  CorreoElectronico,
} from "../componentes/DatosBasicos/Contacto";
import {
  Ubicacion,
  Zona,
  DireccionUrbana,
  DireccionRural,
} from "../componentes/DatosBasicos/Ubicacion";

import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Collapse,
} from "react-bootstrap";

import "../styles/Bootstrap.css";

import { toast } from "react-toastify";

const FormDatosBasicos: React.FC = () => {
  const logout = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await toast.promise(
        fetch("http://localhost:8000/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          pending: "Cerrando sesión...",
          success: {
            render({ data }) {
              if (data.status === 200) {
                return "Cierre de sesión exitosa!";
              }
              throw new Error("Error en la respuesta del servidor");
            },
          },
          error: {
            render() {
              return "Error durante el cierre de sesión.";
            },
          },
        },
        {
          position: "bottom-right",
          className: "foo-bar",
          hideProgressBar: true,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("access_token");
        setTimeout(() => {
          window.location.href = "./";
        }, 1000);
      }
    } catch (error) {
      console.error("Error en el logout:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xl={10} md={11} xs={12}>
          {/* Fila que contiene logos e imagenes institucionales */}
          <Row className="mb-4 justify-content-between">
            <Col className="col-auto align-self-center">
              <Logo
                size={"10em"}
                src={"img/logo-unp-gris.png"}
                alt={"Escudo Institucional UNP"}
              />
            </Col>
            <Col className="col-auto align-self-center">
              <Logo
                size={"8em"}
                src={"img/logo-min-interior.png"}
                alt={"Hashtag UNP"}
              />
            </Col>
          </Row>
          {/* Tarjeta que contiene el formulario */}
          <Card className="border-0 rounded-3 shadow">
            <CardHeader className="text-center bg-unp text-light rounded-3 rounded-bottom-0 py-4">
              <CardTitle className="px-xs-0 px-md-1 pd-lg-2">
                <h4>Formulario datos basicos del usuario</h4>
              </CardTitle>
            </CardHeader>

            <CardBody className="px-0">
              <form method="POST">
                <fieldset>
                  {/* Campos que hacen referencia a los datos básicos del solicitante */}
                  <TituloForm formTitulo={"Datos básicos"} />
                  {/* Contenedor de Bootstrap */}
                  <Container className="my-3">
                    {/* Fila para nombres, apellidos y género */}
                    <Row className="mx-1">
                      {/* Componente Identificacion */}
                      {/* <Identificacion /> */}
                      <Col xs={12} md={6}>
                        {/* Componente Sexo */}
                        {/* <Sexo /> */}
                      </Col>
                      <Col xs={12} md={6}>
                        {/* Componente Genero */}
                        {/* <Genero /> */}
                      </Col>
                      <Col xs={12} md={6}>
                        {/* Componente Orientacion */}
                        {/* <OrientacionSexual /> */}
                      </Col>
                      <Col xs={12} md={6} xl={3}>
                        {/* Componente Estado civil */}
                        {/* <EstadoCivil /> */}
                      </Col>
                      <Col xs={12} md={6} xl={3}>
                        {/* Componente GPRH */}
                        {/* <GpRh /> */}
                      </Col>
                      <Col xs={12} md={6} xl={3}>
                        {/* Componente Fondo pensiones */}
                        {/* <FondoPensiones /> */}
                      </Col>
                      <Col xs={12} md={6} xl={3}>
                        {/* Componente Eps */}
                        {/* <Eps /> */}
                      </Col>
                    </Row>
                  </Container>

                  {/* Campos relacionados con la ubicacion del usuario */}
                  <TituloForm formTitulo={"Ubicación"} />
                  {/* Contenedor de Bootstrap */}
                  <Container className="my-3">
                    {/* Fila para ubicacion */}
                    <Row className="mx-1">
                      {/* Componente Ubicación */}
                      {/* <Ubicacion /> */}
                      <Col lg={3} md={6} xs={12}>
                        {/* Componente Zona */}
                        {/* <Zona /> */}
                      </Col>
                    </Row>
                  </Container>

                  {/* Collapse con información de dirección urbana */}
                  <Collapse in={"1" === "1"}>
                    <Container className="pb-0 mb-0 bg-section">
                      <Card className="border-light-subtle rounded-3 mx-3">
                        <CardBody>
                          {/* Fila para el icono y subtítulo */}
                          <Row>
                            <Col className="col-auto align-self-center">
                              <SubTituloForm
                                formSubTitulo={"Dirección urbana"}
                              />
                            </Col>
                          </Row>

                          {/* Componente DireccionUrbana */}
                          {/* <DireccionUrbana /> */}
                        </CardBody>
                      </Card>
                    </Container>
                  </Collapse>
                  {/* Collapse con información de dirección rural */}
                  <Collapse in={"2" === "2"}>
                    <Container className="pb-0 mb-0 bg-section">
                      <Card className="border-light-subtle rounded-3 mx-3">
                        <CardBody>
                          {/* Fila para el icono y subtítulo */}
                          <Row>
                            <Col className="col-auto align-self-center">
                              <SubTituloForm
                                formSubTitulo={"Dirección rural"}
                              />
                            </Col>
                          </Row>

                          {/* Componente DireccionRural */}
                          {/* <DireccionRural /> */}
                        </CardBody>
                      </Card>
                    </Container>
                  </Collapse>
                  {/* Solucion temporal para la animación de dirección */}
                  {"1" === "1" && (
                    <Container className="py-3 bg-section mb-0"></Container>
                  )}
                  {"2" === "2" && (
                    <Container className="py-3 bg-section mb-0"></Container>
                  )}

                  {/* Campos relacionados con el contacto del usuario */}
                  <TituloForm formTitulo={"Contacto"} />
                  {/* Contenedor de Bootstrap */}
                  <Container className="my-3">
                    {/* Fila para contacto */}
                    <Row className="mx-1">
                      {/* Componente Celulares */}
                      {/* <Celular /> */}
                      {/* Componente Correo */}
                      {/* <CorreoElectronico /> */}
                    </Row>
                  </Container>
                </fieldset>
                <Row className="justify-content-end mx-3 mt-4 mb-3">
                  <Col xs="auto">
                    <Button variant="send">Enviar</Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="danger" onClick={logout}>
                      Salir
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { FormDatosBasicos };
