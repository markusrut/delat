import React, { FC, useContext } from "react";
import { Button, TextInput, Text } from "react-native";
import { useLoginMutation } from "../graphql";
import { AuthContext } from "../providers/AuthProvider";
import { Center } from "./Center";

type LoginFormProps = {};

export const LoginForm: FC<LoginFormProps> = ({}) => {
  const { setLoggedIn } = useContext(AuthContext);
  const [loginRequest, loginResult] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    const response = await loginRequest({ variables: { email, password } });
    if (response.data?.login) {
      const accessToken = response.data.login.accessToken;
      setLoggedIn(accessToken);
    }
  };

  if (loginResult.loading) {
    return (
      <Center>
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (loginResult.error) {
    return (
      <Center>
        <Text>Error: {loginResult.error.message}</Text>
      </Center>
    );
  }
  return (
    <>
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
      <Button title="Login" onPress={login} />
    </>
  );
};
