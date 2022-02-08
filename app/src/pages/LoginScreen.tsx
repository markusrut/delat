import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { AuthStackNavProps } from "../navigation/AuthStack";
import { LoginForm } from "../components/LoginForm";
import { Button, Header, View, Text } from "../components/Themed";

export const LoginScreen: FC<AuthStackNavProps<"Login">> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header>Welcome</Header>
      <LoginForm />
      <Text>Are you new here?</Text>
      <Button
        title="Register"
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
    alignItems: "center",
    padding: 40,
    paddingTop: 120,
    paddingBottom: 80,
  },
});
