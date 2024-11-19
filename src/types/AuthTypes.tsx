export interface IdAuthContextType {
  authToken: string | null;
  userToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}
