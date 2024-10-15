import React from "react";
import { AutenticacionContextType } from "../types/AutenticacionType";

const AutenticacionContext = React.createContext<AutenticacionContextType | undefined>(
  undefined
);

export { AutenticacionContext };
