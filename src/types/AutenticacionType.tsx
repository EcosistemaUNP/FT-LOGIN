export interface AutenticacionContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}