import React from "react";
import { IdAuthContext } from "../contexts/AuthContex";

const useIdAuth = () => {
  const context = React.useContext(IdAuthContext);
  if (!context) {
    throw new Error("useIdAuth must be used within an AuthProvider");
  }
  return context;
};

export { useIdAuth };
