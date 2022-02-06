import { createContext, FC, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  accessToken: string | null;
  setLoggedIn: (accessToken: string) => Promise<void>;
  setLoggedOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({
  accessToken: null,
  setLoggedIn: async () => {},
  setLoggedOut: async () => {},
});

type AuthProviderProps = {};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const contextData = {
    accessToken,
    setLoggedIn: async (accessToken: string) => {
      setAccessToken(accessToken);
      await AsyncStorage.setItem("accessToken", accessToken);
    },
    setLoggedOut: async () => {
      setAccessToken(null);
      await AsyncStorage.removeItem("accessToken");
    },
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
