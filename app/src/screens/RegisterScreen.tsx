import React, { FC, useContext } from "react";
import { Button, Text, TextInput } from "react-native";
import { Center } from "../components/Center";
import { useRegisterMutation } from "../graphql";
import { AuthStackNavProps } from "../navigation/AuthStack";
import { AuthContext } from "../providers/AuthProvider";

export const RegisterScreen: FC<AuthStackNavProps<"Register">> = ({
  navigation,
}) => {
  const { setLoggedIn } = useContext(AuthContext);
  const [registerMutation, registerResult] = useRegisterMutation();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const register = async () => {
    const response = await registerMutation({
      variables: { name, email, password },
    });
    if (response.data?.register) {
      const account = response.data.register.account;
      const sessionToken = response.data.register.sessionToken;
      setLoggedIn({
        user: { name: account.name ?? account.email },
        sessionToken,
      });
    }
  };

  if (registerResult.loading) {
    return (
      <Center>
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (registerResult.error) {
    return (
      <Center>
        <Text>Error: {registerResult.error.message}</Text>
      </Center>
    );
  }

  return (
    <Center>
      <Text>I am a register screen</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        autoCapitalize="words"
        autoCorrect={false}
      />
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
      <Button title="Register" onPress={register} />
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </Center>
  );
};
