import { createContext, FC, useState } from "react";
import { UserData } from "../types/UserData";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginRequest = { user: UserData; sessionToken: string };
type AuthContextData = {
  user: UserData | null;
  setLoggedIn: (loginRequest: LoginRequest) => Promise<boolean>;
  setLoggedOut: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextData>({
  user: null,
  setLoggedIn: async () => false,
  setLoggedOut: async () => false,
});

type AuthProviderProps = {};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const contextData = {
    user,
    setLoggedIn: async ({ user, sessionToken }: LoginRequest) => {
      setUser(user);
      await AsyncStorage.setItem("sessionToken", sessionToken);

      return true;
    },
    setLoggedOut: async () => {
      setUser(null);
      await AsyncStorage.removeItem("sessionToken");

      return true;
    },
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
