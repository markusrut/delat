import React, { FC, useContext } from "react";
import { Button, Text } from "react-native";
import { Center } from "../components/Center";
import { AuthStackNavProps } from "../navigation/AuthStack";
import { AuthContext } from "../providers/AuthProvider";

export const LoginScreen: FC<AuthStackNavProps<"Login">> = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>I am a login screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          login({ username: "Markus" });
        }}
      />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
};
