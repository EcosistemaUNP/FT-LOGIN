import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IniciarSesion from "./InicioSesion";
import Registro from "./Registro";
import { CardFormBasicos } from "eco-unp/Forms";

const App = () => {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<IniciarSesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/datos-basicos"
            element={<CardFormBasicos method="POST" canEdit={false} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
