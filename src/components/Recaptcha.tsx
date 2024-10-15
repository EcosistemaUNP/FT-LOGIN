import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Col } from "react-bootstrap";

interface RecaptchaProps {
  onChange: (token: string | null) => void;
  sitekey: string;
}

const Recaptcha: React.FC<RecaptchaProps> = ({ onChange, sitekey }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0);

  const handleCaptchaChange = (token: string | null) => {
    onChange(token);
  };

  const handleCaptchaLoad = () => {
    setLoaded(true);
    setError(null);
  };

  const handleCaptchaError = () => {
    setError("Error al cargar reCAPTCHA. Por favor, inténtalo de nuevo.");
    setKey(prevKey => prevKey + 1); 
  };

  useEffect(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setLoaded(true);
    }
  }, [key]);

  return (
    <Col xl={12} md={9} xs={12} className="d-flex justify-content-center mt-4 mb-2" style={{ width: '308px', height: '80px' }}>
      {!loaded && <div style={{ width: '305px', height: '80px', backgroundColor: 'transparent' }} />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ReCAPTCHA
        key={key} 
        ref={recaptchaRef}
        className="mb-3"
        sitekey={sitekey}
        onChange={handleCaptchaChange}
        onLoad={handleCaptchaLoad}
        onErrored={handleCaptchaError}
      />
    </Col>
  );
};

export { Recaptcha };