import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  // Uncomment to manage axios default headers
  // useEffect(() => {
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //     localStorage.setItem("access_token", token);
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //     localStorage.removeItem("access_token");
  //   }
  // }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
