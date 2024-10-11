import React from "react";

// Elementos de Bootstrap
import { CardHeader, CardTitle, CardSubtitle } from "react-bootstrap";
import "../styles/Bootstrap.css";

// Definir los tipos de las props
interface TituloFormProps {
  formTitulo: string;
}

interface SubTituloFormProps {
  formSubTitulo: string;
}

const TituloForm: React.FC<TituloFormProps> = ({ formTitulo }) => {
  return (
    <CardHeader className="bg-unp text-light py-2 rounded-0 pt-2 pb-2">
      <CardTitle>
        <h6 className="my-2 mx-2" style={{ fontSize: "1.075rem" }}>
          {formTitulo}
        </h6>
      </CardTitle>
    </CardHeader>
  );
};

const SubTituloForm: React.FC<SubTituloFormProps> = ({ formSubTitulo }) => {
  return (
    <CardSubtitle className="text-subtitle" style={{ fontSize: "1.075rem" }}>
      {formSubTitulo}
    </CardSubtitle>
  );
};

export { TituloForm, SubTituloForm };
