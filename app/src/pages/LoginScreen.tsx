import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { Center } from "../components/Center";
import { AuthStackNavProps } from "../navigation/AuthStack";
import { LoginForm } from "../components/LoginForm";
import { Button, View } from "../components/Themed";

export const LoginScreen: FC<AuthStackNavProps<"Login">> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>I am a login screen</Text>
      <LoginForm />
      <Button
        title="Sign up"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 40,
    marginBottom: 40,
  },
});
