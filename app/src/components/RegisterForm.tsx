import React, { FC, useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { useRegisterMutation } from "../graphql";
import { AuthContext } from "../providers/AuthProvider";
import { Center } from "./Center";
import { CustomButton, Spacer, TextInput, View } from "./Themed";

type RegisterFormProps = {};

export const RegisterForm: FC<RegisterFormProps> = ({}) => {
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
      const accessToken = response.data.register.accessToken;
      setLoggedIn(accessToken);
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
    <View style={styles.container}>
      <Text>asd</Text>
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
      <Spacer height={20} />
      <CustomButton onPress={register}>Register</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});
