import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaPhoneFlip,
  FaHeadphones,
  FaFileContract,
  FaKey,
  FaUnlockKeyhole,
} from "react-icons/fa6";
import { FaUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  Row,
  Col,
  Container,
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";

import { useAuth } from "eco-unp/Utils";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./utils/msalConfig";

import {
  useIdUsuario,
  useIdContrasena,
  useIdCaptcha,
} from "./hooks/InicioSesionHook";
import {
  InicioSesionService,
  Validar2FA,
} from "./services/InicioSesionService";
import { InicioSesionProvider } from "./contexts/InicioSesionContext";

import {
  validarTextoMayusculasYNumeros,
  validarTextoPuntoTexto,
} from "./func/ValidacionInput";

import LogosUnp from "./components/Logos";
import "./styles/Bootstrap.css";
import "./styles/InicioSesion.css";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

import { Turnstile } from "@marsidev/react-turnstile";

interface UsuarioProps {
  isValid: boolean;
}

interface ContrasenaProps {
  isValid: boolean;
}

interface SocialIconProps {
  color: string;
  IconoRedSocial: React.ComponentType<{ size: string; color: string }>;
  descripcion: string;
  enlace: string;
}

const Usuario: React.FC<UsuarioProps> = ({ isValid }) => {
  const { idUsuario: usuario, setIdUsuario: setUsuario } = useIdUsuario();

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    let validValue = false;
    let newValue = value;

    if (value.length > 0) {
      const primerCaracter = value[0];
      if (/[A-Z]/.test(primerCaracter)) {
        validValue = validarTextoMayusculasYNumeros(value);
        newValue = value.replace(/[^A-Z0-9]/g, "");
      } else if (/[a-z]/.test(primerCaracter)) {
        validValue = validarTextoPuntoTexto(value);
        newValue = value.replace(/[^a-z.]/g, "");
      }
    }
    setUsuario(newValue);
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
              value={usuario}
              onChange={handleUsuarioChange}
              onInput={handleUsuarioChange}
              placeholder="nombre.apellido"
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

const Contrasena: React.FC<ContrasenaProps> = ({ isValid }) => {
  const { idContrasena: contrasena, setIdContrasena: setContrasena } =
    useIdContrasena();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleContrasenaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setContrasena(value);
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
              value={contrasena}
              onChange={handleContrasenaChange}
              placeholder="*****************"
              maxLength={100}
              isValid={isValid}
              required
            />
            <Button
              type="button"
              className="rounded-end"
              style={{ backgroundColor: "#365072", border: "none" }}
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
              Por favor ingresa una contrasena
            </FormControl.Feedback>
          </InputGroup>
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

const Captcha: React.FC = () => {
  const { setIdCaptcha } = useIdCaptcha();

  return (
    <Col
      xl={12}
      md={9}
      xs={12}
      className="d-flex justify-content-center mt-4 mb-2"
      style={{ width: "308px", height: "80px" }}
    >
      <Turnstile
        siteKey={
          process.env.REACT_APP_SECRET_KEY_CAPTCHA
            ? process.env.REACT_APP_SECRET_KEY_CAPTCHA
            : ""
        }
        options={{
          theme: "light",
          language: "es",
        }}
        onSuccess={setIdCaptcha}
      />
    </Col>
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

interface DobleFactorProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const DobleFactor: React.FC<DobleFactorProps> = ({ value, onChange }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      onChange({
        target: { value: newCode.join("") },
      } as React.ChangeEvent<HTMLInputElement>);

      if (value.length === 1 && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  return (
    <React.Fragment>
      <Col xl={12} md={12} xs={12}>
        <FormGroup className="mb-3" controlId="validacionUsuario">
          <FormLabel>Codigo de verificación</FormLabel>
          <Row className="row-gap-2">
            {code.map((digit, index) => (
              <Col {...{ xl: 4, md: 4, xs: 4 }} key={index}>
                <FormControl
                  key={index}
                  type="number"
                  className="text-center"
                  autoComplete="off"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={inputRefs[index]}
                />
              </Col>
            ))}
          </Row>
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

interface QRCodeProps {
  qr_code: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ qr_code }) => {
  return (
    <Col xl={12} md={12} xs={12} className="d-flex justify-content-center my-3">
      <QRCode value={qr_code} size={110} />
    </Col>
  );
};

interface FormIngresoProps {
  children?: React.ReactNode; // Propiedad opcional que permite pasar nodos React como hijos
}

const Login: React.FC<FormIngresoProps> = (props) => {
  const { idUsuario: usuario } = useIdUsuario();
  const { idContrasena: contrasena } = useIdContrasena();
  const { idCaptcha: captcha } = useIdCaptcha();
  const { requiredData } = useAuth();
  const { instance } = useMsal();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [qrcode, setQrcode] = useState<string>("");
  const [activar2fa, setActivar2fa] = useState<boolean>(false);
  const [twoFACode, setTwoFACode] = useState<string>("");

  const [loginMethod, setLoginMethod] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (instance) {
      instance
        .handleRedirectPromise()
        .then((response) => {
          if (response) {
            const access_token = response.idToken;
            fetch("http://localhost:8000/api/auth/microsoft_login/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ access_token: access_token }),
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => {
                toast.success("¡Credenciales correctas!");
              })
              .catch((error) => {
                console.error("Error al procesar el token JWT:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error en la redirección:", error);
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect(loginRequest);
          }
        });
    }
  }, [instance]);

  useEffect(() => {
    if (requiredData) {
      navigate("/datos-basicos");
    }
  }, [navigate, requiredData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginMethod === "microsoft") {
      handleMicrosoftLogin();
    } else if (loginMethod === "external") {
      const form = e.currentTarget;

      if (!form.checkValidity()) {
        e.stopPropagation();
        setIsValid(false);
        toast.error("Formulario no valido", {
          position: "top-right",
          className: "foo-bar",
          hideProgressBar: true,
        });
        return;
      }

      if (!captcha) {
        e.stopPropagation();
        toast.error("Por favor, completa el CAPTCHA", {
          position: "top-right",
          className: "foo-bar",
          hideProgressBar: true,
        });
        return;
      }

      handleExternalLogin();
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Error al iniciar sesión con Microsoft:", error);
    }
  };

  const handleExternalLogin = async () => {
    try {
      await toast.promise(InicioSesionService(usuario, contrasena, captcha), {
        pending: "Iniciando sesión...",
        success: {
          render({ data }) {
            setIsValid(true);
            if (data.twoFARequired) {
              setActivar2fa(true);
            }
            if (data.qr_code) {
              setQrcode(data.qr_code);
            }
            setIsValid(false);
            return "¡Credenciales correctas!";
          },
          position: "top-right",
          className: "foo-bar",
          hideProgressBar: true,
        },
        error: {
          render({ data }) {
            setIsValid(false);
            if (
              typeof data === "object" &&
              data !== null &&
              "message" in data
            ) {
              return (data as { message: string }).message;
            }
            return "Error: data no tiene el formato esperado";
          },
        },
      });
    } catch (err) {
      toast.error("Hubo un error en el proceso de inicio de sesión", {
        position: "top-right",
        className: "foo-bar",
        hideProgressBar: true,
      });
      console.log(err);
    }
  };

  const handleTwoFACodeSubmit = async () => {
    setIsValid(false);
    try {
      await toast.promise(Validar2FA(twoFACode, usuario), {
        pending: "Validando codigo...",
        success: {
          render({ data }) {
            setIsValid(true);
            return "¡Codigo valido!";
          },
          position: "top-right",
          className: "foo-bar",
          hideProgressBar: true,
        },
        error: {
          render({ data }) {
            setIsValid(false);
            if (
              typeof data === "object" &&
              data !== null &&
              "message" in data
            ) {
              return (data as { message: string }).message;
            }
            return "Error: data no tiene el formato esperado";
          },
        },
      });
    } catch (error) {
      toast.error("Error al validar el código", {
        position: "top-right",
        className: "foo-bar",
        hideProgressBar: true,
      });
    }
  };

  return (
    // Div que permite al login a ubicarse en el centro
    <div className="login-container">
      {/* Contenedor principal con sombra y ancho máximo de 720px */}
      <Container
        className="d-flex flex-column"
        style={{ maxWidth: "720px", height: "600px" }}
      >
        {/* Fila para la presentación y los inputs de inicio de sesión */}
        <Row className="justify-content-md-center border-0 rounded shadow h-100">
          {/* Columna izquierda con fondo de formulario y borde redondeado */}
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
            </Row>

            {/* Formulario de inicio de sesión */}
            <Row className="justify-content-md-center mx-0">
              <form
                method="POST"
                noValidate
                className={isValid ? "was-validated" : ""}
                onSubmit={(e) => handleSubmit(e)}
              >
                <Col xl={12} md={12} xs={12} className="justify-content-center">
                  {!activar2fa ? (
                    <>
                      <h4 className="text-center mt-2">
                        Ingresa tus credenciales
                      </h4>
                      <Usuario isValid={isValid} />
                      <Contrasena isValid={isValid} />
                      <Col xl={12} md={12} xs={12} className="d-grid gap-2">
                        <Button
                          style={{ backgroundColor: "#365072", border: "none" }}
                          type="submit"
                          onClick={() => setLoginMethod("external")}
                        >
                          Ingresar
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#365072",
                            color: "#365072",
                          }}
                          type="submit"
                          className="flex justify-content-center align-items-center"
                          onClick={() => setLoginMethod("microsoft")}
                        >
                          Ingresar con microsoft
                        </Button>
                      </Col>
                      <Captcha />
                    </>
                  ) : qrcode.length > 0 ? (
                    <>
                      <h4 className="text-center mt-2">Escanea el código QR</h4>
                      <QRCodeComponent qr_code={qrcode} />

                      <Col xl={12} md={12} xs={12} className="d-grid gap-2">
                        <Button
                          style={{ backgroundColor: "#365072", border: "none" }}
                          onClick={() => setQrcode("")}
                        >
                          Ingresar codigo 2FA
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <>
                      <h4 className="text-center mt-2">Ingresa el codigo</h4>
                      <DobleFactor
                        value={twoFACode}
                        onChange={(e) => setTwoFACode(e.target.value)}
                      />
                      <Col xl={12} md={12} xs={12} className="d-grid gap-2">
                        <Button
                          style={{ backgroundColor: "#365072", border: "none" }}
                          onClick={handleTwoFACodeSubmit}
                        >
                          Validar Código 2FA
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#365072",
                            color: "#365072",
                          }}
                          // onClick={handleTwoFACodeSubmit}
                        >
                          Validar con otro metodo
                        </Button>
                      </Col>
                    </>
                  )}
                </Col>
              </form>
            </Row>
          </Col>
        </Row>

        {/* Fila para incluir las redes sociales de la entidad y la política de datos */}
        <Row className="mt-2 d-flex justify-content-beetween">
          {/* Columna para los iconos botones de redes sociales */}
          <Col className="ms-0 d-flex justify-content-start">
            <RedesSociales
              IconoRedSocial={FaXTwitter}
              color="#000"
              descripcion="@UNPColombia"
              enlace="https://x.com/UNPColombia"
            />
            <RedesSociales
              IconoRedSocial={FaInstagram}
              color="#F00075"
              descripcion="@unpcolombia"
              enlace="https://www.instagram.com/unpcolombia"
            />
            <RedesSociales
              IconoRedSocial={FaFacebook}
              color="#1778F2"
              descripcion="@UNPColombia"
              enlace="https://www.facebook.com/UNPColombia"
            />
            <RedesSociales
              IconoRedSocial={FaYoutube}
              color="#FF0000"
              descripcion="@unpcolombia"
              enlace="https://www.youtube.com/channel/UCUiRLOI-MUqa7ATG-mJwY1w"
            />
            <RedesSociales
              IconoRedSocial={FaHeadphones}
              color="#1CCFF9"
              descripcion="UNPRadio"
              enlace="https://unpradio.unp.gov.co"
            />
            <RedesSociales
              IconoRedSocial={FaPhoneFlip}
              color="#D32929"
              descripcion="Línea Vida 103"
              enlace="https://www.unp.gov.co/atencion-y-servicios-a-la-ciudadania/directorio/linea-vida-103"
            />
          </Col>

          {/* Enlace a la política de seguridad de la información y protección de datos personales */}
          <Col className="me-0 d-flex justify-content-end align-items-center">
            <RedesSociales
              IconoRedSocial={FaFileContract}
              color="#365072"
              descripcion="Políticas de datos"
              enlace="https://www.unp.gov.co/normativa/politicas-de-seguridad-de-la-informacion-y-proteccion-de-datos-personales/"
            />
            <RedesSociales
              IconoRedSocial={FaKey}
              color="#365072"
              descripcion="Recuperar contraseña"
              enlace="#"
            />
          </Col>
        </Row>
      </Container>

      <br />
      {props.children}
    </div>
  );
};

const InicioSesion: React.FC = () => {
  return (
    <div className="main-container">
      <InicioSesionProvider>
        <Login />
      </InicioSesionProvider>
    </div>
  );
};

export default InicioSesion;
