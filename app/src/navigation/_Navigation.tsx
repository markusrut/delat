import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import React, { FC, useContext, useEffect, useState } from "react";
import { ColorSchemeName, Text, Button } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { LinkingConfiguration } from "./LinkingConfiguration";
import { RootStack, RootStackParamList } from "./RootStack";
import { Center } from "../components/Center";
import { Loading } from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStack } from "./AuthStack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type NavigationProps = { colorScheme: ColorSchemeName };

const Navigation: FC<NavigationProps> = ({ colorScheme }) => {
  const { user, login } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user", (error, userJson) => {
      if (userJson) login(JSON.parse(userJson));
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {loading ? (
        <Center>
          <Loading />
        </Center>
      ) : user ? (
        <RootStack user={user} />
      ) : (
        <AuthStack />
        // <Center>
        //   <Text>No user</Text>
        //   <Button
        //     title="Login"
        //     onPress={() => login({ username: "Markus" })}
        //   ></Button>
        // </Center>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
