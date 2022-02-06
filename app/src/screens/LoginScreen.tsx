import React, { FC, useContext } from "react";
import { Button, Text, TextInput } from "react-native";
import { Center } from "../components/Center";
import { useLoginMutation } from "../graphql";
import { AuthStackNavProps } from "../navigation/AuthStack";
import { AuthContext } from "../providers/AuthProvider";

export const LoginScreen: FC<AuthStackNavProps<"Login">> = ({ navigation }) => {
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
      <Button title="Login" onPress={login} />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
};
