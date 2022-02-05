import React, { FC, useContext } from "react";
import { Button, Text, TextInput } from "react-native";
import { Center } from "../components/Center";
import { AuthStackNavProps } from "../navigation/AuthStack";
import { AuthContext } from "../providers/AuthProvider";

export const LoginScreen: FC<AuthStackNavProps<"Login">> = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Center>
      <Text>I am a login screen</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={() => {
          login({ email, password });
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
