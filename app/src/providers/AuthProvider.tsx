import { createContext, FC, useState } from "react";
import { UserData } from "../types/UserData";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginRequest = { email: string; password: string };
type AuthContextData = {
  user: UserData | null;
  login: (loginRequest: LoginRequest) => Promise<boolean>;
  logout: () => Promise<boolean>;
  setToken: (sessionToken: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: async () => false,
  logout: async () => false,
  setToken: async () => false,
});

type AuthProviderProps = {};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const contextData = {
    user,
    login: async ({ email, password }: LoginRequest) => {
      setUser({ name: email });
      await AsyncStorage.setItem("sessionToken", "GeneratedSessionToken");

      return true;
    },
    logout: async () => {
      setUser(null);
      await AsyncStorage.removeItem("sessionToken");

      return true;
    },
    setToken: async (sessionToken: string) => {
      // TODO: Get user by token
      setUser({ name: sessionToken });
      await AsyncStorage.setItem("sessionToken", sessionToken);

      return true;
    },
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
