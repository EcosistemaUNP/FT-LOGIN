import React, { useMemo, useState, ReactNode, useContext } from "react";

import { AutenticacionContext } from "../contexts/AutenticacionContext";
import { AutenticacionContextType } from "../types/AutenticacionType";

interface AuthProviderProps {
  children: ReactNode;
}

const AutenticacionProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AutenticacionContext.Provider value={contextValue}>
      {children}
    </AutenticacionContext.Provider>
  );
};

const useAuth = (): AutenticacionContextType => {
  const context = useContext(AutenticacionContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AutenticacionProvider, useAuth };
