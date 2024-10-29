import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "./InicioSesion";
import PruebaEnrutamiento from "./pruebas/PruebaEnrutamiento";

const App = () => {
 
 
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/oaj/gdj/bandeja-recurso-reposicion" element={<PruebaEnrutamiento />} />
        </Routes>
      </div>
    </Router>
  );
};
 
export default App;