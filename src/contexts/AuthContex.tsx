import React, { createContext, useState, useEffect, ReactNode } from "react";
import { IdAuthContextType } from "../types/AuthTypes";

// Crear contextos individuales con valores por defecto
const IdAuthContext = createContext<IdAuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("user_token")
  );

  useEffect(() => {
    if (authToken && userToken) {
      localStorage.setItem("access_token", authToken);
      localStorage.setItem("user_token", userToken);
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_token");
    }
  }, [authToken, userToken]);

  return (
    <IdAuthContext.Provider
      value={{ authToken, setAuthToken, userToken, setUserToken }}
    >
      {children}
    </IdAuthContext.Provider>
  );
};

export { IdAuthContext };

export { AuthProvider };
