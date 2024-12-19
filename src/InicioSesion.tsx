// Importación de React y otros módulos necesarios
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";

import LogosUnp from "./components/Logos";

import {
  useIdUsuario,
  useIdContrasena,
  useIdCaptcha,
} from "./hooks/InicioSesionHook";
import { InicioSesionService } from "./services/InicioSesionService";
import { InicioSesionProvider } from "./contexts/InicioSesionContext";

import { AuthProvider } from "./contexts/AuthContex";

import {
  validarTextoMayusculasYNumeros,
  validarTextoPuntoTexto,
} from "./func/ValidacionInput";

// Importación de archivos de estilos CSS
import "./styles/Bootstrap.css";
import "./styles/InicioSesion.css";

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
              Por favor ingresa una contrasena
            </FormControl.Feedback>
          </InputGroup>
        </FormGroup>
      </Col>
    </React.Fragment>
  );
};

const Captcha: React.FC = () => {
  const { idCaptcha: captcha, setIdCaptcha: setCaptcha } = useIdCaptcha();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0);
  
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setCaptcha(token);
    }
  };

  const handleCaptchaLoad = () => {
    setLoaded(true);
    setError(null);
  };

  const handleCaptchaError = () => {
    setError("Error al cargar reCAPTCHA. Por favor, inténtalo de nuevo.");
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <Col
      xl={12}
      md={9}
      xs={12}
      className="d-flex justify-content-center mt-4 mb-2"
      style={{ width: "308px", height: "80px" }}
    >
      {!loaded && (
        <div
          style={{
            width: "305px",
            height: "80px",
            backgroundColor: "transparent",
          }}
        />
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {process.env.REACT_APP_SECRET_KEY_CAPTCHA !== undefined ? (
        <ReCAPTCHA
          key={key}
          className="mb-3"
          sitekey={process.env.REACT_APP_SECRET_KEY_CAPTCHA}
          onChange={handleCaptchaChange}
          onLoad={handleCaptchaLoad}
          onErrored={handleCaptchaError}
        />
      ) : (
        <div></div>
      )}
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

// Definición de tipos para las propiedades del formulario de ingreso
interface FormIngresoProps {
  children?: React.ReactNode; // Propiedad opcional que permite pasar nodos React como hijos
}

interface CustomTokenPayload extends JwtPayload {
  access_url?: string[];
  access_user?: string;
}

// Definición del componente funcional Login que acepta las propiedades definidas en FormIngresoProps
const Login: React.FC<FormIngresoProps> = (props) => {
  const { idUsuario: usuario } = useIdUsuario();
  const { idContrasena: contrasena } = useIdContrasena();
  const { idCaptcha: captcha } = useIdCaptcha();

  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode<CustomTokenPayload>(token);
      // Acceder a los datos
      const accessUrl = decoded.access_url;
      const accessUser = decoded.access_user;

      return { accessUrl, accessUser };
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      toast.error("Por favor, completa el reCAPTCHA", {
        position: "top-right",
        className: "foo-bar",
        hideProgressBar: true,
      });
      return;
    }

    setIsValid(true);

    try {
      await toast.promise(
        InicioSesionService(usuario, contrasena, captcha),
        {
          pending: "Iniciando sesión...",
          success: {
            render({ data }) {
              const accessToken = data.access_token;
              const userToken = data.user_token;

              localStorage.setItem("access_token", accessToken);
              localStorage.setItem("user_token", userToken);
              const userInfo = decodeToken(userToken);

              if (userInfo && userInfo.accessUrl) {
                setTimeout(() => {
                  // @ts-ignore
                  const url = userInfo.accessUrl[0];
                  navigate(url);
                }, 1000);
              } else {
                navigate("/sistema/usuario");
                console.error("La URL de acceso no está disponible");
              }

              return "¡Inicio de sesión exitoso!";
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
        },
        {
          position: "top-right",
          className: "foo-bar",
          hideProgressBar: true,
        }
      );
    } catch (err) {
      toast.error("Hubo un error", {
        position: "top-right",
        className: "foo-bar",
        hideProgressBar: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    // Div que permite al login a ubicarse en el centro
    <div className="login-container">
      {/* Contenedor principal con sombra y ancho máximo de 720px */}
      <Container style={{ maxWidth: "720px", maxHeight: "600px" }}>
        {/* Fila para la presentación y los inputs de inicio de sesión */}
        <Row className="justify-content-md-center border-0 rounded shadow">
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
              <h4 className="mt-2">Inicio de sesión</h4>
            </Row>

            {/* Formulario de inicio de sesión */}
            <Row className="justify-content-md-center mx-0">
              <form
                method="POST"
                noValidate
                className={isValid ? "was-validated" : ""}
                onSubmit={(e) => handleSubmit(e)}
              >
                {/* Campos de usuario y contraseña */}
                <Col xl={12} md={12} xs={12} className="justify-content-center">
                  <Usuario isValid={isValid} />
                  <Contrasena isValid={isValid} />
                </Col>

                {/* Botón de enviar */}
                <Col xl={12} md={12} xs={12} className="d-grid gap-2">
                  <Button variant="secondary" type="submit">
                    Ingresar
                  </Button>
                </Col>

                {/* reCAPTCHA  */}
                <Captcha />
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

// Definición del componente funcional IniciarSesion
const InicioSesion: React.FC = () => {
  // -----> Renderizado
  return (
    <div className="main-container">
      {/* El componente InicioSesionProvider envuelve al componente Login*/}
      <AuthProvider>
        <InicioSesionProvider>
          <Login />
        </InicioSesionProvider>
      </AuthProvider>
    </div>
  );
};

// Exporta el componente IniciarSesion para su uso en otros archivos
export default InicioSesion;
