import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { RegisterForm } from "../components/RegisterForm";
import { Button, Header, View, Text } from "../components/Themed";
import { AuthStackNavProps } from "../navigation/AuthStack";

export const RegisterScreen: FC<AuthStackNavProps<"Register">> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Header>Register</Header>
      <RegisterForm />
      <Text>Already have an account??</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
    paddingTop: 120,
    paddingBottom: 80,
  },
});
