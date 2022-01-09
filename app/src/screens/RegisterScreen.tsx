import React, { FC } from "react";
import { Button, Text } from "react-native";
import { Center } from "../components/Center";
import { AuthStackNavProps } from "../navigation/AuthStack";

export const RegisterScreen: FC<AuthStackNavProps<"Register">> = ({
  navigation,
}) => {
  return (
    <Center>
      <Text>I am a register screen</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </Center>
  );
};
