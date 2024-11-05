import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IniciarSesion from "./InicioSesion";
import FormularioPage from "./pages/FormularioPage";
import RegistroPage from "./pages/RegistroPage";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<IniciarSesion />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/datos-basicos" element={<FormularioPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
