import { createContext, FC, useState } from "react";
import { UserData } from "../types/UserData";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: UserData | null;
  login: (user: UserData) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: async (_) => false,
  logout: async () => false,
});

type AuthProviderProps = {};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const contextData = {
    user,
    login: async (user: UserData) => {
      setUser({ username: user.username });
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return true;
    },
    logout: async () => {
      setUser(null);
      await AsyncStorage.removeItem("user");

      return true;
    },
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
